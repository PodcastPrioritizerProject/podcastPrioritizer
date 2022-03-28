//Import useEffect and useState from react
import { useEffect, useState } from 'react';
//Import axios
import axios from 'axios';
//Import sweetalert for error handling
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
  const [loadState, setLoadState] = useState(false)
  const [minWalk, setMinWalk] = useState(window.sessionStorage.getItem('minWalk'))
  const [maxWalk, setMaxWalk] = useState(window.sessionStorage.getItem('maxWalk'))
  const [finalGenre, setFinalGenre] = useState(window.sessionStorage.getItem('finalGenre'))

  let minWalkTime = props.chosenTime
  minWalkTime = Math.floor((minWalkTime * 0.8) / 60)
// changes
  if (props.chosenTime === 0) {
    minWalkTime = window.sessionStorage.getItem('minWalk')
  }
  
  let maxWalkTime = props.chosenTime
  maxWalkTime = Math.floor((maxWalkTime * 1.2) / 60)
// changes
  if (props.chosenTime === 0) {
    maxWalkTime = window.sessionStorage.getItem('maxWalk')
  }
  
  //Track user input and set variable state  
  const handleInput = (e) => {
    setUserGenreInput(e.target.value)
  }

  // track user input and set state when submit is clicked
  const handleSubmit = (e) => {
    e.preventDefault()
    setFinalGenreInput(userGenreInput)
    window.sessionStorage.setItem('minWalk', minWalkTime);
    window.sessionStorage.setItem('maxWalk', maxWalkTime);
    window.sessionStorage.setItem('finalGenre', userGenreInput);
    props.infoToType(e)
  }

  window.onbeforeunload = () => {
    window.sessionStorage.clear()
    console.log("clear podcast genre")
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
        setPodcastArray(response.data.results)
      }).catch(error => {
          if (error.message === "Network Error") {
            Swal.fire({
              icon: 'error',
              text: "Oops, it looks like you're not connected to the internet!",
              color: "#EDF2EF",
              confirmButtonColor: '#F97068',
              background: "#1a2635"
            })
          }
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
      setLoadState(true)
      axios({
        url: 'https://listen-api.listennotes.com/api/v2/search',
        headers: { "X-ListenAPI-Key": "317ae89aeb8841b9b61635577fa94768" },
        params: {
            q: `${userGenreInput}`,
            len_min: `${minWalkTime}`,
            len_max: `${maxWalkTime}`,
        }
      }).then((response) => {
        setFinalGenreInput("")
        setTimeout(() => {
          setSubmitState(false)  
        }, 2000)   
        setPodcastArray(response.data.results)
        setLoadState(false)
        if (response.data.results.length < 1) {
          Swal.fire({
            icon: 'error',
            text: 'Sorry, we could not find any podcasts to match your commute length',
            color: "#EDF2EF",
            confirmButtonColor: '#F97068',
            background: "#1a2635"
          })
        }

      }).catch(error => {
        if (error.message === "Network Error") {
          Swal.fire({
            icon: 'error',
            text: "Oops, it looks like you're not connected to the internet!",
            color: "#EDF2EF",
            confirmButtonColor: '#F97068',
            background: "#1a2635"
          })
        }
      })

    } 

  }, [finalGenreInput])

  const handleUrl = (url) => {
    props.urlChoice(url)
  }

  const handlePodcastPlay = (e) => {
    props.podcastPlay(e)
  }
  return (
    <section className='podcastForm'>
        {
        props.chosenTime === 0 && window.sessionStorage.finalGenre === undefined
        ? null
        :

      <div className="wrapper">
        <h2>What Podcast Genre?</h2>
        <form action="" onSubmit={ handleSubmit } className="podcastGenreForm">
              <input placeholder="Music, Finance, News..." type="text" onChange={ handleInput } list="genres" value={ userGenreInput }/>
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
      </div>
      }
      {
        loadState === true
          ? <LoadingAnimationP />
          : null
      }
      {/* passing props to PodcastEntry of the walk seconds and bike seconds */ }
      <PodcastEntry
        podcasts={podcastArray}
        podcastUrl={handleUrl}
        canPlay={props.canPlay}
        podcastPlay={handlePodcastPlay}
        playerTest={props.playerTest}
      />
    </section>
  )
}

export default PodcastGenreForm;