import { useState, useRef } from 'react';
import "./App.scss";
import {Routes, Route,} from 'react-router-dom';

// importing components
import PodcastDetails from './Components/PodcastDetails';
import Home from './Components/Home';
// import Player from "./Components/Player"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
import Footer from './Components/Footer';

function App() {
  const [audioObject, setAudioObject] = useState({})
  const [canPlay, setCanPlay] = useState(false)
 
  const [test, setTest] = useState(false)
  
  const handlePodcastPlayApp = (e) => {
    setTest(e)
  }
  const handleAudioUrl = (e) => {
    setAudioObject(e)
  }
  const handlePlay = () => {
    setCanPlay(true)
  }
  const handlePause = () => {
    setCanPlay(false)
  }
  const handleEnd = () => {
    setCanPlay(false)
  }

const player = useRef()

  return (
      <>
        <Routes>
          <Route path="/" element={<Home 
            audioUrl={handleAudioUrl} 
            canPlay={canPlay} 
            podcastPlay={handlePodcastPlayApp} 
            playerTest={player}
            />} /> 
          <Route path="/:podcastId" element={<PodcastDetails />} />
        </Routes>
        {
          audioObject.audio
            ? 
              <div className="audioPlayer wrapper">
                <div className="audioThumbnail"><img src={audioObject.thumbnail} alt="" /></div>
                <AudioPlayer
                  ref={player}
                  autoPlay
                  src={audioObject.audio}
                  onPlay={handlePlay}
                  onPause={handlePause}
                  onEnded={handleEnd}
                />
              </div>
            : null
        }

        {/* </div> */}

        <Footer />
      </>
  );
};

export default App;