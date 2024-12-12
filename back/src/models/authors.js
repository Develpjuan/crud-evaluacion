import connection from "../db/connection.js";

class autor {
    constructor ({ nombre, nacionalidad }) {
        this.nombre = nombre;
        this.nacionalidad = nacionalidad;
    }

    static async obtenerAutores() {
        const query = 'select * from autores';

        try {
            const [result] = await connection.promise().query(query);
            return result;
        } catch (err) {
            throw err;
        }
    }

    static async obtenerAutorId(id_autor) {
        const query = 'SELECT * FROM autores WHERE id_autor = ?';
        console.log(id_autor);
        try {
            return new Promise((resolve, reject) => {
                connection.query(query, [id_autor], (err, result) => {
                    if(err) {
                        console.error("Error al encontrar el usuario");
                    }

                    if(result.length === 0) {
                        return reject("usuario no encontrado")
                    }

                    resolve(result[0]);
                });
            });
        } catch(err) {
            console.error("Error al obtener el usuario", err);
            throw err;
        } 
    }

    async crearAutor() {
        try {
            const query = 'INSERT INTO autores (nombre, nacionalidad) VALUES (?, ?)';

            return new Promise((resolve, reject) => {
                connection.query(query, [this.nombre, this.nacionalidad], (err, result) => {
                    if(err) {
                        console.error("Error al crear el autor");
                        return reject(err);
                    }

                    resolve(result);
                });
            });
        } catch (err) {
            console.error("Error al crear el autor");
            throw err;
        }
    }

    async actualizarAutor(id_autor) {
        try {
            return new Promise((resolve, reject) => {

                const checkQuery = 'SELECT * FROM autores WHERE id_autor = ?';
                connection.query(checkQuery, [id_autor], (err, result) => {
                    console.log("resul", result);
                    if(err) {
                        return reject(err);
                    }

                    if(result[0].length === 0) {
                        return reject(new Error("Autor no encontrado"));
                    }

                    const query = 'UPDATE autores SET nombre = ?, nacionalidad = ? WHERE id_autor = ?';

                    connection.query(query, [this.nombre, this.nacionalidad, id_autor], (err, result) => {
                        if(err) {
                            return reject(err);
                        }

                        resolve(result)
                    });
                });
            });
        } catch(err) {
            throw err;
        }
    }

    static async borrarUsuario(id_autor) {
        try {
            return new Promise((resolve, reject) => {
                const checkQuery = 'SELECT * FROM autores WHERE id_autor = ?';

                connection.query(checkQuery, [id_autor], (err, result) => {
                    if(err) {
                        return reject(err)
                    }

                    if(result[0].length === 0) {
                        return reject(new Error("Autor no encontrado"));
                    }

                    const query = 'DELETE FROM autores WHERE id_autor = ?';
                    connection.query(query, [id_autor], (err, result) => {
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

export default autor;