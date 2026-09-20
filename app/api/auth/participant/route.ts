import { NextRequest, NextResponse } from 'next/server';
import { store } from '@/lib/store';

const PARTICIPANT_ACCESS_ID = 'PHISH2026';
const PARTICIPANT_PASSPHRASE = 'HUNT2026';

export async function POST(request: NextRequest) {
  try {
    const { accessId, passphrase } = await request.json();

    if (
      !accessId ||
      !passphrase ||
      accessId.trim().toUpperCase() !== PARTICIPANT_ACCESS_ID ||
      passphrase.trim().toUpperCase() !== PARTICIPANT_PASSPHRASE
    ) {
      return NextResponse.json(
        { error: 'Invalid Access ID or Passphrase.' },
        { status: 401 }
      );
    }

    // Credentials valid — look up the active event to hand back its code
    const activeEvent = store.getActiveEvent();

    if (!activeEvent) {
      return NextResponse.json(
        { error: 'No active event found. Please contact the organizer.' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, eventCode: activeEvent.code });
  } catch {
    return NextResponse.json({ error: 'Invalid request.' }, { status: 400 });
  }
}
