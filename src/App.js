import { useState, useEffect} from 'react';
import "./App.scss";
import {Routes, Route, Link} from 'react-router-dom';

// importing components
import PodcastDetails from './Components/PodcastDetails';
import Home from './Components/Home';
import AudioPlayer from "./Components/AudioPlayer"

function App() {
  const [audioObject, setAudioObject] = useState({})

  const handleAudioUrl = (e) => {
    setAudioObject(e)
  }


  return (
      <>
        <Routes>
          <Route path="/" element={<Home audioUrl={handleAudioUrl}/>} /> 
          <Route path="/:podcastId" element={<PodcastDetails />} />
        </Routes>
        <AudioPlayer audio={audioObject}/>
      </>
  );
};

export default App;