import {useEffect, useState} from 'react';
import axios from "axios";
import { useParams } from "react-router-dom";

import Navbar from "../components/Navbar.tsx";
import {getToken} from "./Home.tsx";
import { API_URL } from '../main.tsx';

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
        axios.get(`${API_URL}/api/v1/eventos/${id}`)
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

    const handleBuyTickets = async () => {
        const token = getToken();
        try {
            if (!token) {
                alert("Debes iniciar sesión para comprar entradas.");
                return;
            }
            const response = await fetch(`http://localhost:8080/api/v1/eventos/${id}/comprar-ticket`, {
                method: 'PUT',
                headers: {
                    'Authorization': 'Bearer ' + token,
                    'Content-Type': 'application/json',
                },
            });

            alert(await response.text());
        } catch (err) {
            alert('Error al comprar las entradas: ' + err);
        }
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
                    onClick={handleBuyTickets}
                >
                    Comprar entradas
                </button>
            </div>
        </div>
    );
}

export default EventoView;