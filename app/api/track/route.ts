// app/api/track/route.ts
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

// 1. Initialize the correct, serverless-friendly client
// It automatically reads your Vercel Environment Variables
const redis = Redis.fromEnv();

// 2. This is the export that fixes your 405 error
export async function POST(req: Request) {
  try {
    // 3. Get the event name from the frontend
    const { eventName } = await req.json();

    if (!eventName) {
      return NextResponse.json(
        { message: 'Event name is required' },
        { status: 400 }
      );
    }

    const logEntry = {
      event: eventName,
      timestamp: new Date().toISOString(),
    };

    // 4. Save it to the database
    // We must stringify the JSON object to save it in Redis
    await redis.lpush('gf_events', JSON.stringify(logEntry));

    return NextResponse.json({ success: true, logged: logEntry });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}