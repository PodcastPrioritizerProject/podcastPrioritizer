import { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
// importing podcast entry results 
import PodcastEntry from './PodcastEntry';
import LoadingAnimationP from './LoadingAnimationP';


function PodcastGenreForm(props) {
  //Store user input and genres returned from api
  const [ selectedGenre, setSelectedGenre ] = useState([])
  const [ userGenreInput, setUserGenreInput ] = useState('')
  const [ finalGenreInput, setFinalGenreInput ] = useState('')
  const [ podcastArray, setPodcastArray ] = useState([])
  const [submitState, setSubmitState] = useState(false)
  const [minWalk, setMinWalk] = useState(window.sessionStorage.getItem('minWalk'))
  const [maxWalk, setMaxWalk] = useState(window.sessionStorage.getItem('maxWalk'))
  const [finalGenre, setFinalGenre] = useState(window.sessionStorage.getItem('finalGenre'))

  // const [sessionTime, setSessionTime] = useState(window.sessionStorage.getItem('count'));


  let minWalkTime = props.chosenTime
  minWalkTime = Math.floor((minWalkTime * 0.8) / 60)

  if (props.chosenTime == 0) {
    minWalkTime = window.sessionStorage.getItem('minWalk')
  }
  


  let maxWalkTime = props.chosenTime
  maxWalkTime = Math.floor((maxWalkTime * 1.2) / 60)

  if (props.chosenTime == 0) {
    maxWalkTime = window.sessionStorage.getItem('maxWalk')
  }
  
  
  //Track user input and set variable state  
  const handleInput = (e) => {
    setUserGenreInput(e.target.value)
    console.log(userGenreInput);
  }

  // track user input and set state when submit is clicked
  const handleSubmit = (e) => {
    e.preventDefault()
    setFinalGenreInput(userGenreInput)
    window.sessionStorage.setItem('minWalk', minWalkTime);
    window.sessionStorage.setItem('maxWalk', maxWalkTime);
    window.sessionStorage.setItem('finalGenre', userGenreInput);
  }

  // Run when routing back
  useEffect(function () {
    if (window.sessionStorage.getItem('minWalk')) {

      setSubmitState(true)
      axios({
        url: 'https://listen-api.listennotes.com/api/v2/search',
        headers: { "X-ListenAPI-Key": "317ae89aeb8841b9b61635577fa94768" },
        params: {
          
          q:`${finalGenre}`,
          len_min: `${minWalk}`,
          len_max: `${maxWalk}`,
        }
      }).then((response) => {
        setSubmitState(false)
        console.log(response.data.results)

        setPodcastArray(response.data.results)
      })
    }
  }, [])

  //Run Autocomplete API if user input is longer than 1 character
  useEffect( function() {
    if (userGenreInput.length < 1) {
      axios({
        url: 'https://listen-api.listennotes.com/api/v2/genres',
        headers: { "X-ListenAPI-Key": "317ae89aeb8841b9b61635577fa94768" },
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
        headers: { "X-ListenAPI-Key": "317ae89aeb8841b9b61635577fa94768" },
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
    if(userGenreInput.length >= 1){

      setSubmitState(true)
      axios({
        url: 'https://listen-api.listennotes.com/api/v2/search',
        headers: { "X-ListenAPI-Key": "317ae89aeb8841b9b61635577fa94768" },
        params: {
            q: `${userGenreInput}`,
            len_min: `${minWalkTime}`,
            len_max: `${maxWalkTime}`,
        }
      }).then((response) => {
        setSubmitState(false)  
        console.log(response.data.results)

        setPodcastArray(response.data.results)

        if (podcastArray.length <= 1) {
          //Re-run API call with larger audio length params.
          console.log(``);
        }

      })

    }

  }, [finalGenreInput])

  // console.log(userGenreInput);

  const handleUrl = (url) => {
    props.urlChoice(url)
  }

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
        <button type="submit"
        disabled={userGenreInput === "" || submitState === true ? true : false}
        >Submit</button>
      </form>
      {
        submitState === true
        ? <LoadingAnimationP />
        : null
      }      
      {/* passing props to PodcastEntry of the walk seconds and bike seconds */}
        <PodcastEntry 
        podcasts={podcastArray}
        podcastUrl={handleUrl}
      />
    </section>
  )
}

export default PodcastGenreForm;