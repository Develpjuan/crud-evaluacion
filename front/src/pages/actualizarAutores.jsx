import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ActualizarAutor () {
    const { id } = useParams();
    console.log(id);
    const [autor, setAutor] = useState({
        nombre: '',
        nacionalidad: ''
    });
    
    const [mensaje, setMensaje] = useState("");

    useEffect(() => {
        fetch(`http://localhost:4000/api/obtenerAutor/${id}`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data.autor);
                setAutor(data.autor)
            })
            .catch((error) => console.error("error:", error))
    }, [id]);

    const handleSubmit = (e) => {
        e.preventDefault();

        fetch(`http://localhost:4000/api/actualizarAutor/${id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(autor)
        })
            .then((response) => response.json())
            .then((data) => setMensaje("Autor actualizado correctamente"))
            .catch((error) => setMensaje("Error al actualizar el autor"));
    };
    console.log(autor);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAutor({
            ...autor, 
            [name]: value
        });
    };

    return (
        <div>
            <h2>Editar Autor</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre</label>
                    <input 
                        type='text'
                        name='nombre'
                        value={autor.nombre}
                        onChange={handleChange}
                    />
                </div>
                
                <div>
                    <label>Nacionalidad</label>
                    <input 
                        type='text'
                        name='nacionalidad'
                        value={autor.nacionalidad}
                        onChange={handleChange}
                    />
                </div>

                <button type='submit'>Actualizar autor</button>
            </form>

            { mensaje && <p>{ mensaje }</p> }
        </div>
    )
}

export default ActualizarAutor;