import { useState, useEffect } from 'react';
import axios from 'axios'; 

const MapForm = (props) => {
// creating useState variables
  const [givenAddress, setGivenAddress] = useState([]);
  const [autoTo, setAutoTo] = useState("");
  const [autoFrom, setAutoFrom] = useState("");

  // create a useEffect to call axios when onChange happens for the to input field for MapForm
  useEffect(() => {
    // conditional statement to call axios when input length is longer than 1 character
    if ((autoTo.length > 1)) {
      axios({
        url: 'http://www.mapquestapi.com/search/v3/prediction',
        params: {
          key: 'pXPeEb8fKG1bWJTjmqYRZoLhF0sGhYUW',
          q: `${autoTo}`,
          collection: `${["adminArea", "address", "poi", "airport"]}`,
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
          collection: `${["adminArea", "address", "poi", "airport"]}`,
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
      })
      // after both axios calls are made, we wait for all of the data before taking it and sending it to our App.js via props
    ]).then(axios.spread((apiDataBike, apiDataWalk) => {
      props.bike(e, apiDataBike.data.route.time)
      props.walk(e, apiDataWalk.data.route.time)
    })) 
  }

  return (
    <section>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" onChange={handleInputFrom} list="fromLocation" id="from" value={autoFrom} autoComplete='off'/>
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
        <input type="text" onChange={handleInputTo} list="toLocation" id="to" value={autoTo} autoComplete='off'/>
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
    </section>
  )
}

export default MapForm;



