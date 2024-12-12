import Libro from "../models/libros.js";

const obtenerLibros = async(req, res) => {
    try {
        const libros = await Libro.obtenerLibros();
        
        if(Object.keys(libros).length === 0) {
            res.status(400).json({ message: "No existen libros" })
        }

        res.status(200).json(libros);
    } catch(err) {
        res.status(500).json({ message: "Error al obtener los libros" })
    }
};

const obtenerLibroId = async(req, res) => {
    const { id } = req.params;

    if(!id) {
        return res.status(400).json({ error: "Id de libro invalido" });
    }

    try {
        const libro = await Libro.obtenerLibroId(id);
        res.status(200).json({ libro });
    } catch(err) {
        console.error("Error al obtener el libro");
        res.status(500).json({ message: "Error al obtener el libro" });
    }
};

const crearLibro = async(req, res) => {
    const { titulo, fecha_publicacion, id_autor } = req.body;

    const crearLibro = new Libro({ titulo: titulo, fecha_publicacion: fecha_publicacion, id_autor: id_autor });

    try {
        const result = await crearLibro.crearLibro();
        res.status(200).json({ message: "Libro Creado", result });
    } catch(err) {
        console.error("Error al crear el libro", err);
        res.status(500).json({ message: "Error al crear el libro" });
    }
};

const actualizarLibro = async(req, res) => {
    const { id } = req.params;

    if(!id) {
        return res.status(400).json({ message: "ID no proporcionado" });
    }

    const { titulo, fecha_publicacion, id_autor } = req.body;

    const updateLibro = new Libro({ titulo: titulo, fecha_publicacion: fecha_publicacion, id_autor: id_autor });

    try {
        const result = await updateLibro.actualizarLibro(id);
        res.status(200).json({ message: "Libro actualizado", result });
    } catch(err) {
        console.error("Error al actualizar el libro");
        res.status(500).json({ message: "Error al actualizar el libro" });
    }
};

const borrarLibro = async(req, res) => {
    const { id } = req.params;

    if(!id) {
        return res.status(400).json({ message: "ID no proporcionado" });
    }

    try {
        const deleteLibro = await Libro.borrarLibro(id);
        res.status(200).json({ message: "Libro Borrado", deleteLibro });
    } catch(err) {
        console.error("Error al borrar el libro");
        res.status(500).json({ message: "Error al borrar el libro.." });
    }
};

export default {
    obtenerLibros,
    obtenerLibroId,
    crearLibro,
    actualizarLibro,
    borrarLibro
}