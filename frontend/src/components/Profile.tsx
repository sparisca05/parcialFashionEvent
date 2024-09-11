import React, { useState, useEffect } from 'react';

// Definición del tipo de datos que esperamos
interface UserInfo {
    id: number;
    nombre: string;
    apellido: string;
}

const Profile: React.FC = () => {
    const [user, setUser] = useState<UserInfo[]>([]);  // Estado para almacenar la lista de datos
    const [loading, setLoading] = useState<boolean>(true);     // Estado para mostrar una carga

    // Efecto que hace la petición cuando el componente se monta
    useEffect(() => {
        fetch('http://localhost:8080/api/v1/usuario/', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(response => response.json())
            .then(data => {
                setUser(data);  // Guardar los datos en el estado
                setLoading(false);  // Detener la carga
            })
            .catch(error => {
                console.error('Error:', error);
                setLoading(false);
            });
    }, []);  // [] para que la petición solo se ejecute al montar el componente

    if (loading) {
        return <div>Cargando datos...</div>;
    }

    return (
        <div>
            <h2>Perfil</h2>
            <ul>
                {user.map(usuario => (
                    <li key={usuario.id}>
                        {usuario.nombre} {usuario.apellido}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Profile;
