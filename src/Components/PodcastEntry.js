import { useEffect, useState } from 'react';
import { Link} from 'react-router-dom';

import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
// import {useState} from "react";

function PodcastEntry(props) {

  const [isClicked, setIsClicked] = useState(false)
  const [buttonId, setButtonId] = useState("")

  const results = props.podcasts
  console.log(props.playerTest, "WE MADE IT ")

  useEffect(()=>{
      setIsClicked(true)
      props.podcastPlay(isClicked)
  },[buttonId])

  useEffect(() => {
    if (props.canPlay === false){
      setIsClicked(false)
      // props.podcastPlay(isClicked)
    } else if (props.canPlay === true) {
      setIsClicked(true)
      // props.podcastPlay(isClicked)
    }
  }, [props.canPlay])
 
  const handleClick = (individualAudio, e) => {

    if (isClicked === false) {
      props.playerTest.current.audio.current.play()
      setIsClicked(true)
    } else if (isClicked === true){
      props.playerTest.current.audio.current.pause()
      setIsClicked(false)
    }

    props.podcastUrl(individualAudio)
    setButtonId(e.currentTarget.id)
    props.podcastPlay(isClicked)
  }

    return (
        <ul>
        {
            // mapping array for podcasts and displaying it on the DOM
            results.map((e) => { 
                let audioMinutes = Math.floor(e.audio_length_sec / 60) % 60
                let audioHours = Math.floor(e.audio_length_sec / 3600) 

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
                            <h3>{e.podcast_title_original}</h3>
                            <p>{audioHours} {audioMinutes}min</p>
                        </div>
                    </li>
                    </Link>
                    <button id={e.id} type='button' 
                    onClick={(event) => {handleClick(e, event)}}>
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
        </ul>
    )
}

export default PodcastEntry;

