import { v4 as uuidv4 } from 'uuid';

// ============================================================
// TYPES
// ============================================================

export interface PhishEvent {
  id: string;
  code: string;
  status: 'CREATED' | 'WAITING' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
  createdAt: number;
  startedAt: number | null;
  pausedAt: number | null;
  totalPausedMs: number;
  currentMission: number;
  currentQuestion: number;
  timerDurationMs: number; // total event timer
}

export interface Team {
  id: string;
  name: string;
  eventId: string;
  members: string[];
  sessionToken: string;
  registeredAt: number;
  currentQuestion: number;
  currentMission: number;
  score: number;
  answers: Answer[];
  connected: boolean;
  lastSeen: number;
  finished: boolean;
}

export interface Answer {
  questionId: number;
  answer: string;
  correct: boolean;
  score: number;
  timestamp: number;
}

// ============================================================
// SSE CONNECTIONS
// ============================================================

type SSEClient = {
  id: string;
  controller: ReadableStreamDefaultController;
  teamId?: string;
  isAdmin?: boolean;
};

// ============================================================
// IN-MEMORY STORE (Singleton)
// ============================================================

class GameStore {
  private static instance: GameStore;
  
  events: Map<string, PhishEvent> = new Map();
  teams: Map<string, Team> = new Map();
  eventCodeMap: Map<string, string> = new Map(); // code -> eventId
  sseClients: SSEClient[] = [];

  private constructor() {}

  static getInstance(): GameStore {
    if (!GameStore.instance) {
      GameStore.instance = new GameStore();
      // Auto-create the fixed event on first boot
      GameStore.instance.createEvent(3600000, 'PHISH2026');
    }
    return GameStore.instance;
  }

  // ---- EVENT METHODS ----

  createEvent(timerDurationMs: number = 3600000, fixedCode?: string): PhishEvent {
    const id = uuidv4();
    const code = fixedCode ? fixedCode.toUpperCase() : this.generateEventCode();
    const event: PhishEvent = {
      id,
      code,
      status: 'WAITING',
      createdAt: Date.now(),
      startedAt: null,
      pausedAt: null,
      totalPausedMs: 0,
      currentMission: 0,
      currentQuestion: 0,
      timerDurationMs,
    };
    this.events.set(id, event);
    this.eventCodeMap.set(code, id);
    return event;
  }

  getEventByCode(code: string): PhishEvent | undefined {
    const eventId = this.eventCodeMap.get(code.toUpperCase());
    if (!eventId) return undefined;
    return this.events.get(eventId);
  }

  getEvent(id: string): PhishEvent | undefined {
    return this.events.get(id);
  }

  getActiveEvent(): PhishEvent | undefined {
    for (const event of this.events.values()) {
      if (event.status !== 'COMPLETED') return event;
    }
    return undefined;
  }

  startEvent(eventId: string): PhishEvent | null {
    const event = this.events.get(eventId);
    if (!event) return null;
    event.status = 'ACTIVE';
    event.startedAt = Date.now();
    event.currentMission = 1;
    event.currentQuestion = 1;
    this.events.set(eventId, event);
    this.broadcast({ type: 'GAME_STARTED', data: { eventId, startedAt: event.startedAt, mission: 1, question: 1 } });
    return event;
  }

  pauseEvent(eventId: string): PhishEvent | null {
    const event = this.events.get(eventId);
    if (!event || event.status !== 'ACTIVE') return null;
    event.status = 'PAUSED';
    event.pausedAt = Date.now();
    this.events.set(eventId, event);
    this.broadcast({ type: 'GAME_PAUSED', data: { eventId } });
    return event;
  }

  resumeEvent(eventId: string): PhishEvent | null {
    const event = this.events.get(eventId);
    if (!event || event.status !== 'PAUSED' || !event.pausedAt) return null;
    event.totalPausedMs += Date.now() - event.pausedAt;
    event.status = 'ACTIVE';
    event.pausedAt = null;
    this.events.set(eventId, event);
    this.broadcast({ type: 'GAME_RESUMED', data: { eventId } });
    return event;
  }

  endEvent(eventId: string): PhishEvent | null {
    const event = this.events.get(eventId);
    if (!event) return null;
    event.status = 'COMPLETED';
    this.events.set(eventId, event);
    this.broadcast({ type: 'GAME_ENDED', data: { eventId } });
    return event;
  }

  advanceMission(eventId: string): PhishEvent | null {
    const event = this.events.get(eventId);
    if (!event || event.status !== 'ACTIVE') return null;
    event.currentMission += 1;
    this.events.set(eventId, event);
    this.broadcast({ type: 'MISSION_ADVANCED', data: { eventId, mission: event.currentMission } });
    return event;
  }

  // ---- TEAM METHODS ----

  registerTeam(eventId: string, name: string, members: string[]): Team | null {
    const event = this.events.get(eventId);
    if (!event) return null;
    
    // Check duplicate team name
    for (const team of this.teams.values()) {
      if (team.eventId === eventId && team.name.toLowerCase() === name.toLowerCase()) {
        return null;
      }
    }

    const id = uuidv4();
    const sessionToken = uuidv4();
    const team: Team = {
      id,
      name,
      eventId,
      members,
      sessionToken,
      registeredAt: Date.now(),
      currentQuestion: 1,
      currentMission: 1,
      score: 0,
      answers: [],
      connected: true,
      lastSeen: Date.now(),
      finished: false,
    };
    this.teams.set(id, team);
    this.broadcastAdmin({ type: 'TEAM_REGISTERED', data: { teamId: id, teamName: name, members, registeredAt: team.registeredAt } });
    return team;
  }

  getTeam(id: string): Team | undefined {
    return this.teams.get(id);
  }

  getTeamBySession(sessionToken: string): Team | undefined {
    for (const team of this.teams.values()) {
      if (team.sessionToken === sessionToken) return team;
    }
    return undefined;
  }

  getTeamsByEvent(eventId: string): Team[] {
    const teams: Team[] = [];
    for (const team of this.teams.values()) {
      if (team.eventId === eventId) teams.push(team);
    }
    return teams.sort((a, b) => b.score - a.score);
  }

  submitAnswer(teamId: string, questionId: number, answer: string, correct: boolean, score: number): Answer | null {
    const team = this.teams.get(teamId);
    if (!team) return null;

    // Check if already answered
    if (team.answers.find(a => a.questionId === questionId)) return null;

    const answerObj: Answer = {
      questionId,
      answer,
      correct,
      score,
      timestamp: Date.now(),
    };

    team.answers.push(answerObj);
    team.score += score;
    team.currentQuestion = questionId + 1;
    
    // Update mission based on question number
    if (questionId <= 8) team.currentMission = Math.max(team.currentMission, 1);
    else if (questionId <= 12) team.currentMission = Math.max(team.currentMission, 2);
    else if (questionId <= 15) team.currentMission = Math.max(team.currentMission, 3);
    else if (questionId <= 17) team.currentMission = Math.max(team.currentMission, 4);
    else if (questionId <= 20) team.currentMission = Math.max(team.currentMission, 5);
    else if (questionId <= 23) team.currentMission = Math.max(team.currentMission, 6);
    else team.currentMission = Math.max(team.currentMission, 7);

    if (questionId >= 25) {
      team.finished = true;
    }

    this.teams.set(teamId, team);
    
    this.broadcastAdmin({ 
      type: 'ANSWER_SUBMITTED', 
      data: { 
        teamId, 
        teamName: team.name, 
        questionId, 
        correct, 
        score, 
        totalScore: team.score 
      } 
    });
    
    this.broadcast({ 
      type: 'LEADERBOARD_UPDATE', 
      data: this.getLeaderboard(team.eventId) 
    });

    return answerObj;
  }

  getLeaderboard(eventId: string): { teamName: string; score: number; rank: number; questionsAnswered: number; finished: boolean }[] {
    const teams = this.getTeamsByEvent(eventId);
    return teams.map((team, index) => ({
      teamName: team.name,
      score: team.score,
      rank: index + 1,
      questionsAnswered: team.answers.length,
      finished: team.finished,
    }));
  }

  // ---- SSE METHODS ----

  addSSEClient(client: SSEClient) {
    this.sseClients.push(client);
  }

  removeSSEClient(id: string) {
    this.sseClients = this.sseClients.filter(c => c.id !== id);
  }

  broadcast(message: { type: string; data: unknown }) {
    const data = `data: ${JSON.stringify(message)}\n\n`;
    const encoder = new TextEncoder();
    this.sseClients.forEach(client => {
      try {
        client.controller.enqueue(encoder.encode(data));
      } catch {
        this.removeSSEClient(client.id);
      }
    });
  }

  broadcastAdmin(message: { type: string; data: unknown }) {
    const data = `data: ${JSON.stringify(message)}\n\n`;
    const encoder = new TextEncoder();
    this.sseClients.filter(c => c.isAdmin).forEach(client => {
      try {
        client.controller.enqueue(encoder.encode(data));
      } catch {
        this.removeSSEClient(client.id);
      }
    });
  }

  broadcastToTeam(teamId: string, message: { type: string; data: unknown }) {
    const data = `data: ${JSON.stringify(message)}\n\n`;
    const encoder = new TextEncoder();
    this.sseClients.filter(c => c.teamId === teamId).forEach(client => {
      try {
        client.controller.enqueue(encoder.encode(data));
      } catch {
        this.removeSSEClient(client.id);
      }
    });
  }

  // ---- HELPERS ----

  private generateEventCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    // Ensure uniqueness
    if (this.eventCodeMap.has(code)) return this.generateEventCode();
    return code;
  }
}

export const store = GameStore.getInstance();
