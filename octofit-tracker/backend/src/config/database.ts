import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';
const db = mongoose.connection;

export async function connectDatabase(): Promise<void> {
  if (mongoose.connection.readyState === 1) {
    return;
  }

  await mongoose.connect(connectionString, {
    serverSelectionTimeoutMS: 3000,
  });
  console.log('Connected to octofit_db');
}

db.on('error', console.error.bind(console, 'connection error:'));

export default db;
