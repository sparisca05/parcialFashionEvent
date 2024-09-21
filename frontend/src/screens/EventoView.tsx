import {useEffect, useState} from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";

import Navbar, { isLoggedIn } from "../components/Navbar.tsx";

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

    const handleBuyTickets = () => {
        alert("Entradas compradas!");
    }

    const showAlertNotLogged = () => {
        alert("Debes iniciar sesión para comprar entradas.");
    }

    return (
        <div className={"main-container"}>
            <Navbar link={'eventos'}/>
            <div className={"content-container"}>
                <h2>{evento.nombre}</h2>
                <p>Fecha: {evento.fecha}</p>
                <p>Precio: {evento.precio}</p>
                <button
                    className={"btn btn-primary"}
                    onClick={isLoggedIn() ? handleBuyTickets : showAlertNotLogged}
                >
                    Comprar entradas
                </button>
            </div>
        </div>
    );
}

export default EventoView;