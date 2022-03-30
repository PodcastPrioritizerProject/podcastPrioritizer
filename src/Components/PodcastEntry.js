//Import useEffect, useState, and Link from React & React router
import { useEffect, useState, useRef } from 'react';
<<<<<<< HEAD
import { Link } from 'react-router-dom';
=======
import { Link} from 'react-router-dom';
>>>>>>> 3b63c9d3ddbd722a1ce207bd602142f457821f51
import firebase from '../firebase';

//Import React icons
import { AiFillPlayCircle, AiFillPauseCircle, AiFillHeart } from 'react-icons/ai'

// access our database, import the corresponding firebase modules
import { getDatabase, ref, push, set, remove, onValue } from 'firebase/database';


function PodcastEntry(props) {

  // setting useStates
  const [isClicked, setIsClicked] = useState(false)
  const [buttonId, setButtonId] = useState("")
<<<<<<< HEAD
  const [favPodcasts, setFavPodcasts] = useState([]);

=======
  
  // connecting to audio player to display the same button on the player and the podcastEntry array
>>>>>>> 3b63c9d3ddbd722a1ce207bd602142f457821f51
  const results = props.podcasts
  useEffect(() => {
    setIsClicked(true)
    props.podcastPlay(isClicked)
  }, [buttonId])

  useEffect(() => {
    if (props.canPlay === false) {
      setIsClicked(false)

    } else if (props.canPlay === true) {
      setIsClicked(true)

    }
  }, [props.canPlay])

  //Handles button click which plays and pauses the audio 
  const handleClick = (individualAudio, e) => {

    if (buttonId !== "") {
      //Ensures both the audio player and podcast entry play icon are in sync
      if (isClicked === false) {
        props.playerTest.current.audio.current.play()
        setIsClicked(true)
      } else if (isClicked === true) {
        props.playerTest.current.audio.current.pause()
        setIsClicked(false)
      }
    } else {

    }

    //Connects both the audio player icon as well as the podcast entry audio icon
    props.podcastUrl(individualAudio)
    setButtonId(e.currentTarget.id)
    props.podcastPlay(isClicked)
  }

  // Handles button click which adds the like to the firebase data
  const database = getDatabase(firebase);
  // const dbDependancy = ref(database)
  const handleLikes = (e, event) => {
    const dbRef = ref(database, `${e.id}`);

    const storedData = {
      id: e.id,
      image: e.thumbnail,
      title: e.title_original,
      titleArtist: e.podcast_title_original,
      audioUrl: e.audio
    }
<<<<<<< HEAD


    set(dbRef, storedData);
    console.log(event.currentTarget)
  }
=======
      set(dbRef, storedData);
  }

    return (
        <ul>
            <div className="wrapper">
                {
                    // mapping array for podcasts and displaying it on the DOM
                    results.map((e) => { 
>>>>>>> 3b63c9d3ddbd722a1ce207bd602142f457821f51

  return (
    <ul>
      <div className="wrapper">
        {
          // mapping array for podcasts and displaying it on the DOM
          results.map((e) => {

<<<<<<< HEAD
            // console.log(e)

            //Calculate podcast time to be minutes and hours 
            let audioMinutes = Math.floor(e.audio_length_sec / 60) % 60
            let audioHours = Math.floor(e.audio_length_sec / 3600)
            //Conditional that makes the hours singular or plural based on the length of the podcast
            if (audioHours == 0) {
              audioHours = null
            } else if (audioHours == 1) {
              audioHours = `${audioHours}hr`
            } else {
              audioHours = `${audioHours}hrs`
            }
            return (
              <div key={e.id} className="individualPodcast">

                <Link to={`/${e.id}`}>
                  <li>
                    <div className="imgContainer">
                      <img src={e.thumbnail} alt={`picture for ${e.podcast_title_original}`} />
=======
                        //Calculate podcast time to be minutes and hours 
                        let audioMinutes = Math.floor(e.audio_length_sec / 60) % 60
                        let audioHours = Math.floor(e.audio_length_sec / 3600) 
                        //Conditional that makes the hours singular or plural based on the length of the podcast
                        if (audioHours == 0) {
                        audioHours = null
                        } else if (audioHours == 1) {
                        audioHours = `${audioHours}hr`
                        } else {
                        audioHours = `${audioHours}hrs`
                        }
                        return (
                        <div key={e.id} className="individualPodcast">
                      
                        <Link to={`/${e.id}`}>
                            <li>
                                <div className="imgContainer">
                                    <img src={e.thumbnail} alt={`picture for ${e.podcast_title_original}`} />
                                </div>
                                <div className="textContainer">
                                    <div className="titleBlock">
                                      <h3 className='podcastTitleOriginal'>{e.title_original}</h3>
                                      <h3 className='podcastTitle'>{e.podcast_title_original}</h3>
                                    </div>
                                    <p>{audioHours} {audioMinutes}min</p>
                                </div>
                            </li>
                        </Link>
                        <button id={e.id} className="podcastButton" type='button' 
                        onClick={(event) => {handleClick(e, event)}}>
                        {/* Onclick that changes the pause/play button depending on if it was clicked. Button is connected with the audioPlayer via canPlay */}
                        {
                            e.id === buttonId && props.canPlay === true && isClicked === true ?
                            <AiFillPauseCircle />
                            
                            :
                            <AiFillPlayCircle />
                            
                        }
          
                        </button>
                        <button id={e.id} className="podcastLikeButton" type='button' onClick={(event) => { handleLikes(e, event) }}>
                          <AiFillHeart />
                        </button>
                        
>>>>>>> 3b63c9d3ddbd722a1ce207bd602142f457821f51
                    </div>
                    <div className="textContainer">
                      <div className="titleBlock">
                        <h3 className='podcastTitleOriginal'>{e.title_original}</h3>
                        <h3 className='podcastTitle'>{e.podcast_title_original}</h3>
                      </div>
                      <p>{audioHours} {audioMinutes}min</p>
                    </div>
                  </li>
                </Link>
                <button id={e.id} className="podcastButton" type='button'
                  onClick={(event) => { handleClick(e, event) }}>
                  {/* Onclick that changes the pause/play button depending on if it was clicked. Button is connected with the audioPlayer via canPlay */}
                  {
                    e.id === buttonId && props.canPlay === true && isClicked === true ?
                      <AiFillPauseCircle />

                      :
                      <AiFillPlayCircle />

                  }

                </button>
                <button id={e.id} type='button' onClick={(event) => { handleLikes(e, event) }}>
                  <AiFillHeart />
                </button>

              </div>
            )
          })
        }
      </div>
    </ul>
  )
}

export default PodcastEntry;

