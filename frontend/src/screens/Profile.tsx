import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar.tsx";

// Definición del tipo de datos que esperamos
interface UserInfo {
    nombre: string;
    apellido: string;
    username: string;
    rol: string;
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<UserInfo | null>(null);  // Estado para almacenar el usuario
    const [loading, setLoading] = useState<boolean>(true);     // Estado para mostrar una carga
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Efecto que hace la petición cuando el componente se monta
    useEffect(() => {
        const token = localStorage.getItem("authToken");

        if (!token) {
            // Si no hay token, redirigir al login
            navigate('/login');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/usuario/perfil', {
                    method: 'GET',
                    headers: {
                        'Authorization': 'Bearer ' + token,
                        'Content-Type': 'application/json',
                    },
                });

                if (response.ok) {
                    const data: UserInfo = await response.json();
                    setUser(data); // Almacenar los datos del usuario
                    setLoading(false);
                } else {
                    // Si el token es inválido o ha expirado, redirigir al login
                    setError('No autorizado');
                    localStorage.removeItem('authToken');
                    navigate('/login');
                }
            } catch (err) {
                setError('Error de conexión' + err);
                setLoading(false);
            }
        };
        fetchUserData();
    }, []);

    if (loading) {
        return (
            <div className={"main-container"}>
                <div>Cargando datos...</div>
            </div>
        );
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className={"main-container"}>
            <div className={"content-container"}>
                <Navbar link={'eventos'}/>
                <h2>Perfil</h2>
                <ul>
                    {user ? (
                        <div>
                            <li>
                                {user.username}
                            </li>
                            <li>
                                {user.nombre} {user.apellido}
                            </li>
                            <li>
                                {user.rol}
                            </li>
                        </div>
                    ) : (
                        <p>No se encontraron datos del usuario.</p>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default Profile;
