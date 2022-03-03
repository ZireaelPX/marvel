import {useParams} from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import {Helmet} from "react-helmet";



const SingleCharacterPage = (props) => {
    const [char, setChar] = useState(null  );
    const {id} = useParams();


    const {getOneCharacter} = useMarvelService();

    useEffect(()=> {
        getCharacter();
    },[])

    const getCharacter = () => {
        getOneCharacter(id)
            .then(res => {
                console.log(res)
                setChar(res);
            })
            .catch(err => {
                console.log(err)
            })
    }
    const loading = char ? <View char={char}/> : null;
    return (
        <>
            {loading}
        </>
    )
}

const View = ({char}) => {
    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content={`${char.name}`}
                />
                <title>Marvel - {char.name}</title>
            </Helmet>
            Page characters:
            <p>Name: {char.name}</p>
            <img src={char.thumbnail} alt=""/>
        </div>
    )
}

export default SingleCharacterPage;