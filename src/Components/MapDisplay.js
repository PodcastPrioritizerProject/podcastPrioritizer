import { useState, useEffect } from "react";
import axios from "axios";

const MapDisplay = (props) => {
  // console.log(props)
  const show = "Show Map"
  const hide = "Hide Map"

  const [buttonText, setButtonText] = useState("Show Map")
  const [visible, setVisible] = useState(true)
 

  const handleClick = () => {
    if (visible === true){
      setButtonText(hide)
      setVisible(!visible)
    } else {
      setButtonText(show)
      setVisible(!visible)
    }
  }



  const walkMap = props.walk
  const bikeMap = props.bike
  const driveMap = props.drive

  return (
    <>
      {
        visible === true
        ? null
        :<img src={`https://open.mapquestapi.com/staticmap/v5/map?key=pXPeEb8fKG1bWJTjmqYRZoLhF0sGhYUW&session=${driveMap}`}alt="" />
      }
      <button 
      onClick={handleClick}
      disabled={props.bike === undefined || props.drive === undefined ? true : false}
      >{buttonText}</button>
    </>
    
  )
}

export default MapDisplay