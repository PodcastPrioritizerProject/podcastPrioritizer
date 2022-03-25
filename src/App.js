import { useState, useEffect} from 'react';
import "./App.scss";
import {Routes, Route, Link} from 'react-router-dom';

// importing components
import PodcastDetails from './Components/PodcastDetails';
import Home from './Components/Home';


function App() {




  const handleAudioUrl = (podcast) => {
    setAudioObject(podcast)
  } 

  return (
      <>
        <Link to='/'>
          <h1>hello</h1>
        </Link>
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/:podcastId" element={<PodcastDetails />} />
        </Routes>
        <AudioPlayer audio={audioObject}/>
      </>
  );
};

export default App;