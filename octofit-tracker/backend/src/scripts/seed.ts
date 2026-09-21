import mongoose from 'mongoose';
import { Activity, Leaderboard, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.create([
      { username: 'alex', email: 'alex@example.com', displayName: 'Alex Morgan' },
      { username: 'jordan', email: 'jordan@example.com', displayName: 'Jordan Lee' },
      { username: 'sam', email: 'sam@example.com', displayName: 'Sam Rivera' },
      { username: 'taylor', email: 'taylor@example.com', displayName: 'Taylor Kim' },
    ]);

    const teams = await Team.create([
      { name: 'Trail Blazers', description: 'Weekend runners and hikers' },
      { name: 'Core Collective', description: 'Strength and mobility focused' },
    ]);

    await User.updateOne({ _id: users[0]._id }, { teamId: teams[0]._id });
    await User.updateOne({ _id: users[1]._id }, { teamId: teams[0]._id });
    await User.updateOne({ _id: users[2]._id }, { teamId: teams[1]._id });
    await User.updateOne({ _id: users[3]._id }, { teamId: teams[1]._id });
    await Team.updateOne(
      { _id: teams[0]._id },
      { memberIds: [users[0]._id, users[1]._id] },
    );
    await Team.updateOne(
      { _id: teams[1]._id },
      { memberIds: [users[2]._id, users[3]._id] },
    );

    const activities = await Activity.create([
      { userId: users[0]._id, type: 'running', durationMinutes: 34, distanceKm: 5.2, points: 52, occurredAt: new Date('2026-09-18') },
      { userId: users[0]._id, type: 'strength', durationMinutes: 28, points: 28, occurredAt: new Date('2026-09-19') },
      { userId: users[1]._id, type: 'running', durationMinutes: 42, distanceKm: 6.8, points: 68, occurredAt: new Date('2026-09-17') },
      { userId: users[2]._id, type: 'strength', durationMinutes: 45, points: 45, occurredAt: new Date('2026-09-18') },
      { userId: users[3]._id, type: 'walking', durationMinutes: 50, distanceKm: 4.1, points: 41, occurredAt: new Date('2026-09-16') },
    ]);

    const pointsByUser = new Map<string, number>();
    for (const activity of activities) {
      const userId = activity.userId.toString();
      pointsByUser.set(userId, (pointsByUser.get(userId) || 0) + activity.points);
    }
    const leaderboard = [...pointsByUser.entries()]
      .sort(([, firstPoints], [, secondPoints]) => secondPoints - firstPoints)
      .map(([userId, points], index) => ({ userId, points, rank: index + 1 }));
    await Leaderboard.create(leaderboard);

    await Workout.create([
      { title: 'Easy 5K Builder', description: 'A steady run with a relaxed finish.', activityType: 'running', difficulty: 'beginner', durationMinutes: 30 },
      { title: 'Hike and Move', description: 'A brisk walk with short mobility breaks.', activityType: 'walking', difficulty: 'beginner', durationMinutes: 40 },
      { title: 'Full Body Circuit', description: 'A balanced strength session for the major muscle groups.', activityType: 'strength', difficulty: 'intermediate', durationMinutes: 35 },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
