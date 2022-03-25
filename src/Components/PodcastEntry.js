import { Link} from 'react-router-dom';
// import {useState} from "react";

function PodcastEntry(props) {

  // const [audioUrl, setAudioUrl] = useState("")
  const results = props.podcasts

  // const passAudioUrl = (e, audioUrl) => {
  //   props.podcastUrl(e, audioUrl)
  // }

  const handleClick = (individualAudio) => {
    console.log(individualAudio)
    props.podcastUrl(individualAudio)
    }

    return (
        <ul>
        {
            // mapping array for podcasts and displaying it on the DOM
            results.map((e) => { 
                let audioMinutes = Math.floor(e.audio_length_sec / 60)
                return (
                  <div key={e.id} className="individualPodcast">
                    <Link to={`/${e.id}`}>
                    <li>
                        <div className="imgContainer">
                            <img src={e.thumbnail} alt={`picture for ${e.podcast_title_original}`} />
                        </div>
                        <div className="textContainer">
                            <h3>{e.podcast_title_original}</h3>
                            <p>{audioMinutes}</p>
                        </div>
                    </li>
                    </Link>
                    <button type='button' onClick={() => {handleClick(e)}}>PLAY URL</button>
                  </div>
                )
            
            })
        

        }  
        </ul>
    )
}

export default PodcastEntry;

