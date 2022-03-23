import { useState, useEffect } from 'react';
import axios from 'axios'; 
import MapDisplay from './MapDisplay';
import CommuteType from './CommuteType';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const MapForm = (props) => {
// creating useState variables
  const [givenAddress, setGivenAddress] = useState([]);
  const [autoTo, setAutoTo] = useState("");
  const [autoFrom, setAutoFrom] = useState("");
  const [walkRoute, setWalkRoute] = useState({});
  const [bikeRoute, setBikeRoute] = useState({});
  const [driveRoute, setDriveRoute] = useState({});
  const [chosenCommuteTime, setChosenCommuteTime] = useState("")
  const [chosenCommuteSession, setChosenCommuteSession] = useState("")
  const [chosenCommuteType, setChosenCommuteType] = useState("")
 
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
          // countryCode: 'CA',
          location: [43.6, 79.3]
        }
      }).then((response) => {
        setGivenAddress(response.data.results)
        console.log("response",response)
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
          // countryCode: 'CA',
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
    if (autoFrom === "" || autoTo === "") {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Please fill out your starting location as well as your destination',
        footer: 'Hint: Start typing and our autofill will help you out!'
      })
    } else {

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

          console.log("cycling", apiDataBike)
          console.log("walking", apiDataWalk)
          console.log("driving", apiDataDrive)
          setWalkRoute(apiDataWalk.data.route)
          setBikeRoute(apiDataBike.data.route)
          setDriveRoute(apiDataDrive.data.route)
   
      })).catch(error => {
        console.log(error)
      });
    }
    
  }

  const handleChoices = (time, sessionId, type) => {
    setChosenCommuteTime(time)
    setChosenCommuteSession(sessionId)
    setChosenCommuteType(type)
  }

  useEffect(() => {
    props.time(chosenCommuteTime)
  }, [chosenCommuteTime])

  
  return (
    <section>
      <form action="" onSubmit={handleSubmit}>
        <input style={{width: "500px"}} type="text" onChange={handleInputFrom} list="fromLocation" id="from" value={autoFrom} autoComplete="off"/>
        <label htmlFor="fromLocation" className="sr-only">Enter starting location</label>
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
        <input style={{ width: "500px" }} type="text" onChange={handleInputTo} list="toLocation" id="to" value={autoTo} autoComplete="off"/>
        <label htmlFor="toLocation" className="sr-only">Enter destination</label>
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
        <button>Submit</button>
      </form>
      <CommuteType 
      walkTime={walkRoute}
      bikeTime={bikeRoute}
      driveTime={driveRoute}
      choices={handleChoices}
      />
      <MapDisplay 
      map={chosenCommuteSession}
      />
    </section>
  )
}

export default MapForm;



