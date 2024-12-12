import Autor from "../models/authors.js";

const obtenerAutores = async(req, res) => {
    try {
        const autores = await Autor.obtenerAutores();

        if(Object.keys(autores).length === 0) {
            res.status(400).json({ message: "No existen autores" })
        }

        res.status(200).json(autores);
    } catch (err) {
        res.status(500).json({ message: "Error al obtener los usuarios" });
    }
};

const obtenerAutorId = async(req, res) => {
    const { id } = req.params;

    if(!id) {
        return res.status(400).json({ error: "Id de usuario invalido" });
    }

    try {
        const autor = await Autor.obtenerAutorId(id);
        res.status(200).json({ autor });
    } catch (err) {
        console.error("Error al obtener el usuario");
        res.status(500).json({ message: "Error al obtener el usuario" });
    }
}

const crearAutor = async(req, res) => {
    const { nombre, nacionalidad } = req.body;

    const crearAutor = new Autor({ nombre: nombre, nacionalidad: nacionalidad });

    try {
        const result = await crearAutor.crearAutor();
        res.status(200).json({ message: "Autor Creado", result });
    } catch (err) {
        console.error("Error al crear el autor", err);
        res.status(500).json({ message: "Error al crear el autor" });
    }
};

const actualizarAutor = async(req, res) => {
    const { id } = req.params;

    if(!id) {
        return res.status(400).json({ message: "ID no proporcionado" });
    }
    
    const { nombre, nacionalidad } = req.body;

    const updateAutor = new Autor({ nombre: nombre, nacionalidad: nacionalidad });

    try {
        const result = await updateAutor.actualizarAutor(id);
        res.status(200).json({ message: "Autor actualizado", result });
    } catch(err) {
        console.error("Error al actualizar el usuario");
        res.status(500).json({ message: "Error al actualizar el usuario" });
    }
};

const borrarUsuario = async(req, res) => {
    const { id } = req.params;

    if(!id) {
        return res.status(400).json({ message: "ID no proporcionado" });
    }

    try {
        const deleteAutor = await Autor.borrarUsuario(id);
        res.status(200).json({ message: "Autor borrado", deleteAutor });
    } catch(err) {
        console.error("Error al borrar el autor");
        res.status(500).json({ message: "Error al borrar el autor" })
    }
};

export default {
    obtenerAutores,
    obtenerAutorId,
    crearAutor,
    actualizarAutor,
    borrarUsuario
};

