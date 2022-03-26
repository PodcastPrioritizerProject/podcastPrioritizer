import { useState, useEffect, useRef } from 'react';
import "./App.scss";
import {Routes, Route, Link} from 'react-router-dom';

// importing components
import PodcastDetails from './Components/PodcastDetails';
import Home from './Components/Home';
// import Player from "./Components/Player"
import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';

function App() {
  const [audioObject, setAudioObject] = useState({})
  const [canPlay, setCanPlay] = useState(false)
  // console.log("can audio play??? in APP",canPlay)

  const [test, setTest] = useState(false)
  // console.log("did this work", test)

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

// console.log(player)

// const playAudio = () => {
//   player.current.audio.current.play();
// }
//   const pauseAudio = () => {
//     player.current.audio.current.pause();
//   }
//   const toggleAudio = () => {
//     player.current.audio.current.toggle();
//   }
  return (
      <>
        <Routes>
        <Route path="/" element={<Home audioUrl={handleAudioUrl} canPlay={canPlay} podcastPlay={handlePodcastPlayApp} playerTest={player}/> } /> 
          <Route path="/:podcastId" element={<PodcastDetails />} />
        </Routes>
        {/* <Player audio={audioObject}/> */}
        <div className="audioPlayer wrapper">
          <div className="audioThumbnail"><img src={audioObject.thumbnail} alt="" /></div>
          {/* <button type='button' onClick={playAudio}>CLICK ME</button>
        <button type='button' onClick={pauseAudio}>CLICK ME PAUSE</button>
        <button type='button' onClick={toggleAudio}>CLICK ME toggle</button> */}
          <AudioPlayer
            ref={player}
            autoPlay
            src={audioObject.audio}
            // onPlay={e => console.log("onPlay")}
            onPlay={handlePlay}
            onPause={handlePause}
            onEnded={handleEnd}
          // other props here
          />
        </div>
      </>
  );
};

export default App;