import { Router } from 'express';
import { db } from '../lib/db.js';

const router = Router();

router.get('/match/:id', async (req, res) => {
  const { id } = req.params;
  const user = db.data.users.find(u => u.id === id);
  if (!user) return res.status(404).json({ error: 'User not found' });

  const mentors = db.data.mentors;
  const match = mentors[Math.floor(Math.random() * mentors.length)];
  res.json({ mentor: match });
});

router.post('/appointment', async (req, res) => {
  const { studentId, mentorId, date, time, note } = req.body || {};
  if (!studentId || !mentorId || !date || !time) {
    return res.status(400).json({ error: 'studentId, mentorId, date, and time are required' });
  }

  db.data.appointments = db.data.appointments || [];
  const mentor = db.data.mentors.find(m => m.id === mentorId);
  if (!mentor) return res.status(404).json({ error: 'Mentor not found' });

  const appointment = {
    id: `${studentId}-${mentorId}-${Date.now()}`,
    studentId,
    mentorId,
    date,
    time,
    note: note || '',
    status: 'confirmed'
  };

  db.data.appointments.push(appointment);
  await db.write();
  res.status(201).json({ message: 'Appointment booked successfully', appointment });
});

export default router;


