import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {Link} from "react-router-dom";

import { API_URL } from '../main.tsx';
import Navbar from "../components/Navbar.tsx";
import {getToken} from "./Home.tsx";

// Definición del tipo de datos que esperamos
export interface Evento {
    id: number;
    nombre: string;
    fecha: string;
    precio: number;
}

interface Usuario {
    rol: string;
}

const EventoList: React.FC = () => {
    const [eventos, setEventos] = useState<Evento[]>([]);
    const [usuario, setUsuario] = useState<Usuario | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState('');

    // Efecto que hace la petición cuando el componente se monta
    useEffect(() => {
        axios.get(`${API_URL}/api/v1/eventos`)
            .then((response) => {
                setEventos(response.data);
                setLoading(false);
            })
            .catch(err => {
                setError('Error: ' + err);
                setLoading(false);
            });
    }, []);  // [] para que la petición solo se ejecute al montar el componente

    useEffect(() => {
        axios.get(`${API_URL}/api/v1/usuario/perfil`, {
            headers: {
                'Authorization': 'Bearer ' + getToken(),
            }
        })
            .then((response) => {
                setUsuario(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    if (loading) {
        return (
            <div className={"main-container"}>
                <Navbar link={''}/>
                <div>Cargando eventos...</div>
            </div>
        );
    }

    const noEventosMessage = eventos.length === 0 && <div>No hay eventos disponibles.</div>;

    return (
        <div className={"main-container"}>
            <Navbar link={''}/>
            <div className={"content-container eventos"}>
                <h2>Eventos</h2>
                {error ? <div>{error}</div> : noEventosMessage}
                <div>
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
                    {usuario ? usuario.rol === 'ADMIN' &&
                        <Link to={'/eventos/nuevo-evento'} className="btn btn-primary">Nuevo evento</Link>
                        :
                        <div>No se pudo encontrar el usuario</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default EventoList;