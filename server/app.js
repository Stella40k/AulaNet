import express from "express";
import rutaUsuarios from "./src/routes/usuarios.route.js";
import rutaMaterias from "./src/routes/materias.route.js";
import dotenv from "dotenv"; //dotenv sirve para las variables de entorno (.env) mantiendolas ocultas
import { startDb } from "./src/config/database.js";

dotenv.config(); // lee el archivo .env
const app = express();
const PORT = process.env.PORT 
// convierte la información en json
app.use(express.json());

// esto es simplemente qué queremos que pase cuando esa ruta suceda
app.use("/api/users", rutaUsuarios);
app.use("/api/subjects", rutaMaterias);
app.use("/api/user/create")

// Inicia el servidor con el típico mensaje de que el servidor está funcionando
app.listen(PORT, async () => {
  await startDb();
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});