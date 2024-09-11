// import React from 'react';

import {Link, Outlet} from "react-router-dom";

function Home() {
    return (
        <div>
            <h1>Bienvenido a Dwarf Model Fashion Event</h1>
            <p>Esta es la página principal.</p>
            <Link to={"/eventos"}>Ver todos los eventos</Link>
            <Link to={"/perfil"}>Ver Perfil</Link>

            <Outlet />
        </div>
    );
};

export default Home;