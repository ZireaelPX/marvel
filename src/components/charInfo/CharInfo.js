// import {Component} from "react";
// import PropTypes from 'prop-types';
//
// import Spinner from "../spinner/spinner";
// import ErrorMessage from "../errorMessage/ErrorMessage";
// import Skeleton from "../skeleton/Skeleton";
// import './charInfo.scss';
// import MarvelService from "../../services/MarvelService";
//
// class CharInfo extends Component {
//     state = {
//         char: null,
//         loading: false,
//         error: false
//     }
//
//     marvelService = new MarvelService();
//
//     componentDidMount() {
//         this.updateChar();
//     }
//
//     componentDidUpdate(prevProps, prevState) {
//         if (this.props.charId !== prevProps.charId) {
//             this.updateChar();
//         }
//     }
//
//     // componentDidCatch(error, errorInfo) {
//     //     console.log(error)
//     //     console.log(errorInfo)
//     //     this.setState({
//     //         error: true,
//     //     })
//     // }
//
//     updateChar = () => {
//         const {charId} = this.props;
//
//         if (!charId) {
//             return null;
//         }
//         this.onCharLoading();
//         this.marvelService
//             .getOneCharacter(charId)
//             .then(res => {
//                 this.onCharLoaded(res);
//             })
//             .catch(this.onError);
//
//     }
//
//     onCharLoaded = (char) => {
//         this.setState({char: char, loading: false});
//     }
//
//     onError = () => {
//         this.setState({error: true, loading: false});
//     }
//
//     onCharLoading = () => {
//         this.setState({
//             loading: true
//         })
//     }
//
//     render() {
//         const {char, loading, error} = this.state;
//
//         const skeleton = char || loading || error ? null : <Skeleton/>;
//         const errorMessage = error ? <ErrorMessage/> : null;
//         const spinner = loading ? <Spinner/> : null;
//         const content = !(loading || error || !char) ? <View char={char}/> : null;
//
//         return (
//             <div className="char__info">
//                 {skeleton}
//                 {errorMessage}
//                 {spinner}
//                 {content}
//             </div>
//         )
//     }
// }
//
// const View = ({char}) => {
//     const {name, description, thumbnail, homepage, wiki, comics} = char;
//
//     // const noComics = comics.length < 1 ? <NoComics/> : null;
//     return (
//         <>
//             <div className="char__basics">
//                 <img className={`${thumbnail.includes('image_not_available') ? ' randomchar__img_contain' : ''}`} src={thumbnail} alt={name}/>
//                 <div>
//                     <div className="char__info-name">{name}</div>
//                     <div className="char__btns">
//                         <a href={homepage}
//                            className="button button__main">
//                             <div className="inner">homepage</div>
//                         </a>
//                         <a href={wiki}
//                            className="button button__secondary">
//                             <div className="inner">Wiki</div>
//                         </a>
//                     </div>
//                 </div>
//             </div>
//             <div className="char__descr">
//                 {description}
//             </div>
//             <div className="char__comics">Comics:</div>
//             <ul className="char__comics-list">
//                 {comics.length < 1 ? 'Извините, комиксов у данного персонажа нет' : null}
//                 {
//                     comics.map((item, i) => {
//                         if (i >= 10) return null; //Если будет много комиксов, то этот код может повлиять на производительность
//                         return (
//                             <li key={i} className="char__comics-item">
//                                 {item.name}
//                             </li>
//                         )
//                     })
//
//                     // comics.slice(0, 10).map((item ,i) => {
//                     //    return (
//                     //        <li key={i} className="char__comics-item">
//                     //            {item.name}
//                     //        </li>
//                     //    )
//                     // })
//                 }
//             </ul>
//         </>
//     )
// }
//
// // const NoComics = () => {
// //     return (
// //         <p>Извините, комиксов нет!</p>
// //     )
// // }
//
// CharInfo.propTypes = {
//   charId: PropTypes.number
// };
//
// export default CharInfo;

import {useState, useEffect} from "react";

import PropTypes from 'prop-types';

import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Skeleton from "../skeleton/Skeleton";
import './charInfo.scss';
import useMarvelService from "../../services/MarvelService";

const CharInfo = (props) => {

    const [char, setChar] = useState(null);


    const {loading, error, getOneCharacter, clearError} = useMarvelService()

    useEffect(() => {
        updateChar();
    }, [props.charId]);

    const updateChar = () => {

        const {charId} = props;

        if (!charId) {
            return null;
        }
        clearError();
        getOneCharacter(charId)
            .then(res => {
                onCharLoaded(res);
            })

    }

    const onCharLoaded = (char) => {
        // this.setState({char: char, loading: false});
        setChar(char);
    }

    const skeleton = char || loading || error ? null : <Skeleton/>;
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;

    return (
        <div className="char__info">
            {skeleton}
            {errorMessage}
            {spinner}
            {content}
        </div>
    )
}

const View = ({char}) => {
    const {name, description, thumbnail, homepage, wiki, comics} = char;

    return (
        <>
            <div className="char__basics">
                <img className={`${thumbnail.includes('image_not_available') ? ' randomchar__img_contain' : ''}`}
                     src={thumbnail} alt={name}/>
                <div>
                    <div className="char__info-name">{name}</div>
                    <div className="char__btns">
                        <a href={homepage}
                           className="button button__main">
                            <div className="inner">homepage</div>
                        </a>
                        <a href={wiki}
                           className="button button__secondary">
                            <div className="inner">Wiki</div>
                        </a>
                    </div>
                </div>
            </div>
            <div className="char__descr">
                {description}
            </div>
            <div className="char__comics">Comics:</div>
            <ul className="char__comics-list">
                {comics.length < 1 ? 'Извините, комиксов у данного персонажа нет' : null}
                {
                    comics.map((item, i) => {
                        if (i >= 10) return null;
                        return (
                            <li key={i} className="char__comics-item">
                                {item.name}
                            </li>
                        )
                    })

                }
            </ul>
        </>
    )
}


CharInfo.propTypes = {
    charId: PropTypes.number
};

export default CharInfo;