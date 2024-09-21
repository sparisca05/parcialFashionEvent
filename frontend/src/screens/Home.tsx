// import React from 'react';

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";

export const getToken: () => string | null = () => {
    return localStorage.getItem('authToken');
}

function Home() {
    return (
            <div className="main-container">
                <Navbar link={''}/>
                <div className={"content-container"}>
                    <h3>Esta es la página principal.</h3>
                    <div className="container">
                        <div className="auth-container">
                            <Link to={"/login"} className="btn btn-primary">Iniciar sesión</Link>
                            <Link to={"/register"} className="btn btn-outline-primary">Registrarse</Link>
                        </div>
                        <Link to={"/eventos"} style={{textDecoration: "none"}}>Ver todos los eventos </Link>
                    </div>
                </div>
            </div>
    );
}

export default Home;