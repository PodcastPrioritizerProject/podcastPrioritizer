// for the commute type, instead of giving the client results and recommending the type of commute only on the duration/distance of the route, we decided it would be much better if the user can decide on the type of commute and then be presented with podcasts that are within 20% of the commute duration. This way the user has better control of the podcast results they recieve. If they don't feel like biking on a certain day, there is no need to give them podcast results where biking is the suggested commute type.

import { AiFillCar } from 'react-icons/ai';
import { MdDirectionsBike } from 'react-icons/md';
import { FaWalking } from 'react-icons/fa';
import { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2'

const CommuteType = (props) => {

  const [radioState, setRadioState] = useState("")

  // radio button change to be lifted up as props and also saved into session storage so that we can use the this information after routing
  const handleChange = (time, sessionId, type, e) => {
    props.choices(time, sessionId, type)
    window.sessionStorage.setItem('count', time);
    window.sessionStorage.setItem('map', sessionId)
    setRadioState(e)
    window.sessionStorage.setItem('chosenCommute', e.target.id)
    window.sessionStorage.setItem('walkTime', props.walkTime.formattedTime)
    window.sessionStorage.setItem('bikeTime', props.bikeTime.formattedTime)
    window.sessionStorage.setItem('driveTime', props.driveTime.formattedTime)
    window.sessionStorage.setItem('walkDistance', props.walkTime.distance)
    window.sessionStorage.setItem('bikeDistance', props.bikeTime.distance)
    window.sessionStorage.setItem('driveDistance', props.driveTime.distance)
  }
  // creating a reference to our radio buttons
  const walkR = useRef()
  const bikeR = useRef()
  const driveR = useRef()

  useEffect(() => {
    // making sure on load - more specifically when we route and the page loads - the radio buttons are not selected
    walkR.current.checked = false
    bikeR.current.checked = false
    driveR.current.checked = false

    // the following if/else statements are there so we can still display the previous user selected route option, while retaining the information after routing
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

      // an error handle for a very rare api return of the given formatted time, but does not result in an error
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

  return (
    <div className="commuteType">
      <h2>How Will You Be Travelling?</h2>
      <form action="" id="types" className='commuteIconsForm'>
        <input type="radio" id="walk" name="types" className="sr-only" ref={walkR}
        // we are disabling the radio button if the api does not return a time for this route, but does for the others
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
        // we are disabling the radio button if the api does not return a time for this route, but does for the others
          disabled={(props.bikeTime.time ? false : true) || ((props.passFromPodcast !== "" && bikeR.current.id !== radioState.target.id) ? true : false) || (props.bikeTime.distance >= 200 ? true : false)}
          onClick={(e) => { handleChange(props.bikeTime.time, props.bikeTime.sessionId, props.bikeTime.options.routeType, e)}}
        />
        <label htmlFor="bike" aria-label="biking time" className='travelIconsLabel'>
          <div className='individualIcons'>
            <MdDirectionsBike />
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
          </div>
        </label>
        <input type="radio" id="drive" name="types" className="sr-only" ref={driveR}
        // we are disabling the radio button if the api does not return a time for this route, but does for the others
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