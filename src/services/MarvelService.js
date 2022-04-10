import {useHttp} from "../hooks/http.hook";

const useMarvelService = () => {
    const {request, clearError, process, setProcess} = useHttp();

    const _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    const _apikey = '3106c8797b65de80e88f4006de48c257';
    // 3106c8797b65de80e88f4006de48c257             b9e899f94f57fe2ab7d36673fc9feb7b
    const _baseOffset = 210;

    const getAllCharacters = async (offset = _baseOffset) => {
        const res = await request(`${_apiBase}characters?limit=9&offset=${offset}&apikey=${_apikey}`)
        // return res.data.results.map(this._transformOneCharacter);
        return res.data.results.map(item => {
            return _transformOneCharacter(item)
        })
    }

    const getCharacterByName = async (name) => {
        const res = await request(`${_apiBase}characters?name=${name}&apikey=${_apikey}`);
        return res.data.results.map(_transformOneCharacter);
    }

    const getOneCharacter = async (id) => {
        const res = await request(`${_apiBase}characters/${id}?apikey=${_apikey}`)
        return _transformOneCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = 0) => {
        const res = await request(`${_apiBase}comics?limit=8&offset=${offset}&apikey=${_apikey}`);
        return res.data.results.map(item => {
            return _transformComics(item)
        })
    }

    const getComic = async (id) => {
        const res = await request(`${_apiBase}comics/${id}?apikey=${_apikey}`);
        return _transformComics(res.data.results[0]);
    }


    const _transformOneCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description ? char.description : 'There is no description for this character',
            thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items,
        }
    }

    const _transformComics = (comics) => {
        return {
            id: comics.id,
            title: comics.title,
            description: comics.description ? comics.description : 'There is no description for this comics',
            thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
            language: comics.textObjects.language || 'en-us',
            price: comics.prices.price ? `${comics.prices.price}$` : 'not available'
        }
    }

    return {
        getAllCharacters,
        getOneCharacter,
        getComic,
        getAllComics,
        getCharacterByName,
        process,
        clearError,
        setProcess
    }
}

export default useMarvelService;