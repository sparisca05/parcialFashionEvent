import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
        axios.get('http://localhost:8080/api/v1/eventos')
            .then((response) => {
                setEventos(response.data);
                setLoading(false);
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
            <ul className="list-group">
                {eventos.map(evento => (
                    <li key={evento.id} className="list-group-item">
                        {evento.nombre} {evento.fecha} {evento.precio}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EventoList;