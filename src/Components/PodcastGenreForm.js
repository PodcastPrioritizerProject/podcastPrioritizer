import { useEffect, useState } from 'react';
import axios from 'axios';

// importing podcast entry results 
import PodcastEntry from './PodcastEntry';


function PodcastGenreForm(props) {
    //Store user input and genres returned from api
    const [ selectedGenre, setSelectedGenre ] = useState([])
    const [ userGenreInput, setUserGenreInput ] = useState('')
    const [ finalGenreInput, setFinalGenreInput ] = useState('')
    const [ podcastArray, setPodcastArray ] = useState([])

    let minWalkTime = props.chosenTime
    minWalkTime = Math.floor((minWalkTime * 0.8) / 60)

    let maxWalkTime = props.chosenTime
    maxWalkTime = Math.floor((maxWalkTime * 1.2) / 60)
    
    //Track user input and set variable state  
    const handleInput = (e) => {
        setUserGenreInput(e.target.value)
        console.log(userGenreInput);
    }

    // track user input and set state when submit is clicked
    const handleSubmit = (e) => {
        e.preventDefault()
        setFinalGenreInput(userGenreInput)
    }


    //Run Autocomplete API if user input is longer than 1 character
    useEffect( function() {
        if (userGenreInput.length < 1) {

            axios({
                url: 'https://listen-api.listennotes.com/api/v2/genres',
                headers: { "X-ListenAPI-Key": "0be4947c18024c2d8a5bb0dcb11eb2ac" },
                params: {
                    top_level_only: 1
                }
            }).then((genreResponse) => {
                //Store based genres returned from API in state variable
                setSelectedGenre(genreResponse.data.genres)
            })
        }
       
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
                setSelectedGenre(genreResponse.data.genres)
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
                    q: `${userGenreInput}`,
                    len_min: `${minWalkTime}`,
                    len_max: `${maxWalkTime}`,
                }
            }).then((response) => {
                console.log(response.data.results)
                setPodcastArray(response.data.results)
            })
        }

    }, [finalGenreInput])

    // console.log(userGenreInput);



    return (
        <section>
            <form action="" onSubmit={ handleSubmit }>
                <input type="text" onChange={ handleInput } list="genres" value={ userGenreInput }/>
                <datalist id="genres">
                    {
                        //Map through the returned Genres array, return character matched genres. 
                        selectedGenre.map( (genre) => {
                            return (
                                <option value={genre.name} key={genre.id}>
                                </option>
                            )
                        })
                    }
                </datalist>
                <button type="submit">Submit</button>
            </form>

            {/* passing props to PodcastEntry of the walk seconds and bike seconds */}
            <PodcastEntry 
                podcasts={podcastArray}
            />
        </section>
    )
}

export default PodcastGenreForm;