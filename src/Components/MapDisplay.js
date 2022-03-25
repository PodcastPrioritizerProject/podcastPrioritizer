import { useState, useEffect } from "react";
import axios from "axios";

const MapDisplay = (props) => {
  // console.log(props)
  const show = "Show Map"
  const hide = "Hide Map"

  const [buttonText, setButtonText] = useState("Show Map")
  const [visible, setVisible] = useState(true)
  let mapBackup = props.map
  if (props.map === "") {
    mapBackup = window.sessionStorage.getItem('map')
  }
console.log(mapBackup)
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
      <button 
      onClick={handleClick}
        disabled={props.map || window.sessionStorage.map ? false : true}
      >{buttonText}</button>
      {
        visible === true
        ? null
        :<img src={`https://open.mapquestapi.com/staticmap/v5/map?key=pXPeEb8fKG1bWJTjmqYRZoLhF0sGhYUW&session=${mapBackup}&type=dark`}alt="" />
      }
    </>
    
  )
}

export default MapDisplay