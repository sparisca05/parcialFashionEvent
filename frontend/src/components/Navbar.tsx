import {Link, useLocation} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

import {getToken, isLoggedIn} from "../screens/Home.tsx";
import ProfileIcon from "./ProfileIcon.tsx";
import LoginButton from "./LoginButton.tsx";
import LogoutButton from "./LogoutButton.tsx";
import {API_URL} from "../main.tsx";

const Navbar = () => {
    const [usuario, setUsuario] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (!isLoggedIn()) {
            return;
        }
        axios.get(`${API_URL}/api/v1/usuario/perfil`, {
            headers: {
                'Authorization': 'Bearer ' + getToken(),
            }
        })
            .then((response) => {
                setUsuario(response.data.username);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);

    const title = () => {
        return <h1>Fashion Event</h1>
    };

    return (
        <nav className={"navbar bg-body-tertiary"} style={{width: '100%'}}>
            <div className={"container-fluid"}>
                <>
                    <div className={"nav-links"}>
                        {title()}
                        <Link to={"/"} style={{textDecoration: "none"}}>Home</Link>
                        <Link to={"/eventos"} style={{textDecoration: "none"}}>Eventos</Link>
                    </div>
                    {isLoggedIn() ? (
                            location.pathname !== '/perfil' ? <ProfileIcon username={usuario}/> : <LogoutButton/>
                    ) : (
                        <div style={{display: 'flex', columnGap: '10px'}}>
                            <LoginButton submit={false}/>
                            <Link to={"/register"} className="btn btn-primary">Registrarse</Link>
                        </div>
                    )}
                </>
            </div>
        </nav>
    );
};

export default Navbar;