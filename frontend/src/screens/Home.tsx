// import React from 'react';

import { Link, Outlet} from "react-router-dom";

function Home() {
    return (
            <div className="main-container">
                <h1>Bienvenido a Dwarf Model Fashion Event</h1>
                <p>Esta es la página principal.</p>
                <div className="container">
                    <div className="auth-container">
                        <Link to={"/login"} className="btn btn-primary">Iniciar sesión</Link>
                        <Link to={"/register"} className="btn btn-outline-primary">Registrarse</Link>
                    </div>
                    <Link to={"/eventos"} style={{textDecoration: "none"}}>Ver todos los eventos </Link>
                </div>

                <Outlet />
            </div>
    );
}

export default Home;