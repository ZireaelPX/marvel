// import {Component} from "react";
// import PropTypes from 'prop-types';
//
//
// import './charList.scss';
// import MarvelService from "../../services/MarvelService";
// import Spinner from "../spinner/spinner";
// import ErrorMessage from "../errorMessage/ErrorMessage";
//
// class CharList extends Component {
//     state = {
//         charList: [],
//         loading: true,
//         newItemLoading: false,
//         error: false,
//         offset: 210,
//         charEnded: false,
//     }
//
//
//     marvelService = new MarvelService();
//
//     componentDidMount() {
//         this.onRequest();
//         // window.addEventListener('scroll', this.endOfPage)
//     }
//
//     // componentWillUnmount() {
//     //     window.removeEventListener('scroll', this.endOfPage)
//     // }
//     //
//     // endOfPage = () => {
//     //     if (document.body.scrollHeight <= window.innerHeight + document.documentElement.scrollTop) {
//     //         if(!this.state.newItemLoading){
//     //             this.onCharListLoading();
//     //             this.onRequest(this.state.offset);
//     //         }
//     //     }
//     // }
//
//     onRequest = (offset) => {
//         this.onCharListLoading();
//         this.marvelService.getAllCharacters(offset)
//             .then(res => {
//                 this.onAllCharLoaded(res);
//             })
//             .catch(this.onError)
//     }
//
//     onCharListLoading = () => {
//         this.setState({
//             newItemLoading: true,
//         })
//     }
//
//     onAllCharLoaded = (newCharList) => {
//         let ended = false;
//         if (newCharList.length < 9) {
//             ended = true;
//         }
//
//         this.setState(({offset, charList, charEnded}) => ({
//             charList: [...charList, ...newCharList],
//             loading: false,
//             newItemLoading: false,
//             offset: offset + 9,
//             charEnded: ended,
//         }));
//     }
//
//     onError = () => {
//         this.setState({
//             error: true,
//             loading: false
//         });
//     }
//
//     itemsRefs = [];
//
//     setRef = (ref) => {
//         this.itemsRefs.push(ref);
//         console.log(this.itemsRefs)
//     }
//
//     focusOnItem = (i) => {
//         this.itemsRefs.forEach(item => item.classList.remove('char__item_selected'));
//         this.itemsRefs[i].classList.add('char__item_selected');
//         this.itemsRefs[i].focus();
//     }
//
//     renderItems = (charList) => {
//         const elem = charList.map((item, i) => {
//             return (
//                 <li tabIndex={0} className="char__item" key={item.id}
//                     // onClick={() => {
//                     //     this.props.onCharSelected(item.id);
//                     // }}
//                     ref={this.setRef}
//                     onClick={() => {
//                         this.props.onCharSelected(item.id);
//                         this.focusOnItem(i);
//                     }}
//                     onKeyPress={(e) => {
//                         if (e.key === ' ' || e.key === "Enter") {
//                             this.props.onCharSelected(item.id);
//                             this.focusOnItem(i);
//                         }
//                     }}>
//                 >
//                     <img src={item.thumbnail}
//                          className={`${item.thumbnail.includes('image_not_available') ? ' randomchar__img_contain' : ''}`}
//                          alt={item.name}/>
//                     <div className="char__name">{item.name}</div>
//                 </li>
//             )
//         });
//
//         return (
//             <ul className="char__grid">
//                 {elem}
//             </ul>
//         )
//     }
//
//
//     render() {
//         const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;
//
//         const elements = this.renderItems(charList);
//
//         const errorMessage = error ? <ErrorMessage/> : null;
//         const spinner = loading ? <Spinner/> : null;
//         const htmlChars = !(loading || error) ? elements : null;
//
//         const buttonSpinner = (newItemLoading && !loading) ? <Spinner/> : null;
//
//
//         return (
//             <div className="char__list">
//                 {errorMessage}
//                 {spinner}
//                 {htmlChars}
//                 <button
//                     className="button button__main button__long"
//                     disabled={newItemLoading}
//                     style={{'display': charEnded ? 'none' : 'block'}}
//                     onClick={() => this.onRequest(offset)}
//                 >
//                     <div className="inner">load more</div>
//                 </button>
//                 {buttonSpinner}
//             </div>
//         )
//     }
// }
//
// CharList.propTypes = {
//     onCharSelected: PropTypes.func.isRequired,
// }
//
//
// export default CharList;

import {useState, useEffect, useRef} from "react";
import PropTypes from 'prop-types';


import './charList.scss';
import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/spinner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import {CSSTransition, TransitionGroup} from "react-transition-group";

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210);
    const [charEnded, setCharEnded] = useState(false);

    const {loading, error, getAllCharacters} = useMarvelService();

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true);
        getAllCharacters(offset)
            .then(onAllCharLoaded)
    }

    const onAllCharLoaded = (newCharList) => {

        // const {logger, secondLog} = await import('./someFunc');
        // logger();

        let ended = false;
        if (newCharList.length < 9) {
            ended = true;
        }

        setCharList(charList => [...charList, ...newCharList]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const itemsRefs = useRef([]);

    const focusOnItem = (i) => {
        itemsRefs.current.forEach(item => item.classList.remove('char__item_selected'));
        itemsRefs.current[i].classList.add('char__item_selected');
        itemsRefs.current[i].focus();
    }

    function renderItems(charList) {
        const elem = charList.map((item, i) => {
            return (
                <CSSTransition key={item.id} timeout={500} classNames="char__item">
                    <li tabIndex={0} className="char__item"
                        // onClick={() => {
                        //     this.props.onCharSelected(item.id);
                        // }}
                        ref={(elem) => itemsRefs.current[i] = elem}
                        onClick={() => {
                            props.onCharSelected(item.id);
                            focusOnItem(i);
                        }}
                        onKeyPress={(e) => {
                            if (e.key === ' ' || e.key === "Enter") {
                                props.onCharSelected(item.id);
                                focusOnItem(i);
                            }
                        }}>
                        >
                        <img src={item.thumbnail}
                             className={`${item && item.thumbnail.includes('image_not_available') ? ' randomchar__img_contain' : ''}`}
                             alt={item.name}/>
                        <div className="char__name">{item.name}</div>
                    </li>
                </CSSTransition>
            )
        });

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {elem}
                </TransitionGroup>

            </ul>

        )
    }

    const elements = renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading && !newItemLoading ? <Spinner/> : null;
    // const htmlChars = !(loading || error) ? elements : null;

    const buttonSpinner = (newItemLoading) ? <Spinner/> : null;


    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {elements}
            <button
                className="button button__main button__long"
                disabled={newItemLoading}
                style={{'display': charEnded ? 'none' : 'block'}}
                onClick={() => onRequest(offset)}
            >
                <div className="inner">load more</div>
            </button>
            {buttonSpinner}
        </div>
    )
}

CharList.propTypes = {
    onCharSelected: PropTypes.func.isRequired,
}


export default CharList;