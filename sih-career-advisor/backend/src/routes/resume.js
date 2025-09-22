import { Router } from 'express';
import { db } from '../lib/db.js';
import { nanoid } from 'nanoid';

const router = Router();

router.post('/generate', async (req, res) => {
  const { studentId, details } = req.body || {};
  if (!studentId) return res.status(400).json({ error: 'studentId is required' });

  const useMock = !process.env.AI_API_KEY;
  const content = useMock
    ? `Mock resume for ${studentId} with details: ${JSON.stringify(details || {})}`
    : `AI-generated resume for ${studentId}`;

  const resume = { id: nanoid(), studentId, content, createdAt: new Date().toISOString() };
  db.data.resumes.push(resume);
  await db.write();
  res.json({ resumeId: resume.id, content });
});

export default router;


