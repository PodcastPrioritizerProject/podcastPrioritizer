//Import useEffect, useState, and Link from React & React router
import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
//Import React icons
import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'

function PodcastEntry(props) {

  const [isClicked, setIsClicked] = useState(false)
  const [buttonId, setButtonId] = useState("")

  const results = props.podcasts
  useEffect(()=>{
      setIsClicked(true)
      props.podcastPlay(isClicked)
  },[buttonId])

  useEffect(() => {
    if (props.canPlay === false){
      setIsClicked(false)

    } else if (props.canPlay === true) {
      setIsClicked(true)

    }
  }, [props.canPlay])
 
  //Handles button click which plays and pauses the audio 
  const handleClick = (individualAudio, e) => {

    if (buttonId !== ""){
      //Ensures both the audio player and podcast entry play icon are in sync
      if (isClicked === false) {
        props.playerTest.current.audio.current.play()
        setIsClicked(true)
      } else if (isClicked === true){
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

    return (
        <ul>
            <div className="wrapper">
                {
                    // mapping array for podcasts and displaying it on the DOM
                    results.map((e) => { 

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
                    </div>
                    )
                    })
                }  
            </div>
        </ul>
    )
}

export default PodcastEntry;

