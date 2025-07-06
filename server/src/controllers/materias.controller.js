import Materias from "../models/materias.model.js";

// buscar todas
export const getAllSubjects = async (req, res) => {
    try {
        const materias = await Materias.findAll();
        return res.status(200).json(materias);
    } catch (error) {
        return res.status(500).json({error: "No se pudieron obtener todas las materias"});
    }
}

// buscar por id
export const getSubjectById = async (req, res) => {
    try { const materia = await Materias.findByPk(req.params.id);
        if (!materia) {
            return res.status(404).json("No se encontró la materia");
        };
        return res.status(200).json(materia);
    } catch (error) {
        return res.status(500).json({error: "Error al obtener la materia"});
    }
}

// crear
export const createSubject = async (req, res) => {
    try { const { nombre, descripcion} = req.body;
        console.log(req.body);

        const materiaExistente = await Materias.findOne( {where: { nombre: nombre}});
        if (materiaExistente) {
            return res.status(409).json("La materia ya existe");
        };

        if (!nombre) {
            return res.status(400).json("El nombre es un campo obligatorio");
        };

        const materiaNueva = await Materias.create({
            nombre,
            descripcion
        });
        return res.status(201).json(materiaNueva);
    } catch (error) {
        console.log(error);
        return res.status(400).json({error: "No se pudo crear la materia"});
    };
};

// modificar
export const updateSubject = async (req, res) => {
    try {
        const materia = await Materias.findByPk(req.params.id);
        if (!materia) {
            return res.status(404).json("No se encontró la materia")
        };
        const { nombre, descripcion } = req.body;

/*         const materiaExistente = await Materias.findOne( {where: { nombre: nombre}});
        if (materiaExistente) {
            return res.status(409).json("La materia ya existe");
        }; */

        await materia.update({
            nombre: nombre || materia.nombre,
            descripcion: descripcion || materia.descripcion
        });
        return res.status(200).json({message: "La materia se ha actualizado exitosamente", materia})

    } catch (error) {
        console.log(error);
        return res.status(400).json({error: "Error al actualizar la materia"});
    };
};

// eliminar
export const deleteSubject = async (req, res) => {
    try {const materia = await Materias.findByPk(req.params.id);
        if (!materia) {
            return res.status(404).json("No se encontró la materia");
        };

    await materia.destroy();
    return res.status(200).json("Se eliminó la materia exitosamente")

    } catch (error) {
        console.log(error);
        return res.status(500).json({error: "No se pudo eliminar la materia"});
    };
};