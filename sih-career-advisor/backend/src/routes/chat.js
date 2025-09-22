import { Router } from 'express';
import { db } from '../lib/db.js';
import { nanoid } from 'nanoid';

const router = Router();

router.post('/message', async (req, res) => {
  const { studentId, message } = req.body || {};
  if (!studentId || !message) {
    return res.status(400).json({ error: 'studentId and message are required' });
  }

  const useMock = !process.env.AI_API_KEY;
  let reply = '';

  if (useMock) {
    reply = `Mock reply to: ${message}`;
  } else {
    // Placeholder for real AI call
    reply = `AI response to: ${message}`;
  }

  const chat = { id: nanoid(), studentId, user: message, bot: reply, createdAt: new Date().toISOString() };
  db.data.chats.push(chat);
  await db.write();
  res.json({ reply, chatId: chat.id });
});

export default router;


