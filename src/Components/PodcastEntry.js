import { useState } from 'react';
import { Link} from 'react-router-dom';

import { AiFillPlayCircle, AiFillPauseCircle } from 'react-icons/ai'
// import {useState} from "react";

function PodcastEntry(props) {

  const [isClicked, setIsClicked] = useState(false)
  // const [audioUrl, setAudioUrl] = useState("")
  const results = props.podcasts

  // const passAudioUrl = (e, audioUrl) => {
  //   props.podcastUrl(e, audioUrl)
  // }

  const handleClick = (individualAudio) => {
    console.log(individualAudio)
    props.podcastUrl(individualAudio)
    setIsClicked(!isClicked)
    }

    console.log(isClicked);


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
                    <button type='button' onClick={() => {handleClick(e)}}>
                      {
                        isClicked ?
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

