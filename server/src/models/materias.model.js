import { DataTypes } from "sequelize";
import { sequelize } from "../config/database";

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