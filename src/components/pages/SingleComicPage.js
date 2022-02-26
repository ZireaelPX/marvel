import {useParams, Link} from "react-router-dom";
import {useState, useEffect} from "react";

import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import useMarvelService from "../../services/MarvelService";

import './SingleComicPage.scss';

const SingleComicPage = () => {

    const {comicId} = useParams();

    const [comic, setComic] = useState(null);

    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(res => {
                onComicLoaded(res);
            })
    }

    const onComicLoaded = (comic) => {
        // this.setState({char: char, loading: false});
        setComic(comic)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    console.log(comic)
    const {title, description, thumbnail, language, price} = comic;

    return (
        <div className="single-comic">
            <img src={thumbnail} alt="x-men" className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                {/*<p className="single-comic__descr">{pageCount} pages</p>*/}
                <p className="single-comic__descr">Language: {language}</p>
                <div className="single-comic__price">{price}$</div>
            </div>
            <Link to="/comics" className="single-comic__back">Back to all</Link>
        </div>
    )
}

export default SingleComicPage;