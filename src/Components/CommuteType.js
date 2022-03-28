import { AiFillCar } from 'react-icons/ai';
import { MdDirectionsBike } from 'react-icons/md';
import { FaWalking } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2'

const CommuteType = (props) => {

  const [radioState, setRadioState] = useState("")

  const handleChange = (time, sessionId, type, e) => {
    props.choices(time, sessionId, type)
    window.sessionStorage.setItem('count', time);
    window.sessionStorage.setItem('map', sessionId)
    setRadioState(e)
    console.log(e)
    window.sessionStorage.setItem('chosenCommute', e.target.id)
    window.sessionStorage.setItem('walkTime', props.walkTime.formattedTime)
    window.sessionStorage.setItem('bikeTime', props.bikeTime.formattedTime)
    window.sessionStorage.setItem('driveTime', props.driveTime.formattedTime)
    window.sessionStorage.setItem('walkDistance', props.walkTime.distance)
    window.sessionStorage.setItem('bikeDistance', props.bikeTime.distance)
    window.sessionStorage.setItem('driveDistance', props.driveTime.distance)
  }
  const walkR = useRef()
  const bikeR = useRef()
  const driveR = useRef()

  useEffect(() => {

    walkR.current.checked = false
    bikeR.current.checked = false
    driveR.current.checked = false

    if (window.sessionStorage.chosenCommute === walkR.current.id){
      walkR.current.checked = true
      let distanceW = window.sessionStorage.walkDistance
      walkR.current.labels[0].children[0].children[1].innerText = `${window.sessionStorage.walkTime} \n ${Number(distanceW).toFixed(1)}km`
    
    } else if (window.sessionStorage.chosenCommute === bikeR.current.id){
      let distanceB = window.sessionStorage.bikeDistance
      bikeR.current.checked = true
      if (bikeR.current.labels[0].children[0].children[1] !== undefined) {
      bikeR.current.labels[0].children[0].children[1].innerText = `${window.sessionStorage.bikeTime} \n ${Number(distanceB).toFixed(1)}km`
      }
     
    } else if (window.sessionStorage.chosenCommute === driveR.current.id){
      let distanceD = window.sessionStorage.driveDistance
      driveR.current.checked = true
      driveR.current.labels[0].children[0].children[1].innerText = `${window.sessionStorage.driveTime} \n ${Number(distanceD).toFixed(1)}km`
      
    }
    if (props.driveTime.formattedTime === "00:00:00") {

      Swal.fire({
        icon: 'error',
        text: "Sorry for the wait! We tried our best but could not find a route for your destination",
        footer: "Hint: Check for any typos or add a more specific address.",
        color: "#EDF2EF",
        confirmButtonColor: '#F97068',
        background: "#1a2635"
      })
    }

  },[props.bikeTime, props.driveTime])

  // console.log(walkR)
  console.log(bikeR)
  // console.log(driveR)
  console.log(window.sessionStorage.bikeTime)
  console.log(props.bikeTime.formattedTime)
  return (
    <div className="commuteType">
      <h2>How Will You Be Travelling?</h2>
      <form action="" id="types" className='commuteIconsForm'>
        <input type="radio" id="walk" name="types" className="sr-only" ref={walkR}
          disabled={(props.walkTime.time ? false : true) || ((props.passFromPodcast !== "" && walkR.current.id !== radioState.target.id) ? true : false)}
          onClick={(e) => {handleChange(props.walkTime.time, props.walkTime.sessionId, props.walkTime.options.routeType, e)}}
        />
        <label htmlFor="walk" aria-label="walking time" className='travelIconsLabel'>
          <div className='individualIcons'>
            <FaWalking />
            {
              props.walkTime.formattedTime === undefined && props.bikeTime.formattedTime !== undefined
              ? <p>TOO FAR TO WALK</p>
              : <p>{props.walkTime.formattedTime}</p>
            }
            {
              props.walkTime.distance === undefined
              ? null
              : <p>{props.walkTime.distance.toFixed(1)}km</p>
            }
          </div>
        </label>
        <input type="radio" id="bike" name="types" className="sr-only" ref={bikeR}
          disabled={(props.bikeTime.time ? false : true) || ((props.passFromPodcast !== "" && bikeR.current.id !== radioState.target.id) ? true : false) || (props.bikeTime.distance >= 200 ? true : false)}
          onClick={(e) => { handleChange(props.bikeTime.time, props.bikeTime.sessionId, props.bikeTime.options.routeType, e)}}
        />
        <label htmlFor="bike" aria-label="biking time" className='travelIconsLabel'>
          <div className='individualIcons'>
            <MdDirectionsBike />
            {/* <p>{props.bikeTime.formattedTime}</p> */}
            {/* {
              props.bikeTime.distance === undefined
              ? null 
              : <p>{props.bikeTime.formattedTime}</p>
            } */}
            {
              props.bikeTime.distance === undefined
                ? null
                : props.bikeTime.distance >= 200
                ? <p>TOO FAR TO BIKE</p>
                : <>
                    <p>{props.bikeTime.formattedTime}</p>
                    <p>{props.bikeTime.distance.toFixed(1)}km</p>
                  </>
            }
            {
              window.sessionStorage.bikeTime && props.bikeTime.formattedTime === undefined
              ? <>
                  <p></p>
                </>
                : null
            }
        
            {/* {
              props.bikeTime.distance === undefined
              ? null
              : <p>{props.bikeTime.distance.toFixed(1)}km</p>
            } */}
          </div>
        </label>
        <input type="radio" id="drive" name="types" className="sr-only" ref={driveR}
          disabled={(props.driveTime.time ? false : true) || ((props.passFromPodcast !== "" && driveR.current.id !== radioState.target.id) ? true : false) }
          onClick={(e) => { handleChange(props.driveTime.time, props.driveTime.sessionId, props.driveTime.options.routeType, e)}}
        />
        <label htmlFor="drive" aria-label="driving time" className='travelIconsLabel'>
          <div className='individualIcons'>
            <AiFillCar />
            <p>{props.driveTime.formattedTime}</p>
            {
              props.driveTime.distance === undefined
              ? null
              : <p>{props.driveTime.distance.toFixed(1)}km</p>
            }
         
          </div>
        </label>
      </form>
    </div>
  )

}

export default CommuteType