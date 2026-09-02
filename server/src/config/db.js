import mongoose from 'mongoose';
import { env } from './env.js';

export const connectDB = async () => {
  if (!env.MONGO_URI) {
    console.log('ℹ️  MongoDB: No MONGO_URI specified in .env. Server running in offline development mode.');
    console.log('   To connect a database, set MONGO_URI in .env (e.g. MongoDB Atlas connection string).');
    return;
  }

  try {
    const conn = await mongoose.connect(env.MONGO_URI, {
      maxPoolSize: 10,
      serverSelectionTimeoutMS: 3000,
    });
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected');
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB runtime error:', err.message);
    });
  } catch (error) {
    if (env.NODE_ENV === 'production') {
      console.error(`❌ MongoDB connection error: ${error.message}`);
      process.exit(1);
    } else {
      console.warn(`⚠️  MongoDB connection failed: ${error.message}`);
      console.warn('   Server continuing in offline development mode. Update MONGO_URI in .env to connect.');
    }
  }
};
