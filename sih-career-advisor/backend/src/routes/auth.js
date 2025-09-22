import { Router } from 'express';
import { db } from '../lib/db.js';
import { nanoid } from 'nanoid';

const router = Router();

router.post('/signup', async (req, res) => {
  const { name, email } = req.body || {};
  if (!name || !email) {
    return res.status(400).json({ error: 'name and email are required' });
  }

  const existing = db.data.users.find(u => u.email === email);
  if (existing) {
    return res.status(200).json({ studentId: existing.id, message: 'User exists' });
  }

  const newUser = { id: nanoid(), name, email, createdAt: new Date().toISOString() };
  db.data.users.push(newUser);
  db.data.dashboards.push({ id: newUser.id, welcome: `Welcome, ${name}!`, recentActivities: [] });
  await db.write();

  res.status(201).json({ studentId: newUser.id });
});

export default router;


