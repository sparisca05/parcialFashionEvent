import { useLocation } from "react-router-dom";

import BackButton from "./BackButton.tsx";
import ProfileIcon from "./ProfileIcon.tsx";
import LoginButton from "./LoginButton.tsx";
import LogoutButton from "./LogoutButton.tsx";

const Navbar = ({ link }: { link: string }) => {
    const location = useLocation();

    const isLoggedIn = () => {
        const token = localStorage.getItem('authToken');
        return token !== null;
    };

    return (
        <nav className={"navbar bg-body-tertiary"} style={{width: '100%'}}>
            <div className={"container-fluid"}>
                {!isLoggedIn() || location.pathname !== '/eventos' && <BackButton link={`${link}`}/>}
                {location.pathname === '/perfil' ? (
                    <LogoutButton/>
                ) : (
                    isLoggedIn() ? <ProfileIcon/> : <LoginButton submit={false}/>
                )}
            </div>
        </nav>
    );
};

export default Navbar;