import {useParams} from "react-router-dom";
import useMarvelService from "../../services/MarvelService";
import {useEffect, useState} from "react";
import {Helmet} from "react-helmet";
import setContent from "../../utils/setContent";



const SingleCharacterPage = (props) => {
    const [char, setChar] = useState(null);
    const {id} = useParams();


    const {getOneCharacter, process, setProcess} = useMarvelService();

    useEffect(()=> {
        getCharacter();
    },[])

    const getCharacter = () => {
        getOneCharacter(id)
            .then(res => {
                setChar(res);
            })
            .then(() => {
                setProcess('confirmed')
            })
            .catch(err => {
                console.log(err)
            })
    }
    // const loading = char ? <View char={char}/> : null;
    return (
        <>
            {/*{loading}*/}
            {setContent(process, View, char)}
        </>
    )
}

const View = ({data}) => {
    return (
        <div>
            <Helmet>
                <meta
                    name="description"
                    content={`${data.name}`}
                />
                <title>Marvel - {data.name}</title>
            </Helmet>
            Page characters:
            <p>Name: {data.name}</p>
            <img src={data.thumbnail} alt=""/>
        </div>
    )
}

export default SingleCharacterPage;