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

  return (
    <>
      {
        visible === true
        ? null
        :<img src={`https://open.mapquestapi.com/staticmap/v5/map?key=pXPeEb8fKG1bWJTjmqYRZoLhF0sGhYUW&session=${props.map}&type=dark`}alt="" />
      }
      <button 
      onClick={handleClick}
      disabled={props.map ? false : true}
      >{buttonText}</button>
    </>
    
  )
}

export default MapDisplay