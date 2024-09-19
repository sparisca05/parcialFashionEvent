import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

import Navbar from "../components/Navbar.tsx";

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

    const noEventosMessage = eventos.length === 0 && <div>No hay eventos disponibles.</div>;

    return (
        <div className={"main-container"}>
            <div className={"content-container"}>
                <Navbar link={''}/>
                <h2>Eventos</h2>
                {noEventosMessage}
                <ul className="list-group">
                    {eventos.map(evento => (
                        <Link to={`/eventos/${evento.id}`} key={evento.id} className="evento">
                            <p>
                                {evento.nombre}
                            </p>
                            <div>
                                <p>Fecha: </p>{evento.fecha}
                            </div>
                            <div>
                                <p>Precio: $</p>{evento.precio}
                            </div>
                        </Link>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default EventoList;