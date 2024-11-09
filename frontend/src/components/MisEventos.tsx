import {useEffect, useState} from 'react';
import {Evento} from "../screens/Eventos.tsx";
import axios from "axios";
import {Link} from "react-router-dom";
import {getToken} from "../screens/Home.tsx";
import {API_URL} from "../main.tsx";

const MisEventos = () => {
    const [eventos, setEventos] = useState<Evento[]>([]);  // Estado para almacenar la lista de eventos
    const [loading, setLoading] = useState<boolean>(true);     // Estado para mostrar una carga
    const [error, setError] = useState('');    // Estado para mostrar un error


    useEffect(() => {
        const token = getToken();

        axios.get(`${API_URL}/api/v1/usuario/mis-eventos`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then((response) => {
                setEventos(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError('Error: ' + error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div>
                <div>Cargando eventos...</div>
            </div>
        );
    }

    const noEventosMessage = eventos.length === 0 && <div>No estás en ningún evento aún.</div>;

    return (
        <>
            <h2>Mis Eventos</h2>
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
            </div>
        </>
    );
};

export default MisEventos;