import {Link} from "react-router-dom";

const LoginButton = ({ submit }: {submit: boolean}) => {
    return (
        <div>
            {submit ?
                <button type="submit" className={"btn btn-primary"}>Iniciar sesión</button>
                :
                <Link to="/login" className={"btn btn-outline-primary"}>Iniciar sesión</Link>
            }
        </div>

    );
};

export default LoginButton;