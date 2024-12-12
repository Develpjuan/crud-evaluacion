import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Autores () {
    const [autores, setAutores] = useState([]);

    const [error, setError] = useState(null);

    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        fetch("http://localhost:4000/api/obtenerAutores")
            .then(response => {
                if(!response.ok) {
                    throw new Error("Error al cargar los autores")
                }
                
                return response.json();
            })
            .then(data => {
                console.log(data);
                setAutores(data);
            })
            .catch(err => {
                setError(err.message);
                console.error(err);
            });
    }, []);

    if(error) {
        alert({ error });
    }

    const handleDelete = async(id) => {
        fetch(`http://localhost:4000/api/borrarAutor/${id}`, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => setMensaje(data.message))
            .catch((error) => setMensaje(error));
    }

    return (
        <div>
            <h2>Lista de Autores</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Nacionalidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    { autores.map(autor => (
                        <tr key={ autor.id_autor }>
                            <td>{ autor.nombre }</td>
                            <td>{ autor.nacionalidad }</td>
                            <td>
                                <Link to={`/actualizarAutores/${autor.id_autor}`}>
                                    <button>Editar</button>
                                </Link>
                                
                                <button onClick={() => handleDelete(autor.id_autor)}>Borrar</button>
                            </td>
                        </tr>
                    )) }
                </tbody>
            </table>
            { mensaje && <p>{ mensaje }</p> }
            <Link to="/crearUsuario">
                <button>Crear Usuario</button>
            </Link>
        </div>
    );
};

export default Autores;