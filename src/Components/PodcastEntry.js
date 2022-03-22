function PodcastEntry(props) {
    const results = props.podcasts

    return (
        <ul>
        {
            // mapping array for podcasts and displaying it on the DOM
            results.map((e) => {
            return (
                <li key={e.id}>
                <img src={e.thumbnail} alt={`picture for ${e.podcast_title_original}`} />
                <h2>{e.title_original}</h2>
                <p>{e.audio_length_sec}</p>
                </li>
            )
            })
        }  
        </ul>
    )
}

export default PodcastEntry;

