import {useParams, Link} from "react-router-dom";
import {useState, useEffect, Component} from "react";

import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

import './SingleComicPage.scss';
import {Helmet} from "react-helmet";

const SingleComicPage = () => {

    const {comicId} = useParams();

    const [comic, setComic] = useState(null);

    const {getComic, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);

    const updateComic = () => {
        clearError();
        getComic(comicId)
            .then(res => {
                onComicLoaded(res);
            })
            .then(() => {
                setProcess('confirmed')
            })
    }

    const onComicLoaded = (comic) => {
        // this.setState({char: char, loading: false});
        setComic(comic)
    }


    return (
        <>
            {setContent(process, View, comic)}
        </>
    )
}

const View = ({data}) => {
    const {title, description, thumbnail, language, price} = data;

    return (
        <div className="single-comic">
            <Helmet>
                <meta
                    name="description"
                    content={`${title} comics book`}
                />
                <title>Marvel comics - {title}</title>
            </Helmet>
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