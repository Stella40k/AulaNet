import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";

const Materias = sequelize.define("Materias", {
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: true,  
    }
});

export default Materias;