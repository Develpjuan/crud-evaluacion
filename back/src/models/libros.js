import connection from "../db/connection.js";

class libro {
    constructor ({ titulo, fecha_publicacion, id_autor }) {
        this.titulo = titulo;
        this.fecha_publicacion = fecha_publicacion;
        this.id_autor = id_autor;
    }

    static async obtenerLibros() {
        const query = 'SELECT * FROM libros';

        try {
            const [result] = await connection.promise().query(query);
            return result;
        } catch(err) {
            throw err;
        }
    }

    static async obtenerLibroId(id_libro) {
        const query = 'SELECT * FROM libros WHERE id_libro = ?';

        try {
            return new Promise((resolve, reject) => {
                connection.query(query, [id_libro], (err, result) => {
                    if(err) {
                        console.error("Error al encontrar el libro");
                    }

                    if(result.length === 0) {
                        return reject("Libro no encontrado")
                    }

                    resolve(result[0]);
                });
            });
        } catch(err) {
            console.error("Error al obtener el libro", err);
            throw err;
        }
    }

    async crearLibro() {
        try {
            const query = 'INSERT INTO Libros (titulo, fecha_publicacion, id_autor) VALUES (?, ?, ?)';

            return new Promise((resolve, reject) => {
                connection.query(query, [this.titulo, this.fecha_publicacion, this.id_autor], (err, result) => {
                    if(err) {
                        console.error("Error al crear el libro");
                        return reject(err);
                    }

                    resolve(result);
                });
            });
        } catch(err) {
            console.error("Error al crear el libro");
            throw err;
        }
    }

    async actualizarLibro(id_libro) {
        try {
            return new Promise((resolve, reject) => {
                const checkQuery = 'SELECT * FROM libros WHERE id_libro = ?';
                connection.query(checkQuery, [id_libro], (err, result) => {
                    if(err) {
                        return reject(err);
                    }

                    if(result[0].length === 0) {
                        return reject(new Error("Libro no encontrado"))
                    }
                    
                    const query = 'UPDATE libros SET titulo = ?, fecha_publicacion = ?, id_autor = ? WHERE id_libro = ?';

                    connection.query(query, [this.titulo, this.fecha_publicacion, this.id_autor, id_libro], (err, result) => {
                        if(err) {
                            return reject(err);
                        }

                        resolve(result);
                    });
                });
            });
        } catch(err) {
            throw err;
        }
    }

    static async borrarLibro(id_libro) {
        console.log(id_libro);
        try {
            return new Promise((resolve, reject) => {
                const checkQuery = 'SELECT * FROM libros WHERE id_libro = ?';

                connection.query(checkQuery, [id_libro], (err, result) => {
                    if(err) {
                        return reject(err);
                    }

                    if(result[0].length === 0) {
                        return reject(new Error("Autor no encontrado"));
                    }

                    const query = 'DELETE FROM libros WHERE id_libro = ?';
                    connection.query(query, [id_libro], (err, result) => {
                        if(err) return reject(err);
                        resolve(result);
                    });
                });
            });
        } catch(err) {
            throw err;
        }
    }
}

export default libro;