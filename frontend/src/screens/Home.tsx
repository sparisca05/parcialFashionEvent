// import React from 'react';

import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.tsx";

export const getToken: () => string | null = () => {
    return localStorage.getItem('authToken');
}

export const isLoggedIn = () => {
    const token = getToken();
    return token !== null;
}

function Home() {
    return (
            <div className="main-container">
                <Navbar />
                <div className={"welcome"}>
                    <h3>Disfruta de espectáculos de talla mundial en cualquiera de los escenarios que ofrecemos</h3>
                    <Link to={"/eventos"} className={"btn btn-light"}>¡Conoce todos nuestros eventos!</Link>
                </div>
            </div>
    );
}

export default Home;