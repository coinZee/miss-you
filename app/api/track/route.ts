// app/api/track/route.ts
import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    // 1. Explicitly check for the variables (supports both naming conventions)
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;

    // 2. specific error check for missing keys
    if (!redisUrl || !redisToken) {
      console.error("Missing Redis Env Variables");
      return NextResponse.json(
        { message: 'Database configuration missing' },
        { status: 500 }
      );
    }

    // 3. Initialize Redis with the found keys
    const redis = new Redis({
      url: redisUrl,
      token: redisToken,
    });

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

    await redis.lpush('gf_events', JSON.stringify(logEntry));

    return NextResponse.json({ success: true, logged: logEntry });

  } catch (error) {
    console.error("Tracking Error:", error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}