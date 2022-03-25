import { Link} from 'react-router-dom';

function PodcastEntry(props) {
    const results = props.podcasts
 
    return (
        <ul>
        {
            // mapping array for podcasts and displaying it on the DOM
            results.map((e) => { 
                let audioMinutes = Math.floor(e.audio_length_sec / 60)
                return (
                    <Link key={e.id} to={`/home/${e.id}`}>
                      <li key={e.id}>
                        <img src={e.thumbnail} alt={`picture for ${e.podcast_title_original}`} />
                        <h2>{e.title_original}</h2>
                        <p>{audioMinutes}</p>
                      </li>
                    </Link>
                )
            
            })
        

        }  
        </ul>
    )
}

export default PodcastEntry;

