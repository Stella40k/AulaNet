import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// Creando el objeto y sus atributos
const Estudiantes = sequelize.define("Estudiante", {
  nombre: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  apellido: { 
    type: DataTypes.STRING,
     allowNull: false,
      validate: { isInt: true} // Para qué puse esto acá? o lo dejé de antes y no lo cambié?
     },
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
    type: DataTypes.STRING,
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
  email: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
  },
  telefono: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true,
  },
});

export default Estudiantes;
