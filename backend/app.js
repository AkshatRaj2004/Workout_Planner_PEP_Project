import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import morgan from 'morgan';
import { getDatabaseStatus } from './config/db.js';
import env from './config/env.js';
import { sanitizeRequest } from './middleware/sanitizeRequest.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import userRoutes from './routes/userRoutes.js';
import workoutRoutes from './routes/workoutRoutes.js';

const app = express();

app.use(helmet());
app.use(
  cors({
    origin: env.clientUrl,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  }),
);
app.use(express.json({ limit: '10kb' }));
app.use(sanitizeRequest);

if (env.nodeEnv === 'development') {
  app.use(morgan('dev'));
}

app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    standardHeaders: 'draft-7',
    legacyHeaders: false,
    message: {
      success: false,
      message: 'Too many requests. Please try again later.',
    },
  }),
);

app.get('/api/health', (req, res) => {
  const database = getDatabaseStatus();
  const isDatabaseConnected = database === 'connected';

  res.status(isDatabaseConnected ? 200 : 503).json({
    success: isDatabaseConnected,
    message: 'Workout Planner API is running.',
    environment: env.nodeEnv,
    database,
  });
});

app.use('/api/user', userRoutes);
app.use('/api/workouts', workoutRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;
