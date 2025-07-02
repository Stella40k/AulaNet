import mysql from "mysql2/promise";
import { config } from "../config/config.js";

export const connectDB = async () => {
  try {
    const connection = await mysql.createConnection({
      host: config.DB_HOST,
      user: config.DB_USER,
      password: config.DB_PASSWORD,
      database: config.DB_NAME,
    });
    console.log("Conexión a la base de datos exitosa");
    return connection;
  } catch (error) {
    console.error("Error al conectar a la base de datos:", error);
    throw error; // Lanza el error para que pueda ser manejado por la lógica que llama a esta función
  }
};