import { useEffect, useState } from 'react';
import axios from "axios";
import "./App.scss";

// importing components
import MapForm from './Components/MapForm';
import PodcastGenreForm from './Components/PodcastGenreForm';

function App() {
  const [chosenTime, setChosenTime] = useState("");
  console.log(chosenTime)
  const handleTime = (time) => {
    setChosenTime(time)
  };

  return (
      <>
        <h1>hello</h1>
        <MapForm 
        time={handleTime} 
        />
        <PodcastGenreForm 
        chosenTime={chosenTime}
        />
      </>
  );
};

export default App;