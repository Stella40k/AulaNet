import { connectDB } from "../models/database.js";

export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Establece conexión con la base de datos
    const connection = await connectDB();

    // Verifica si el nombre de usuario ya existe
    const sql = "SELECT * FROM users WHERE username = ?";
    const [existUser] = await connection.execute(sql, [username]);

    if (existUser.length > 0) {
      return res
        .status(409)
        .json({ message: "El nombre de usuario ya está en uso" });
    }

    // Inserta el nuevo usuario en la base de datos
    const regisquery = "INSERT INTO users (username, password) VALUES (?, ?)";
    const [result] = await connection.execute(regisquery, [username, password]);

    if (result.affectedRows === 1) {
      return res.status(201).json({ message: "Usuario creado exitosamente" });
    } else {
      return res.status(500).json({ message: "Error al crear el usuario" });
    }
  } catch (error) {
    console.error("Error al registrar el usuario:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
};
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Conectarse a la base de datos
    const connection = await connectDB();

    // Consulta SQL para buscar al usuario por su nombre de usuario
    const [rows] = await connection.execute(
      "SELECT * FROM users WHERE username = ? AND password = ?",
      [username, password]
    );

    // Verificar si se encontró un usuario
    if (rows.length > 0) {
      const user = rows[0]; // El primer y único usuario encontrado

      // Guardar la información del usuario en la sesión
      req.session.userId = user.id;
      req.session.username = user.username;

      // Responder con éxito de inicio de sesión
      return res.json({
        loggedIn: true,
        user: { id: user.id, username: user.username },
      });
    } else {
      // Si no se encuentra el usuario, devolver error de credenciales incorrectas
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({ message: "Error interno del servidor" });
  }
};

export const session = (req, res) => {
  if (req.session.userId) {
    return res.json({
      loggedIn: true,
      user: { id: req.session.userId, username: req.session.username },
    });
  } else {
    return res
      .status(401)
      .json({ loggedIn: false, message: "No hay sesión activa" });
  }
};

export const logout = async (req, res) => {
  console.log(req.session);
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Error al cerrar la sesión" });
    }
    res.clearCookie("connect.sid");

    return res.json({ message: "Sesión cerrada exitosamente" });
  });
};