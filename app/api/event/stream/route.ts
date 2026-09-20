import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';
import { cookies } from 'next/headers';
import { v4 as uuidv4 } from 'uuid';
import { isAdminAuthenticated } from '@/lib/auth';

export async function GET(request: NextRequest) {
  const cookieStore = await cookies();
  const sessionToken = cookieStore.get('team_session')?.value;
  const adminToken = cookieStore.get('admin_token')?.value;

  let teamId = undefined;
  let isAdmin = false;

  if (sessionToken) {
      const team = store.getTeamBySession(sessionToken);
      if (team) teamId = team.id;
  }

  if (adminToken) {
      isAdmin = await isAdminAuthenticated();
  }

  if (!teamId && !isAdmin) {
       // Allow public connection for waiting room or leaderboard, but don't bind to a specific team
  }

  const id = uuidv4();
  
  const stream = new ReadableStream({
    start(controller) {
      store.addSSEClient({
          id,
          controller,
          teamId,
          isAdmin
      });

      // Send initial connection success
      const data = `data: ${JSON.stringify({ type: 'CONNECTED', data: { id } })}\n\n`;
      controller.enqueue(new TextEncoder().encode(data));
      
      // Ping interval to keep connection alive
      const intervalId = setInterval(() => {
        try {
            controller.enqueue(new TextEncoder().encode(': ping\n\n'));
        } catch {
            clearInterval(intervalId);
            store.removeSSEClient(id);
        }
      }, 30000);

      request.signal.addEventListener('abort', () => {
         clearInterval(intervalId);
         store.removeSSEClient(id);
      });
    },
    cancel() {
        store.removeSSEClient(id);
    }
  });

  return new NextResponse(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
    },
  });
}
