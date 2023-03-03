import { useState} from "react";

const MapDisplay = (props) => {

  // variables that hold the button text
  const show = "Show Map"
  const hide = "Hide Map"

  const [buttonText, setButtonText] = useState("Show Map")
  const [visible, setVisible] = useState(true)

  // since we lose our state while routing, the last displayed map will be shown
  let mapBackup = props.map
  if (props.map === "") {
    mapBackup = window.sessionStorage.getItem('map')
  }
  const handleClick = () => {
    if (visible === true){
      setButtonText(hide)
      setVisible(!visible)
    } else {
      setButtonText(show)
      setVisible(!visible)
    }
  }
  console.log(mapBackup)
  return (

    <div className="mapButton">
      <button 
      onClick={handleClick}
      disabled={props.map || window.sessionStorage.map ? false : true}
      >{buttonText}</button>
      <div className="mapImg wrapper">
        {
          visible === true
          ? null
          :<img src={`http://mapquestapi.com/staticmap/v5/map?key=zNwYuUfmHAqqz4UIHM8oAoLY8aph9QQw&session=${mapBackup}&type=dark`}alt="" />
        }
      </div>
    </div>
    
  )
}

export default MapDisplay