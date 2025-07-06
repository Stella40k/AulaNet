import { Usuarios } from "../models/usuarios.js";
import { perfil_estudiante } from "../models/usuarios.js";
/* import {Op} from "sequelize"; */

// Mostrar todos los Usuarios
export const getAllUsers = async (req, res) => {
  try {
    const usuarios = await Usuarios.findAll();
    return res.status(200).json(usuarios);
  } catch (error) {
    return res
      .status(500)
      .json({ error: "No se pudo obtener todos los usuarios" });
  }
};

// Buscar usuario por ID
export const getUserById = async (req, res) => {
  try {
    const usuario = await Usuarios.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }
    return res.status(200).json(usuario);
  } catch (error) {
    return es.status(500).json({ error: "Error al obtener el usuario" });
  }
};

// crear usuarios
export const createUser = async (req, res) => {
  try {
    const {
      nombre,
      apellido,
      email,
      contraseña,
      role,
      genero,
      dni,
      domicilio,
      traslado,
      año,
      curso,
      telefono,
    } = req.body;

    console.log(req.body);

    if (!nombre || !apellido || !email || !contraseña || !role) {
      return res.status(400).json({ error: "Faltan campos obligatorios" });
    }

    if (role === "Estudiante") {
      if (
        !genero ||
        !dni ||
        !domicilio ||
        !traslado ||
        !año ||
        !curso ||
        !telefono
      ) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }
      if (!Number.isInteger(dni)) {
        return res
          .status(400)
          .json({ error: "El DNI debe ser un número entero" });
      }
      if (genero !== "Masculino" && genero !== "Femenino" && genero !== "X") {
        return res
          .status(400)
          .json({ error: "El género solo puede ser Masculino, Femenino o X" });
      }
      if (
        año !== "1°" &&
        año !== "2°" &&
        año !== "3°" &&
        año !== "4°" &&
        año !== "5°" &&
        año !== "6°"
      ) {
        return res.status(400).json({ error: "El año debe ser uno válido" });
      }
      if (curso !== "A" && curso !== "B" && curso !== "C") {
        return res.status(400).json({ error: "Curso inválido" });
      }
    }

    const nuevo_usuario = await Usuarios.create({
      apellido,
      nombre,
      email,
      contraseña,
      role,
    });
    if (role === "Estudiante") {
      await perfil_estudiante.create({
        genero,
        dni,
        domicilio,
        traslado,
        año,
        curso,
        telefono,
        UsuarioId: nuevo_usuario.id,
      });
    }
    return res.status(201).json(nuevo_usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al crear el usuario" });
  }
};

// Modificar usuarios
export const updateUser = async (req, res) => {
  try {
    const usuario = await Usuarios.findByPk(req.params.id);

    if (!usuario) {
      return res.status(404).json({ error: "No se encontró al usuario" });
    }
    const {
      nombre,
      apellido,
      email,
      contraseña,
      role,
      genero,
      dni,
      domicilio,
      traslado,
      año,
      curso,
      telefono,
    } = req.body;
    if (
      email &&
      (await Usuarios.findOne({
        where: { email, id: { Usuariosid: usuario.id } },
      }))
    ) {
      return res
        .status(400)
        .json({ error: "El email ya se encuentra registrado" });
    }
    if (usuario.role === "Estudiante") {
      if (
        dni &&
        (await perfil_estudiante.findOne({
          where: { dni, id: { Usuariosid: usuario.id } },
        }))
      ) {
        return res
          .status(400)
          .json({ error: "El dni ya se encuentra registrado" });
      }
      if (
        telefono &&
        (await perfil_estudiante.findOne({
          where: { telefono, id: { Usuariosid: usuario.id } },
        }))
      ) {
        return res
          .status(400)
          .json({ error: "El telefono ya se encuentra registrado" });
      }
      if (dni && !Number.isInteger(dni)) {
        return res
          .status(400)
          .json({ error: "El DNI debe ser un número entero" });
      }
      if (
        genero &&
        genero !== "Masculino" &&
        genero !== "Femenino" &&
        genero !== "X"
      ) {
        return res
          .status(400)
          .json({ error: "El género solo puede ser Masculino, Femenino o X" });
      }
    }
    await usuario.update({
      nombre: nombre || usuario.nombre,
      apellido: apellido || usuario.apellido,
      email: email || usuario.email,
      contraseña: contraseña || usuario.contraseña,
      role: role || usuario.role,
    });
    if (usuario.role === "Estudiante") {
      // Cree una constante perfil porque perfil_estudiante es un modelo (de usuarios.js) no un registro
      const perfil = await perfil_estudiante.findOne({
        where: { UsuarioId: usuario.id },
      });
      if (perfil) {
        await perfil.update({
          genero: genero || perfil.genero,
          dni: dni || perfil.dni,
          domicilio: domicilio || perfil.domicilio,
          traslado: traslado || perfil.traslado,
          año: año || perfil.año,
          curso: curso || perfil.curso,
          telefono: telefono || perfil.telefono,
        });
        return res.status(200).json({
          message: "El usuario del estudiante se ha actualizado exitosamente",
          perfil,
        });
      }
    }
    return res
      .status(200)
      .json({ message: "El usuario se ha actualizado exitosamente", usuario });
  } catch (error) {
    return res.status(500).json({ error: "No se pudo actualizar el usuario" });
  }
};

// Eliminar estudiantes
export const deleteUser = async (req, res) => {
  try {
    const usuario = await Usuarios.findByPk(req.params.id);
    if (!usuario) {
      return res.status(404).json({ error: "No se encontró al usuario" });
    }
    if (usuario.role === "Estudiante") {
      // Cree otra vez la const perfil porque en los controladores estos no se heredan, hay que declararlos cada vez que se necesite
      const perfilDestroy = await perfil_estudiante.findOne({
        where: { UsuarioId: usuario.id },
      });
      if (!perfilDestroy) {
        return res.status(404).json({ error: "No se encontró al estudiante" });
      }
      await perfilDestroy.destroy();
      return res
        .status(200)
        .json({ message: "Se eliminó al estudiante exitosamente " });
    }
    await usuario.destroy();
    return res
      .status(200)
      .json({ message: "Se eliminó al usuario exitosamente" });
  } catch (error) {
    return res.status(500).json({ error: "No se pudo eliminar al estudiante" });
  }
};
