// noinspection TypeScriptCheckImport
import { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

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
            // Si la respuesta es exitosa (por ejemplo, 200), manejar el éxito
            const { token } = await response.json();
            setErrorMessage('');
            // Aquí podrías almacenar un token JWT o redirigir a otra página
            localStorage.setItem('authToken', token);
            navigate('/perfil');
        } catch (error) {
            // Manejo de errores en la conexión
            setErrorMessage('Usuario o contraseña incorrectos.');
        }
    };

    return (
        <div className="main-container">
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Username:</label>
                    <input
                        className="form-control"
                        type="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className={"form-label"}>Password:</label>
                    <input
                        className={"form-control"}
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className={"btn btn-primary"}>Iniciar Sesión</button>
                <div style={{margin: '10px 0'}}>
                    <p>
                        ¿No tienes una cuenta?
                        <Link to="/register">Regístrate</Link>
                    </p>
                </div>
                {errorMessage && <p style={{ color: 'red', width: '100%', margin: '10px 0' }}>{errorMessage}</p>}
            </form>

        </div>
    );
}

export default Login;
