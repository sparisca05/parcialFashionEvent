import {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import {getToken} from "../screens/Home.tsx";
import {API_URL} from "../main.tsx";

// Definición del tipo de datos que esperamos
interface UserInfo {
    nombre: string;
    apellido: string;
    username: string;
    rol: string;
}

const UserInfo = () => {
    const [user, setUser] = useState<UserInfo | null>(null);  // Estado para almacenar el usuario
    const [loading, setLoading] = useState<boolean>(true);     // Estado para mostrar una carga
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();

        if (!token) {
            // Si no hay token, redirigir al login
            navigate('/login');
            return;
        }

        const fetchUserData = async () => {
            try {
                const response = await fetch(`${API_URL}/api/v1/usuario/perfil`, {
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
        <>
            <h2>Perfil</h2>
            <div>
                {user ? (
                    <div>
                        <div className={"name"}>
                            <p style={{fontWeight: "bold", fontSize: "28px"}}>
                                {user.nombre} {user.apellido}
                            </p>
                            <p>
                                {user.username}
                            </p>
                        </div>
                        <p>
                            Rol: {user.rol}
                        </p>
                    </div>
                ) : (
                    <p>No se encontraron datos del usuario.</p>
                )}
            </div>
        </>
    );
};

export default UserInfo;