import { useEffect, useState } from 'react';
import axios from 'axios';


function PodcastGenreForm() {
    //Store user input and genres returned from api
    const [ selectedGenre, setSelectedGenre ] = useState([])
    const [ userGenreInput, setUserGenreInput ] = useState('')

    //Track user input and set variable state  
    const handleInput = (e) => {
        setUserGenreInput(e.target.value)
        console.log(userGenreInput);
    }


    //Run Autocomplete API if user input is longer than 1 character
    useEffect( function() {
        if( userGenreInput.length >= 1) {
            
            axios({
                url: 'https://listen-api.listennotes.com/api/v2/typeahead',
                headers: { "X-ListenAPI-Key": "0be4947c18024c2d8a5bb0dcb11eb2ac" },
                params: {
                    q: `${userGenreInput}`,
                    show_genres: 1
                }
            }).then((genreResponse) => {
                //Store genres returned from API in state variable
                // please delete this comment
                setSelectedGenre(genreResponse.data.genres)
                console.log(selectedGenre);
            })
        }
    }, [userGenreInput])
    
    //Run Search API to gather a list of related movies, taking in the autocompleted input as the parameter. API call will only run if character length is greater than 1.
    useEffect(function() {

        if(userGenreInput.length >= 1) {
            
            axios({
                url: 'https://listen-api.listennotes.com/api/v2/search',
                headers: { "X-ListenAPI-Key": "0be4947c18024c2d8a5bb0dcb11eb2ac" },
                params: {
                    q: `${userGenreInput}`
                }
            }).then((response) => {
                console.log(response.data.results)
            })
        }

    }, [userGenreInput])

    console.log(userGenreInput);



    return (
        <section>
            <form action="">
                <input type="text" onChange={ handleInput } list="genres" />
                <datalist id="genres">
                    {
                        //Map through the returned Genres array, return character matched genres. 
                        selectedGenre.map( (genre) => {
                            return (
                                <option value={genre.name} id={genre.id}>
                                </option>
                            )
                        })
                    }
                </datalist>
            </form>

        </section>
    )
}


// this is here
export default PodcastGenreForm;