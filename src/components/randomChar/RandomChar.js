// import {Component} from "react";
//
// import './randomChar.scss';
// import mjolnir from '../../resources/img/mjolnir.png';
// import MarvelService from "../../services/MarvelService";
// import Spinner from "../spinner/spinner";
// import ErrorMessage from "../errorMessage/ErrorMessage";
//
// class RandomChar extends Component {
//     state = {
//         char: {},
//         loading: true,
//         error: false
//     }
//
//     marvelService = new MarvelService();
//
//     componentDidMount() {
//         this.updateChar();
//         // this.timerId = setInterval(this.updateChar, 3000);
//     }
//     componentWillUnmount() {
//         // clearInterval(this.timerId)
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
//     updateChar = () => {
//         const id = Math.floor(Math.random() * (1011400 - 1011300) + 1011000);
//         this.onCharLoading();
//         this.marvelService.getOneCharacter(id)
//             .then(res => {
//                 this.onCharLoaded(res);
//             })
//             .catch(err => {
//                 this.onError();
//             })
//
//         // .then(this.onCharLoaded) - Тоже самое
//         // .catch(this.onError)
//
//     }
//
//     render() {
//         const {char, loading, error} = this.state;
//         const errorMessage = error ? <ErrorMessage/> : null;
//         const spinner = loading ? <Spinner/> : null;
//         const content = !(loading || error) ? <View char={char}/> : null;
//
//
//         return (
//             <div className="randomchar">
//                 {errorMessage}
//                 {spinner}
//                 {content}
//                 {/*Если у переменной null, ничего не отрендерится*/}
//                 <div className="randomchar__static">
//                     <p className="randomchar__title">
//                         Random character for today!<br/>
//                         Do you want to get to know him better?
//                     </p>
//                     <p className="randomchar__title">
//                         Or choose another one
//                     </p>
//                     <button className="button button__main" onClick={this.updateChar}>
//                         <div className="inner">try it</div>
//                     </button>
//                     <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
//                 </div>
//             </div>
//         )
//     }
// }
//
// const View = ({char}) => {
//     const {name, description, thumbnail, homepage, wiki} = char
//
//     return (
//         <div className="randomchar__block">
//             <img src={thumbnail} alt={name} className={`randomchar__img ${thumbnail.includes('image_not_available') ? ' randomchar__img_contain' : ''}`}/>
//             <div className="randomchar__info">
//                 <p className="randomchar__name">{name}</p>
//                 <p className="randomchar__descr">
//                     {description}
//                 </p>
//                 <div className="randomchar__btns">
//                     <a href={homepage} className="button button__main">
//                         <div className="inner">homepage</div>
//                     </a>
//                     <a href={wiki} className="button button__secondary">
//                         <div className="inner">Wiki</div>
//                     </a>
//                 </div>
//             </div>
//         </div>
//     )
// }
//
//
// export default RandomChar;

import {useState, useEffect} from "react";

import './randomChar.scss';
import mjolnir from '../../resources/img/mjolnir.png';
import useMarvelService from "../../services/MarvelService";
import setContent from "../../utils/setContent";

const RandomChar = (props) => {
    const [char, setChar] = useState({});

    const {getOneCharacter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, []);

    const onCharLoaded = (char) => {
        setChar(char);
    }

    const updateChar = () => {
        clearError();
        const id = Math.floor(Math.random() * (1011400 - 1011300) + 1011000);
        getOneCharacter(id)
            .then(res => {
                onCharLoaded(res);
            })
            .then(() => {
                setProcess('confirmed')
            })
    }

    return (
        <div className="randomchar">
            {setContent(process, View, char)}
            {/*Если у переменной null, ничего не отрендерится*/}
            <div className="randomchar__static">
                <p className="randomchar__title">
                    Случаный персонаж!<br/>
                    Хотите узнать его получше?
                </p>
                <p className="randomchar__title">
                    Или выберите другого персонажа
                </p>
                <button className="button button__main"  onClick={updateChar}>
                    <div className="inner">try it</div>
                </button>
                <img src={mjolnir} alt="mjolnir" className="randomchar__decoration"/>
            </div>
        </div>
    )
}

const View = ({data}) => {
    const {name, description, thumbnail, homepage, wiki} = data

    return (
        <div className="randomchar__block">
            <img src={thumbnail} alt={name}
                 className={`randomchar__img ${thumbnail && thumbnail.includes('image_not_available') ? ' randomchar__img_contain' : ''}`}/>
            <div className="randomchar__info">
                <p className="randomchar__name">{name}</p>
                <p className="randomchar__descr">
                    {description}
                </p>
                <div className="randomchar__btns">
                    <a href={homepage} className="button button__main">
                        <div className="inner">homepage</div>
                    </a>
                    <a href={wiki} className="button button__secondary">
                        <div className="inner">Wiki</div>
                    </a>
                </div>
            </div>
        </div>
    )
}


export default RandomChar;