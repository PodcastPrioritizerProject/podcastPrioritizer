import { useEffect, useState } from 'react';
import axios from "axios";
import "./App.scss";


// importing components
import Header from './Components/Header';
import MapForm from './Components/MapForm';
import PodcastGenreForm from './Components/PodcastGenreForm';

function App() {
  const [cyclingTime, setCyclingTime] = useState("");
  const [walkingTime, setWalkingTime] = useState("");
  const [drivingTime, setDrivingTime] = useState("");
  console.log("walk", walkingTime)
  console.log("bike", cyclingTime)
  console.log("drive", drivingTime)
  // fucntion to lift cycling time from MapForm and set state here to be passed into PodcastGenreForm
  const handleBikeTime = (e, bikeTime) => {
    setCyclingTime(bikeTime)
  };
  // fucntion to lift walking time from MapForm and set state here to be passed into PodcastGenreForm
  const handleWalkTime = (e, walkTime) => {
    setWalkingTime(walkTime)
  };

  const handleDriveTime = (e, driveTime) => {
    setDrivingTime(driveTime)
  }
  
  return (
      <>
        <Header />
        <MapForm 
        bike={handleBikeTime} 
        walk={handleWalkTime} 
        drive={handleDriveTime}
        />
        <PodcastGenreForm 
        wTimeSeconds={walkingTime} 
        bTimeSeconds={cyclingTime}
        dTimeSeconds={drivingTime}
        />
      </>
  );
};

export default App;