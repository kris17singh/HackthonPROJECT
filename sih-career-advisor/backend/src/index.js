import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { initializeDatabase } from './lib/db.js';
import authRouter from './routes/auth.js';
import dashboardRouter from './routes/dashboard.js';
import chatRouter from './routes/chat.js';
import mentorRouter from './routes/mentor.js';
import resumeRouter from './routes/resume.js';
import interviewRouter from './routes/interview.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors({ origin: [/^http:\/\/localhost:5173$/, /^http:\/\/localhost:5174$/], credentials: true }));
app.use(express.json());

await initializeDatabase();

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRouter);
app.use('/dashboard', dashboardRouter);
app.use('/chat', chatRouter);
app.use('/mentor', mentorRouter);
app.use('/resume', resumeRouter);
app.use('/interview', interviewRouter);

app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Backend listening on http://localhost:${PORT}`);
});


