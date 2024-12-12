import React, { useState } from 'react';

function CrearAutor() {
    const [nombre, setNombre] = useState('');
    const [nacionalidad, setNacionalidad] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!nombre || !nacionalidad) {
            alert('Por favor, completa todos los campos');
            return;
        }

        try {
            const response = await fetch('http://localhost:4000/api/crearAutor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    nombre,
                    nacionalidad,
                }),
            });

            if (response.ok) {
                alert('Autor creado con éxito');
                setNombre('');
                setNacionalidad('');
            } else {
                console.error('Error al crear autor');
                alert('Hubo un error al crear el autor');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div>
            <h1>Crear Nuevo Autor</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        placeholder="Ingresa el nombre del autor"
                    />
                </div>
                <div>
                    <label>Nacionalidad:</label>
                    <input
                        type="text"
                        value={nacionalidad}
                        onChange={(e) => setNacionalidad(e.target.value)}
                        placeholder="Ingresa la nacionalidad del autor"
                    />
                </div>
                <button type="submit">Crear Autor</button>
            </form>
        </div>
    );
}

export default CrearAutor;