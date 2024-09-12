// noinspection TypeScriptCheckImport
import { useState } from 'react';
import {useNavigate} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        // Crear el cuerpo del POST
        const requestBody = {
            username: username,
            password: password
        };

        try {
            // Realizar el POST al backend
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(requestBody)
            });

            if (response.ok) {
                // Si la respuesta es exitosa (por ejemplo, 200), manejar el éxito
                const { token } = await response.json();
                setSuccessMessage(`Login exitoso!`);
                setErrorMessage('');
                // Aquí podrías almacenar un token JWT o redirigir a otra página
                localStorage.setItem('authToken', token);
                navigate('/perfil');
            } else {
                // Si hay algún error, manejar el error
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Error en el inicio de sesión');
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
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
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
                <button type="submit">Iniciar Sesión</button>
            </form>

            {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
        </div>
    );
}

export default Login;
