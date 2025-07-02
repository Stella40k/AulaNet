import { Sequelize } from "sequelize";
import dotenv from "dotenv"; //dotenv sirve para las variables de entorno (.env) mantiendolas ocultas

dotenv.config(); // lee el archivo .env

  // la constante sequelize es arbitraria pero se hace por convención, new Sequelize si es propio de sequelize
export const sequelize = new Sequelize(
  // process sirve para leer las variables de env como el nombre de la DB
  process.env.DB_NAME, // nombre que le puse a la DB
  process.env.DB_USER, // usuario
  process.env.DB_PASSWORD, // contraseña
  {
    host: process.env.DB_HOST, // ip a la que se conecta nuestra DB
    dialect: process.env.DB_DIALECT, // establece el dialecto (tipo de DB)
  }
);

// testear la conexion
export const startDb = async () => {
  try {
  await sequelize.authenticate();
  console.log('Conectado correctamente.');
  await sequelize.sync();
} catch (error) {
  console.error('Hubo un problema al conectar:', error);
}
}

