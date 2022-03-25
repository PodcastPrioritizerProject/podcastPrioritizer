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
                console.log(e);
                return (
                  <div key={e.id}>
                    <Link to={`/${e.id}`}>
                      <li>
                        <img src={e.thumbnail} alt={`picture for ${e.podcast_title_original}`} />
                        <h2>{e.title_original}</h2>
                        <p>{audioMinutes}</p>
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

