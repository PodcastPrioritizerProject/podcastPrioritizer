import { useParams } from 'react-router-dom';

const PodcastDetails = () => {
    const { podcastId } = useParams(); 

    return <h1> { podcastId }</h1>
}

export default PodcastDetails;