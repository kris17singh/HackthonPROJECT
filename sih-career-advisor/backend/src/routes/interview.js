import { Router } from 'express';
import { db } from '../lib/db.js';
import { nanoid } from 'nanoid';

const router = Router();

router.post('/simulate', async (req, res) => {
  const { studentId, topic } = req.body || {};
  if (!studentId) return res.status(400).json({ error: 'studentId is required' });

  const useMock = !process.env.AI_API_KEY;
  const questions = useMock
    ? [
        `Tell me about a project related to ${topic || 'your field'}.`,
        'What was the biggest challenge and how did you overcome it?',
        'Explain a complex concept in simple terms.'
      ]
    : [
        `AI-generated question set for ${topic || 'general software engineering'}`
      ];

  const session = { id: nanoid(), studentId, topic: topic || 'general', questions, createdAt: new Date().toISOString() };
  db.data.interviews.push(session);
  await db.write();
  res.json({ sessionId: session.id, questions });
});

export default router;


