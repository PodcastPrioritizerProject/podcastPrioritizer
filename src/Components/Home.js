import {useState} from 'react';

// importing components
import Header from './Header';
import MapForm from './MapForm';
import PodcastGenreForm from './PodcastGenreForm';

const Home = (props) => {

  const [chosenTime, setChosenTime] = useState('');
  // this function passes podcast info to parent
  const handleAudioUrl = (podcast) => {
    props.audioUrl(podcast)
  } 
  // updates props taken from child into state
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