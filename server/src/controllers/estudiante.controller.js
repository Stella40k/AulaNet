import Estudiantes from "../models/estudiante.model..js";

// Acá va a ir lo del CRUD (Create, Read, Update, Delete)

 // Obtener los personajes
export const getAllEstudiantes = async (req, res) => {
    try {
        const estudiantes = await Estudiantes.findAll();
        res.status(200).json(estudiantes)
    } catch (error) {
        res.status(500).json({error: "No se pudo obtener todos los personajes"})
    }
};

export const getEstudianteById = async (req, res) => {
    try {
        const estudiante = Estudiantes.findByPk(req.params.id);
        // No olvidar que ! es el operador de NEGACIÓN
        // Validación
        if (!estudiante) {
            return res.status(404).json({error: "Estudiante no encontrado"});
        }
        res.status(200).json(estudiante)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener al estudiante"})
    }
};

// Crear pjes
export const createEstudiante = async (req, res) => {
    try {
        const {nombre, apellido, dni, genero, domicilio, traslado } = req.body; //req.body es la info enviada por el usuario

        console.log(req.body)

        // Acá van a ir las validaciones
        if (!nombre || !apellido || !dni || !genero || !domicilio || traslado) {
            res.status(400).json({ error: "Faltan campos obligatorios"});
        }
        if (isNaN(dni)) {
            res.status(400).json({ error: "El DNI debe ser un número entero"});
        }
        if (genero !== "Masculino" && genero !== "Femenino" && genero !== "X") {
            res.status(400).json({ error: "El género solo puede ser Masculino, Femenino o X" });
        }
        const newEstudiante = await Estudiantes.create({
        nombre,
        apellido,
        dni: parseInt(dni),
        genero,
        domicilio,
        traslado,
    });
    res.status(200).json(newEstudiante)
    } catch (error) {
        if (error.nombre === "SequelizeUniqueConstraintError") {
            res.status(400).json({ error: "El nombre ya está en uso"});
        } else {
            res.status(500).json({ error: "Error al crear el personaje"});
        }
    }
};

// Modificar un estudiante
export const updateEstudiante = async (req, res) => {
    try {
        const estudiante = Estudiantes.findByPk(req.params.id);
        // Validaciones
        if (!estudiante) {
            return res.status(404).json({ error: "No se encontró al estudiante"});
        }

        const {nombre, apellido, dni, genero, domicilio, traslado } = req.body;

        if (nombre && (await Estudiantes.findOne({ where: { nombre } }))) {
            return res.status(400).json({error: "El nombre ya está en uso"});
        }
        if (dni && isNaN(dni)) {
            res.status(400).json({ error: "El ki debe ser un número entero"})
        }
        if (genero !== "Masculino" && genero !== "Femenino" && genero !== "X") {
            res.status(400).json({ error: "El género solo puede ser Masculino, Femenino o X" });
        }
        await estudiante.update({
            nombre: nombre || estudiante.nombre,
            dni: dni ? parseInt(dni) : estudiante.dni,
            apellido: apellido || estudiante.apellido,
            genero: genero || estudiante.genero,
            domicilio: domicilio || estudiante.domicilio,
        });
        res.status(200).json(estudiante);
    } catch {error} {
        res.status(500).json({ error: "Error al actualizar al estudiante"});
    }
};

// Eliminar estudiantes
export const deleteEstudiante = async (req, res) => {
    try {
        const estudiante = await Estudiantes.findByPk(req.params.id);
        if (!estudiante) {
            return res.status(404).json({ error: "No se encontró al estudiante"});
        }
        await estudiante.destroy();
        res.status(200).json({message: "Se eliminó al estudiante exitosamente"});
    } catch (error) {
        res.status(500).json({error: "No se pudo eliminar al estudiante"})
    }
};