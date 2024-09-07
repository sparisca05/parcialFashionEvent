import React, { useState, useEffect } from 'react';

// Definición del tipo de datos que esperamos
interface Evento {
    id: number;
    nombre: string;
    fecha: string;
    precio: number;
}

const EventoList: React.FC = () => {
    const [eventos, setEventos] = useState<Evento[]>([]);  // Estado para almacenar la lista de eventos
    const [loading, setLoading] = useState<boolean>(true);     // Estado para mostrar una carga

    // Efecto que hace la petición cuando el componente se monta
    useEffect(() => {
        fetch('http://localhost:8080/api/v1/eventos', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                setEventos(data);  // Guardar los datos en el estado
                setLoading(false);  // Detener la carga
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);  // [] para que la petición solo se ejecute al montar el componente

    if (loading) {
        return <div>Cargando eventos...</div>;
    }

    return (
        <div>
            <h2>Lista de Eventos</h2>
            <ul>
                {eventos.map(evento => (
                    <li key={evento.id}>
                        {evento.nombre} {evento.fecha} {evento.precio}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventoList;
