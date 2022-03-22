import { useEffect, useState } from 'react';
import axios from "axios";
import "./App.scss";


// importing components
import Header from './Components/Header';
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
        <Header />
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