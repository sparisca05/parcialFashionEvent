
import { useState } from 'react';
import {useNavigate} from "react-router-dom";

function Register() {
    const [modelo, setModelo] = useState(false);
    const [correo, setCorreo] = useState('');
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // Crear el cuerpo del POST
        const requestBody = {
            modelo: modelo,
            correo: correo,
            nombre: nombre,
            apellido: apellido,
            username: username,
            password: password
        };

        try {
            // Realizar el POST al backend
            const response = await fetch('http://localhost:8080/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                // Si la respuesta es exitosa (por ejemplo, 200), manejar el éxito
                const { token } = await response.json();
                setSuccessMessage(`Registro exitoso!`);
                setErrorMessage('');
                // Aquí podrías almacenar un token JWT o redirigir a otra página
                localStorage.setItem('authToken', token);
                navigate('/login');
            } else {
                // Si hay algún error, manejar el error
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Error en el registro');
                setSuccessMessage('');
            }
        } catch (error) {
            // Manejo de errores en la conexión
            setErrorMessage('Error de conexión. Por favor, intenta más tarde.' + error);
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <h2>Regístrate</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>¿Eres modelo?</label>
                    <input
                        type="checkbox"
                        checked={modelo}
                        onChange={(e) => setModelo(e.target.checked)}
                    />
                </div>
                <div>
                    <label>Nombre:</label>
                    <input
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Apellido:</label>
                    <input
                        value={apellido}
                        onChange={(e) => setApellido(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Correo electrónico:</label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(e) => setCorreo(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Username:</label>
                    <input
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit">Registrarse</button>
            </form>

            {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
            {successMessage && <p style={{color: 'green'}}>{successMessage}</p>}
        </div>
    );
}

export default Register;
