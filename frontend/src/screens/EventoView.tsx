import {useEffect, useState} from 'react';
import axios from "axios";
import {useParams} from "react-router-dom";
import { FaTrash, FaPencilAlt } from "react-icons/fa";

import Navbar from "../components/Navbar.tsx";
import {getToken} from "./Home.tsx";
import { API_URL } from '../main.tsx';
import {UsuarioRol} from "./Eventos.tsx";
import PaymentForm from "../components/PaymentForm.tsx";

interface Evento {
    id: number;
    nombre: string;
    fecha: string;
    precio: number;
    invitados: string[];
    participantes: string[];
}

function EventoView() {
    const token = getToken();
    const { id } = useParams<{ id: string }>();
    const [evento, setEvento] = useState<Evento>(); // Estado para almacenar la lista de eventos
    const [usuario, setUsuario] = useState<UsuarioRol | null>(null);
    const [displayInvitados, setDisplayInvitados] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true); // Estado para mostrar una carga
    const [displayPayment, setDisplayPayment] = useState<boolean>(false);

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

        axios.get(`${API_URL}/api/v1/usuario/perfil`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            }
        })
            .then((response) => {
                setUsuario(response.data);
            })
            .catch(error => {
                console.error('Error: ', error);
            });
    }, [id, token]);

    const handleRegisterEvent = async () => {
        if (!token) {
            alert("Debes iniciar sesión como modelo para inscribirte en un evento.");
            return;
        }
        await axios.put(`${API_URL}/api/v1/eventos/${id}/inscribirse`,{}, {
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json',
            },
        })
            .then((response) => {
                alert(response.data);
            })
            .catch((error) => {
                alert('Error al inscribirse en el evento.');
                console.error(error);
            });
    }

    const handleBuyTickets = async () => {
        if (!token) {
            alert("Debes iniciar sesión para comprar entradas.");
            return;
        }
        setDisplayPayment(true);
    }

    const handleRemoveInvitado = async (invitado: string) => {
        await axios.delete(`${API_URL}/api/v1/eventos/${id}/eliminar-invitado`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            params: {
                username: invitado,
            }
        })
            .then((response) => {
                alert(response.data);
            })
            .catch(error => {
                alert('Error al eliminar el invitado.');
                console.error('Error:', error);
            });
    }
    const handleRemoveParticipante = async (participante: string) => {
        await axios.delete(`${API_URL}/api/v1/eventos/${id}/eliminar-participante`, {
            headers: {
                'Authorization': 'Bearer ' + token,
            },
            params: {
                username: participante,
            }
        })
            .then((response) => {
                alert(response.data);
            })
            .catch(error => {
                alert('Error al eliminar el invitado.');
                console.error('Error:', error);
            });
    }
    const handleTokenGenerated = (token: string) => {
        console.log("Token recibido:", token);
        // Aquí envías el token a tu backend para procesar el pago
    };

    return (
        <div className={"main-container"}>
            <Navbar />
            {displayPayment &&
                <PaymentForm
                    publicKey="TEST-04ca89c7-dbd4-4cea-a530-836c81d44796"
                    onTokenGenerated={handleTokenGenerated}
                />
            }
            <div className={"welcome"}>
                <div className={"auth-container"}>
                    {loading ? <h4>Cargando evento...</h4>
                    : (
                        <>
                        {!evento ? <div>Evento no encontrado</div>
                        : (
                                <>
                                    {usuario?.rol === 'ADMIN' && (
                                        <button style={{alignSelf: 'flex-end'}}>
                                            <FaPencilAlt/>
                                        </button>
                                    )}
                                    <h2>{evento.nombre}</h2>
                                    <p>Fecha: {evento.fecha}</p>
                                    <p>Precio: {evento.precio}</p>

                                    {usuario && usuario.rol === 'MODELO' ? (
                                        <button
                                            className={"btn btn-primary"}
                                            onClick={handleRegisterEvent}
                                        >
                                            Inscribirse
                                        </button>
                                    ) : (
                                        <button
                                            className={"btn btn-primary"}
                                            onClick={handleBuyTickets}
                                        >
                                            Comprar entradas
                                        </button>
                                    )}
                                    {usuario?.rol === 'ADMIN' && (
                                        <>
                                            {!displayInvitados ? (
                                                <button
                                                    onClick={() => setDisplayInvitados(true)}
                                                    className={"btn btn-primary"}
                                                >
                                                    Ver asistentes
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => setDisplayInvitados(false)}
                                                    className={"btn btn-primary"}
                                                >
                                                    Ocultar asistentes
                                                </button>
                                            )}
                                            {displayInvitados && (
                                                <div style={{display: 'flex', columnGap: '40px'}}>
                                                    <div>
                                                        <h4>Invitados</h4>
                                                        <ul className={"list-container list-group list-group-flush"}>
                                                            {evento.invitados.map((invitado, index) => (
                                                                <li className={"list-group-item d-flex justify-content-between align-items-center"}
                                                                    key={index}>
                                                                    {invitado}
                                                                    <button
                                                                        onClick={() => handleRemoveInvitado(invitado)}
                                                                        style={{color: "red"}}><FaTrash/></button>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div>
                                                        <h4>Participantes</h4>
                                                        <ul className={"list-container list-group list-group-flush"}>
                                                            {evento.participantes.map((participante, index) => (
                                                                <li className={"list-group-item d-flex justify-content-between align-items-center"}
                                                                    key={index}>
                                                                    {participante}
                                                                    <span
                                                                        onClick={() => handleRemoveParticipante(participante)}
                                                                        style={{color: "red"}}><FaTrash/></span>
                                                                </li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </div>
                                            )
                                            }
                                        </>
                                    )}
                                </>
                            )}
                        </>
                        )}
                </div>
            </div>
        </div>
    );
}

export default EventoView;