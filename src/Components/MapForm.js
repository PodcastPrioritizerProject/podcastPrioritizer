import { useState, useEffect, useRef } from 'react';
import axios from 'axios'; 
import MapDisplay from './MapDisplay';
import CommuteType from './CommuteType';
import Swal from 'sweetalert2'
import LoadingAnimation from './LoadingAnimation';
import { BiCurrentLocation } from 'react-icons/bi'

const MapForm = (props) => {
// creating useState variables
  const [givenAddress, setGivenAddress] = useState([]);
  const [autoTo, setAutoTo] = useState("");
  const [autoFrom, setAutoFrom] = useState("");
  // windows.getsessionstorage.
  const [walkRoute, setWalkRoute] = useState({});
  const [bikeRoute, setBikeRoute] = useState({});
  const [driveRoute, setDriveRoute] = useState({});
  const [chosenCommuteTime, setChosenCommuteTime] = useState("")
  const [chosenCommuteSession, setChosenCommuteSession] = useState("")
  const [chosenCommuteType, setChosenCommuteType] = useState("")
  const [submitState, setSubmitState] = useState(false)
  const [commuteComponent, setComuteComponent] = useState(false)

  // create a useEffect to call axios when onChange happens for the to input field for MapForm
  useEffect(() => {
    // conditional statement to call axios when input length is longer than 1 character
    if ((autoTo.length > 1)) {
      axios({
        url: 'http://www.mapquestapi.com/search/v3/prediction',
        params: {
          key: 'pXPeEb8fKG1bWJTjmqYRZoLhF0sGhYUW',
          q: `${autoTo}`,
          collection: `${["adminArea", "address", "airport"]}`,
          limit: 5,
          countryCode: 'CA',
          location: [43.6, 79.3]
        }
      }).then((response) => {
        setGivenAddress(response.data.results)
      })
    }
  }, [autoTo])

  // create a useEffect to call axios when onChange happens for the from input field for MapForm
  useEffect(() => {
    // conditional statement to call axios when input length is longer than 1 character
    if ((autoFrom.length > 1)) {
      axios({
        url: 'http://www.mapquestapi.com/search/v3/prediction',
        params: {
          key: 'pXPeEb8fKG1bWJTjmqYRZoLhF0sGhYUW',
          q: `${autoFrom}`,
          collection: `${["adminArea", "address", "airport"]}`,
          limit: 5,
          countryCode: 'CA',
          location: [43.6, 79.3]
        }
      }).then((response) => {
        setGivenAddress(response.data.results)
        
      })
    }
  }, [autoFrom])

  // handleInputFrom tracks the value change in our FROM input field to give the autocomplete api call information
  const handleInputFrom = (e) => {
    setAutoFrom(e.target.value)
  }
  
  // handleInputTo tracks the value change in our TO input field to give the autocomplete api call information
  const handleInputTo = (e) => {
    setAutoTo(e.target.value)
  }
  
  // form submit function that makes two axios calls using the final input values of autoTo/autoFrom
  const handleSubmit = (e) => {
    e.preventDefault()

    

    if (autoFrom === ""){
      Swal.fire({
        icon: 'warning',
        text: 'Please enter your starting location',
        footer: 'Hint: Start typing and our autofill will help you out!',
        color: "#EDF2EF",
        confirmButtonColor: '#F97068',
        background: "#1a2635"
      })
    } else if (autoTo === ""){
      Swal.fire({
        icon: 'warning',
        text: 'Please enter your destination',
        footer: 'Hint: Start typing and our autofill will help you out!',
        color: "#EDF2EF",
        confirmButtonColor: '#F97068',
        background: "#1a2635"
      })
    }else {
      // if the input fields are not empty, disable the button after submit
      e.target[2].disabled = true

      // clearing the session storage data
      window.sessionStorage.clear()

      // this state triggers loading animation
      setSubmitState(true)
      setComuteComponent(true)
      axios.all([
        axios.get("http://www.mapquestapi.com/directions/v2/route", {
          params: {
          key: "pXPeEb8fKG1bWJTjmqYRZoLhF0sGhYUW",
          from: `${autoFrom}`,
          to: `${autoTo}`,
          unit: 'k',
          routeType: "bicycle",
          }
        }),
        axios.get('http://www.mapquestapi.com/directions/v2/route', {
          params: {
          key: "pXPeEb8fKG1bWJTjmqYRZoLhF0sGhYUW",
          from: `${autoFrom}`,
          to: `${autoTo}`,
          unit: 'k',
          routeType: "pedestrian",
          }
        }),
        axios.get("http://www.mapquestapi.com/directions/v2/route", {
          params: {
            key: "pXPeEb8fKG1bWJTjmqYRZoLhF0sGhYUW",
            from: `${autoFrom}`,
            to: `${autoTo}`,
            unit: 'k',
            routeType: "shortest",
          }
        })
        // after both axios calls are made, we wait for all of the data before taking it and sending it to our App.js via props
      ]).then(axios.spread((apiDataBike, apiDataWalk, apiDataDrive) => {

        commuteRef.current.scrollIntoView({ behavior: 'smooth' })
        // when the API call returns, enable the submit button
        e.target[2].disabled = false
        // stop loading animation render
        setSubmitState(false)
        if (apiDataBike.data.info.statuscode === 402) {
          console.log(apiDataBike.data)
          Swal.fire({
            icon: 'error',
            text: "All roads lead to Rome, but no roads lead to where you're going!",
          })
          setWalkRoute({})
          setBikeRoute({})
          setDriveRoute({})
        } else if (apiDataBike.data.info.statuscode === 602){
          Swal.fire({
            icon: 'error',
            text: "Sorry for the wait! We tried our best but could not find a route for your destination",
            footer: "Hint: Check for any typos or add a more specific address."
          })
          setWalkRoute({})
          setBikeRoute({})
          setDriveRoute({})
        } else {
          setWalkRoute(apiDataWalk.data.route)
          setBikeRoute(apiDataBike.data.route)
          setDriveRoute(apiDataDrive.data.route)
        }
   
      })).catch(error => {
        console.log(error)
      });
    }
    // clear the input fields if BOTH of them are not empty after submit
    if (autoFrom !== "" && autoTo !== "") {
      setAutoTo("")
      setAutoFrom("")

    }
  }
  // this function lifts information from <CommuteType /> to be used for the map and podcast displays
  const handleChoices = (time, sessionId, type) => {
    setChosenCommuteTime(time)
    setChosenCommuteSession(sessionId)
    setChosenCommuteType(type)
  }

  // Delete This!
  // when the final commute is selected, this sends the information to App.js to be used in our podcast display
  useEffect(() => {
    props.time(chosenCommuteTime)
  }, [chosenCommuteTime])

  const myLocation = () => {
    const locationFinder = (pos) => {
      console.log(pos)
      let crd = pos.coords;
      let currentLocation = `${crd.latitude}, ${crd.longitude}`
      setAutoFrom(currentLocation)
    }
    navigator.geolocation.getCurrentPosition(locationFinder);
  }
  
  const commuteRef = useRef()

  return (
    <section className='mapDetails'>
      <div className="wrapper">
        <h2>Where To?</h2>
        <form action="" onSubmit={handleSubmit} className="destinationForm">

          <div className="startingLocation">
            <label htmlFor="fromLocation" className='orange'>Enter starting location</label>
            <div className="inputStart">
              <input type="text" onChange={handleInputFrom} list="fromLocation" id="from" value={autoFrom} autoComplete="off"/>
              <button type='button' onClick={myLocation}>
                <BiCurrentLocation />
              </button>
                <datalist id="fromLocation" >
                  {
                    // map through the givenAddress state defined by the axios call and return it as options (autofill API)
                    givenAddress.map((singleAddress) => {
                      return (
                        <option key={singleAddress.id}>
                        {singleAddress.displayString}
                        </option>
                      )
                    })
                  }
                </datalist>
            </div>
          </div>
          <div className="finalLocation">
            <label htmlFor="toLocation" className='yellow'>Enter destination</label>
            <input type="text" onChange={handleInputTo} list="toLocation" id="to" value={autoTo} autoComplete="off"/>
              <datalist id="toLocation" >
                {
                  // map through the givenAddress state defined by the axios call and return it as options (autofill API)
                  givenAddress.map((singleAddress) => {
                    return (
                      <option key={singleAddress.id}>
                      {singleAddress.displayString}
                      </option>
                    )
                  })
                }
              </datalist>
          </div>
          <button ref={commuteRef}>Submit</button>
        </form>
        {/* loading animation while waiting for API results */}
        {
          submitState === true
          ?<LoadingAnimation />
          : null
        }
        {
          commuteComponent === true
          ? <CommuteType
            walkTime={walkRoute}
            bikeTime={bikeRoute}
            driveTime={driveRoute}
            choices={handleChoices}
          />
          : null
        }
        {
          chosenCommuteTime === "" && window.sessionStorage.finalGenre === undefined
          ? null
          : <MapDisplay
            map={chosenCommuteSession} />
        }

        
    
      </div>
    </section>
  )
}

export default MapForm;



