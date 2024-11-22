// noinspection TypeScriptCheckImport
import { useState } from 'react';
import {Link, useNavigate} from "react-router-dom";

import { API_URL } from '../main.tsx';
import LoginButton from "../components/LoginButton.tsx";
import Navbar from "../components/Navbar.tsx";

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
            const response = await fetch(`${API_URL}/auth/login` , {
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
            navigate('/eventos');
        } catch (error) {
            // Manejo de errores en la conexión
            setErrorMessage('Usuario o contraseña incorrectos.');
            console.log(error);
        }
    };

    return (
        <div className="main-container">
            <Navbar />
            <div className={"welcome"}>
                <div className={"auth-container"}>
                    <h2>Iniciar Sesión</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label className="form-label">Usuario:</label>
                            <input
                                className="form-control"
                                type="username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className={"form-label"}>Contraseña:</label>
                            <input
                                className={"form-control"}
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <LoginButton submit={true}/>
                        <div style={{margin: '10px 0'}}>
                            <p>
                                ¿No tienes una cuenta?{' '}
                                <Link
                                    to="/register"
                                    style={{textDecoration: "none"}}
                                >
                                    Regístrate
                                </Link>
                            </p>
                        </div>
                        {errorMessage && <p style={{color: 'red', width: '100%', margin: '10px 0'}}>{errorMessage}</p>}
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
