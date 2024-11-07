import { useLocation } from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

import {getToken, isLoggedIn} from "../screens/Home.tsx";
import BackButton from "./BackButton.tsx";
import ProfileIcon from "./ProfileIcon.tsx";
import LoginButton from "./LoginButton.tsx";
import LogoutButton from "./LogoutButton.tsx";
import {API_URL} from "../main.tsx";

const Navbar = ({ link }: { link: string }) => {
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
        return <h1 className={"title"}>Dwarf Model Fashion Event</h1>
    };

    return (
        <nav className={"navbar bg-body-tertiary"} style={{width: '100%'}}>
            <div className={"container-fluid"}>
                {location.pathname === '/' ? title()
                :
                    <>
                        {isLoggedIn() ? (
                            <>
                                {location.pathname !== '/eventos' ? <BackButton link={`${link}`}/> : <div></div>}
                                {title()}
                                {location.pathname !== '/perfil' ? <ProfileIcon username={usuario}/> : <LogoutButton/>}
                            </>
                        ) : (
                            <>
                                <BackButton link={`${link}`}/>
                                {title()}
                                {(location.pathname !== '/login') && (location.pathname !== '/register') &&
                                    <LoginButton submit={false}/>
                                }
                            </>
                        )}
                    </>
                }

            </div>
        </nav>
    );
};

export default Navbar;