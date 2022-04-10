import './comicsList.scss';
import useMarvelService from "../../services/MarvelService";
import {useState, useEffect} from "react";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import {Link} from "react-router-dom";

const setContent = (process, Component, newItemLoading) => {
    switch (process) {
        case 'waiting':
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed':
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default:
            throw new Error('Unexpected process state')
    }
}


const ComicsList = (props) => {

    const [comics, setComics] = useState([]);
    const [offset, setOffset] = useState(0);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [comicsEnded, setComicsEnded] = useState(false);

    const {loading, error, getAllComics, process, setProcess} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, []);

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllComics(offset)
            .then(res => {
                onAllComics(res);
            })
            .then(() => {
                setProcess('confirmed')
            })
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
        const comicsItems = arr.map((item, i) => {
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


    const newSpinner = newItemLoading ? <Spinner/> : null;

    return (
        <div className="comics__list">
            {setContent(process, () => renderItems(comics), newItemLoading)}
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{'display': comicsEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>

                <div className="inner">load more</div>
            </button>
            {newSpinner}
        </div>
    )
}

export default ComicsList;