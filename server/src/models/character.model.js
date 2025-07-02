import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

// Creando los objetos
const Estudiantes = sequelize.define("Estudiante", {
  nombre: {
    type: DataTypes.STRING(),
    allowNull: false,
  },
  apellido: { type: DataTypes.STRING, allowNull: false, validate: { isInt: true} },
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
      }
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
});

export default Estudiantes;
