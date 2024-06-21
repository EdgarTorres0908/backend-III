import mongoose from 'mongoose'; 

const connectionString = "mongodb+srv://admin:357159edgar@torresp.atj84jw.mongodb.net/"

export const initMongoDB = async() => {
    try {
      await mongoose.connect(connectionString);
      console.log('Conectado a base de datos de MongoDB'); 
    } catch (error) {
      console.log(`ERROR => ${error}`); 
    }
}