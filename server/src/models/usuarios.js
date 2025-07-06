import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

export const Usuarios = sequelize.define("Usuario", {
    apellido: {
    type: DataTypes.STRING,
    allowNull: false,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    contraseña: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.ENUM("Directivo", "Profesor", "Preceptor", "Estudiante"),
        allowNull: false,
    },
}, /* {
    tableName: "Usuarios",
    timestamps: true,
} */);

export const perfil_estudiante = sequelize.define("perfil_estudiante",{
    genero: {
    type: DataTypes.ENUM("Masculino", "Femenino", "X"),
    allowNull: false,
  },
  dni: { type: DataTypes.INTEGER,
     allowNull: false,
     validate: {
      min: 10000000,
      max: 99999999,
      customValidator(value) {
        if (value <= 0) throw new Error("El DNI debe ser positivo")
      },
      unique: true,
     }
  },
  domicilio: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  traslado: {
    type: DataTypes.ENUM("Sí", "No"),
    allowNull: false,
    },
  año: {
    type: DataTypes.ENUM("1°", "2°", "3°", "4°", "5°", "6°"),
    allowNull: false
  },
  curso: {
    type: DataTypes.ENUM("A", "B", "C"),
    allowNull: false,
  },
  telefono: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
});

/* module.exports = Usuarios;
module.exports = perfil_estudiante; */