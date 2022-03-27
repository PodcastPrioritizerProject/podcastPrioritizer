import {useState} from 'react';

// importing components
import Header from './Header';
import MapForm from './MapForm';
import PodcastGenreForm from './PodcastGenreForm';

const Home = (props) => {
  // console.log(props.playerTest, "PLEASE WORK")
  const [chosenTime, setChosenTime] = useState('');
  const [propToType, setPropToType] = useState("")
  // this function passes podcast info to parent
  const handleAudioUrl = (podcast) => {
    props.audioUrl(podcast)
  } 
  // updates props taken from child into state
  const handleTime = (time) => {
      // console.log('handletime')
      setChosenTime(time)
  };
  // console.log("can audio play HOME", props.canPlay)
  const handlePodcastPlayHome = (e) => {
    props.podcastPlay(e)
  }
  const handleSubmitToType = (e) => {
    setPropToType(e)
  }
  return (
      <>
        <Header />
        <MapForm 
        time={handleTime}
        passToType={propToType}
        />
        <PodcastGenreForm 
        chosenTime={chosenTime} 
        urlChoice={handleAudioUrl} 
        canPlay={props.canPlay} 
        podcastPlay={handlePodcastPlayHome} 
        playerTest={props.playerTest}
        infoToType={handleSubmitToType}/> 
      </>
  )
}

export default Home;