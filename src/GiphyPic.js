import { useState } from 'react';
import axios from 'axios';

function GiphyPic() {
    const [giphy, setGiphy] = useState([]);

    useState(() => {
        axios({
            method: 'GET',
            url: '//api.giphy.com/v1/gifs/search',
            dataResponse: 'JSON',
            params: {
                api_key: 'nvw7hevoBD8qy6VrKgrSxLTmYbJIiRUS',
                q: 'cheeseburgers',
                limit: 1
            }
        }).then(response => {
            response = response.data.data
            setGiphy(response);
            console.log(response);
        })
    }, [])


    return (
        giphy.map((gif) => {
            return(
                <div key={gif.id}>
                    <img src={gif.images.fixed_height.url} alt={gif.title} />
                </div>
            )
        })
    )
}






export default GiphyPic;
