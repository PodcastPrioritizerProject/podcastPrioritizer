import { useEffect, useState } from 'react';
import axios from "axios";
import "./App.scss";

// importing components
import MapForm from './Components/MapForm';
import PodcastGenreForm from './Components/PodcastGenreForm';

function App() {
  const [cyclingTime, setCyclingTime] = useState("");
  const [walkingTime, setWalkingTime] = useState("");
  console.log(walkingTime, cyclingTime)
  // fucntion to lift cycling time from MapForm and set state here to be passed into PodcastGenreForm
  const handleBikeTime = (e, bikeTime) => {
    setCyclingTime(bikeTime)
  };
  // fucntion to lift walking time from MapForm and set state here to be passed into PodcastGenreForm
  const handleWalkTime = (e, walkTime) => {
    setWalkingTime(walkTime)
  };
  
  return (
      <>
        <h1>hello</h1>
        <MapForm bike={handleBikeTime} walk={handleWalkTime}/>
        <PodcastGenreForm wTimeSeconds={walkingTime} bTimeSeconds={cyclingTime}/>
      </>
  );
};

export default App;