import express, { type Request, type Response } from 'express';
import { Activity, Leaderboard, Team, User, Workout } from './models/index.js';

const app = express();
app.use(express.json());
app.use((_request, response, next) => {
  response.header('Access-Control-Allow-Origin', '*');
  response.header('Access-Control-Allow-Headers', 'Content-Type');
  response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  next();
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

function registerCollection(path: string, model: typeof User): void {
  app.get(path, async (_request: Request, response: Response) => {
    try {
      const records = await model.find().sort({ createdAt: -1 });
      response.json(records);
    } catch (error) {
      response.status(503).json({ error: 'Database unavailable', detail: String(error) });
    }
  });

  app.post(path, async (request: Request, response: Response) => {
    try {
      const record = await model.create(request.body);
      response.status(201).json(record);
    } catch (error) {
      response.status(400).json({ error: 'Invalid request', detail: String(error) });
    }
  });
}

registerCollection('/api/users', User);
registerCollection('/api/teams', Team);
registerCollection('/api/activities', Activity);
registerCollection('/api/workouts', Workout);

app.get('/api/leaderboard', async (_request, response) => {
  try {
    const records = await Leaderboard.find().sort({ points: -1 }).populate('userId', 'username displayName');
    response.json(records);
  } catch (error) {
    response.status(503).json({ error: 'Database unavailable', detail: String(error) });
  }
});

app.post('/api/leaderboard', async (request, response) => {
  try {
    const record = await Leaderboard.create(request.body);
    response.status(201).json(record);
  } catch (error) {
    response.status(400).json({ error: 'Invalid request', detail: String(error) });
  }
});

app.use((_request, response) => {
  response.status(404).json({ error: 'Route not found' });
});

export default app;