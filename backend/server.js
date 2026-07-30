import app from './app.js';
import { connectDB, disconnectDB } from './config/db.js';
import env from './config/env.js';

let server;

async function shutdown(signal) {
  console.log(`${signal} received. Closing HTTP server...`);

  if (server) {
    await new Promise((resolve) => server.close(resolve));
    console.log('HTTP server closed.');
  }

  await disconnectDB();
  process.exit(0);
}

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

async function startServer() {
  try {
    await connectDB();

    server = app.listen(env.port, () => {
      console.log(`API server listening on port ${env.port} in ${env.nodeEnv} mode.`);
    });
  } catch (error) {
    console.error(`Server startup failed: ${error.message}`);
    process.exit(1);
  }
}

startServer();
