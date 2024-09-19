import {useEffect, useState} from 'react';
import axios from "axios";
import {Link, useParams} from "react-router-dom";

interface Evento {
    id: number;
    nombre: string;
    fecha: string;
    precio: number;
}

function EventoView() {
    const { id } = useParams<{ id: string }>();
    const [evento, setEvento] = useState<Evento>();  // Estado para almacenar la lista de eventos
    const [loading, setLoading] = useState<boolean>(true);     // Estado para mostrar una carga

    useEffect(() => {
        axios.get(`http://localhost:8080/api/v1/eventos/${id}`)
            .then((response) => {
                setEvento(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <div>Cargando...</div>;
    }

    if (!evento) {
        return <div>No se encontró el evento.</div>;
    }

    return (
        <div className={"main-container"}>
            <Link to="/eventos" className="btn-close btn-back" aria-label="Close"></Link>
            <h2>{evento.nombre}</h2>
            <p>Fecha: {evento.fecha}</p>
            <p>Precio: {evento.precio}</p>
        </div>
    );
}

export default EventoView;