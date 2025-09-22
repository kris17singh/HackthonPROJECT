import { Router } from 'express';
import { db } from '../lib/db.js';

const router = Router();

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const dash = db.data.dashboards.find(d => d.id === id);
  if (!dash) return res.status(404).json({ error: 'Dashboard not found' });
  res.json(dash);
});

export default router;


