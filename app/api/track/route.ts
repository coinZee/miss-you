// pages/api/track.ts
import { kv } from '@vercel/kv';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // We only want to accept POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { eventName } = req.body;

    if (!eventName) {
      return res.status(400).json({ message: 'Event name is required' });
    }

    // Create a new log entry
    const logEntry = {
      event: eventName,
      timestamp: new Date().toISOString(),
    };

    // Push the log entry onto a list in your KV store
    // 'gf_events' is just a key name, you can call it anything.
    await kv.lpush('gf_events', logEntry);

    // Send a "success" response back to the frontend
    return res.status(200).json({ success: true, logged: logEntry });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}