import Usuarios from "../models/usuarios.js";

// crear

export const getAllUsers = async (req, res) => {
    try {
        const usuarios = await Usuarios.findAll();
        res.status(200).json(usuarios)
    } catch (error) {
        res.status(500).json({error: "No se pudo obtener todos los usuarios"})
    }
};



export const getUserById = async (req, res) => {
    try {
        const usuario = await Usuarios.findByPk(req.params.id);
        // No olvidar que ! es el operador de NEGACIÓN
        // Validación
        if (!usuario) {
            return res.status(404).json({error: "Usuario no encontrado"});
        }
        res.status(200).json(usuario)
    } catch (error) {
        res.status(500).json({ error: "Error al obtener el usuario"})
    }
};

export const createUser = async (req, res) => {
    try {
        const {
            nombre,
            apellido,
            email,
            contraseña,
            role,
        } = req.body;

        console.log(req.body);

        if (!nombre || !apellido || !email || !contraseña || !role ){
            res.status(400).json({error: "Faltan campos obligatorios"})
        };

        if (role === "Estudiante") {
            perfilEstudiante.create({
                genero,
                dni,
                domicilio,
                traslado,
                año,
                curso,
                telefono,
            });
            if (!genero || !dni || !domicilio || !traslado || !año || !curso || !telefono) {
                res.status(400).json({error: "Faltan campos obligatorios"})
            }
        };

        if (!isInteger(dni)) {
            res.status(400).json({ error: "El DNI debe ser un número entero"});
        }
        if (genero !== "Masculino" && genero !== "Femenino" && genero !== "X") {
            res.status(400).json({ error: "El género solo puede ser Masculino, Femenino o X" });
        }
        if (año !== "1°" && año !== "2°" && año !== "3°" && año !== "4°" && año !== "5°" && año !== "6°") {
            res.status(400).json({error: "El año debe ser uno válido"})
        };
        if (curso !== "A" && curso !== "B" && curso !== "C") {
            res.status(400).json({error: "Curso inválido"})
        };
                
        const nuevo_usuario = await Usuarios.create({
            apellido,
            nombre,
            email,
            contraseña,
            role,
        });
        res.status(200).json({nuevo_usuario})

    } catch (error) {
        res.status(500).json({error: "Error al crear el usuario"})
    }
};

export const updateUsuario = async (req, res) => {
    try {
        const usuario = await Usuarios.findByPk(req.params.id);
        
        if (!usuario) {
            res.status(404).json({error: "No se encontró al usuario"})
        };
        const  {nombre, apellido, email, contraseña, role} = req.body;

    } catch (error) {

    }
};


// Modificar un estudiante
export const updateUsuarios = async (req, res) => {
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