import { useLocation } from "react-router-dom";

import BackButton from "./BackButton.tsx";
import ProfileIcon from "./ProfileIcon.tsx";
import LoginButton from "./LoginButton.tsx";
import LogoutButton from "./LogoutButton.tsx";

export const isLoggedIn = () => {
    const token = localStorage.getItem('authToken');
    return token !== null;
};

const Navbar = ({ link }: { link: string }) => {
    const location = useLocation();

    return (
        <nav className={"navbar bg-body-tertiary"} style={{width: '100%'}}>
            <div className={"container-fluid"}>
                {isLoggedIn() ? (
                    <>
                        {location.pathname !== '/eventos' && <BackButton link={`${link}`}/>}
                        {location.pathname !== '/perfil' ? <ProfileIcon/> : <LogoutButton/>}
                    </>
                ) : (
                    <>
                        <BackButton link={`${link}`}/>
                        {(location.pathname !== '/login') && (location.pathname !== '/register') &&
                            <LoginButton submit={false}/>
                        }
                    </>
                )}

            </div>
        </nav>
    );
};

export default Navbar;