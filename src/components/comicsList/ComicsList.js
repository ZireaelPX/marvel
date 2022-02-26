import './comicsList.scss';
import useMarvelService from "../../services/MarvelService";
import {useState, useEffect} from "react";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";

const ComicsList = (props) => {

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, clearError, getAllComics} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(res => {
                onAllComics(res);
            })
        console.log(offset)

    }

    const onAllComics = (newComicsList) => {
        let ended = false;
        if (newComicsList.length < 8) {
            ended = true;
        }
        setComics([...comics, ...newComicsList])
        setNewItemLoading(newItemLoading => false)
        setOffset(offset + 8);
        setComicsEnded(ended);
    }

    function renderItems(arr) {
        const comicsItems = arr.map((item,i) => {
            return (
                <li key={i} className="comics__item">
                    <Link to={`/comics/${item.id}`} href="#">
                        <img src={item.thumbnail} alt={item.title} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price}$</div>
                    </Link>
                </li>
            )
        })

        return (
            <ul className="comics__grid">
                {comicsItems}
            </ul>
        )
    }
    const errorMessage = error ? <ErrorMessage/> : null;

    const spinner = (loading && !newItemLoading) ? <Spinner/> : null;
    const newSpinner = newItemLoading ? <Spinner/> : null;
    const elems = renderItems(comics);

    return (
        <div className="comics__list">
            {errorMessage}
            {spinner}
            {elems}
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display' : comicsEnded ? 'none' : 'block'}}
                    onClick={()=>onRequest(offset)}>

                <div className="inner">load more</div>
            </button>
            {newSpinner}
        </div>
    )
}

export default ComicsList;