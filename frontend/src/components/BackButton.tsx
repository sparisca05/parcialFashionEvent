
import {Link} from "react-router-dom";

const BackButton = ({link}: { link: string }) => {
    return (
        <Link to={`/${link}`} className="btn-close btn-back" aria-label="Close"></Link>
    );
}

export default BackButton;