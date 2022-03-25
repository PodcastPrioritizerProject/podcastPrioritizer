import {useState, useEffect} from 'react';

// importing components
import Header from './Header';
import MapForm from './MapForm';
import PodcastGenreForm from './PodcastGenreForm';

const Home = (props) => {
    const [chosenTime, setChosenTime] = useState('');
    

    const handleAudioUrl = (podcast) => {
      props.handleAudioUrl(podcast)
    } 

    const handleTime = (time) => {
        console.log('handletime')
        setChosenTime(time)
    };

    return (
        <>
            <Header />
            <MapForm time={handleTime} />
            <PodcastGenreForm chosenTime={chosenTime} urlChoice={handleAudioUrl}/> 
        </>
    )
}

export default Home;