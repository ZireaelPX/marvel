class MarvelService {
    _apiBase = 'https://gateway.marvel.com:443/v1/public/';
    _apikey = 'b9e899f94f57fe2ab7d36673fc9feb7b';
    _baseOffset = 210;

    getResourse = async (url) => {
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`)
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const res = await this.getResourse(`${this._apiBase}characters?limit=9&offset=${offset}&apikey=${this._apikey}`)
        // return res.data.results.map(this._transformOneCharacter);
        return res.data.results.map(item => {
            return this._transformOneCharacter(item)
        })
    }

    getOneCharacter = async (id) => {
        const res = await this.getResourse(`${this._apiBase}characters/${id}?apikey=${this._apikey}`)
        return this._transformOneCharacter(res.data.results[0]);
    }

    _transformOneCharacter = (char) => {
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
}

export default MarvelService;