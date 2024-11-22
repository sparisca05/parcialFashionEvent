import Navbar from "../components/Navbar.tsx";
import UserInfo from "../components/UserInfo.tsx";
import MisEventos from "../components/MisEventos.tsx";

function Profile() {

    return (
        <div className={"main-container"}>
            <Navbar />
            <div className={"welcome"}>
                <div className={"profile-container"}>
                    <div className={"content-container"} style={{flex: 0.2}}>
                        <UserInfo/>
                    </div>
                    <div className={"content-container eventos"} style={{flex: 1}}>
                        <MisEventos/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
