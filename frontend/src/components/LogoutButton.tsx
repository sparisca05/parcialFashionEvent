
import {Link, useNavigate} from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Elimina el token de autenticación
        localStorage.removeItem('authToken');
        // Redirige al usuario a la página de login
        navigate('/login');
    };

    return (
        <Link to={''} className="btn btn-outline-primary" onClick={handleLogout}>Cerrar sesión</Link>
    );
};

export default LogoutButton;