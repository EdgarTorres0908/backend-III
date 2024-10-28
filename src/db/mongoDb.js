import mongoose from 'mongoose';
import 'dotenv/config';

const connectionString = process.env.MONGO_URL || 'mongodb://localhost:27017/ecommerce';
console.log('Conexión a MongoDB:', connectionString);

export const initMongoDB = async() => {
    try {
      await mongoose.connect(connectionString);
      console.log('Conectado a la base de datos de MongoDB');
    } catch (error) {
      console.log(`ERROR => ${error}`);
    }
  }