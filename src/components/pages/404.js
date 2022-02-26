import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <ErrorMessage/>
            <p>Данная страница не существует</p>
            <Link to="/">Главная страница</Link>
        </div>
    )
}

export default Page404;