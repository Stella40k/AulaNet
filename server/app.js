import express from "express";
import rutaPersonajes from "./src/routes/character.routes.js";
import dotenv from "dotenv"; //dotenv sirve para las variables de entorno (.env) mantiendolas ocultas
import { startDb } from "./src/config/database.js";

dotenv.config(); // lee el archivo .env
const app = express();
const PORT = process.env.PORT || 3000;

// convierte la información en json
app.use(express.json());

// esto es simplemente qué queremos que pase cuando esa ruta suceda 
app.use("/api/characters", rutaPersonajes);

// Inicia el servidor con el típico mensaje de que el servidor está funcionando
app.listen(PORT, async () => {
  await startDb();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
