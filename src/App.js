import { useState } from 'react';
import "./App.scss";
import {Routes, Route, Link} from 'react-router-dom';

// importing components
import Header from './Components/Header';
import MapForm from './Components/MapForm';
import PodcastGenreForm from './Components/PodcastGenreForm';
import PodcastDetails from './Components/PodcastDetails';
import AudioPlayer from './Components/AudioPlayer';

function App() {
  const [chosenTime, setChosenTime] = useState("");
  const [audioObject, setAudioObject] = useState({})
  console.log(chosenTime)

  const handleTime = (time) => {
    setChosenTime(time)
  };


  const handleAudioUrl = (podcast) => {
    setAudioObject(podcast)
  } 

  return (
      <>
        <Link to='/'>
          <h1>hello</h1>
        </Link>
        <Routes>
          <Route path="/" element={<><Header /><MapForm time={handleTime} /><PodcastGenreForm chosenTime={chosenTime} urlChoice={handleAudioUrl}/> </>} /> 
          <Route path="/:podcastId" element={<PodcastDetails />} />
        </Routes>
        <AudioPlayer audio={audioObject}/>
      </>
  );
};

export default App;