import { useState, useEffect } from 'react';
import axios from 'axios'; 

const MapForm = () => {
// creating useState variables
  const [givenAddress, setGivenAddress] = useState([]);
  const [inputFrom, setInputFrom] = useState("");
  const [inputTo, setInputTo] = useState("");
  const [input, setInput] = useState("");
  
  // create a useEffect to run axios when inputTo or inputFrom changes (submit is clicked)
  useEffect(() => {
    
    axios({
      url: "http://www.mapquestapi.com/directions/v2/route",
      params: {
      key: "pXPeEb8fKG1bWJTjmqYRZoLhF0sGhYUW",
      from: `${inputFrom}`,
      to: `${inputTo}`,
      unit: 'k',
      routeType: "bicycle",
    }
    }).then(function(apiDataBike){
        console.log("bicycle route", apiDataBike)
    })

    axios({
      url: "http://www.mapquestapi.com/directions/v2/route",
      params: {
      key: "pXPeEb8fKG1bWJTjmqYRZoLhF0sGhYUW",
      from: `${inputFrom}`,
      to: `${inputTo}`,
      unit: 'k',
      routeType: "pedestrian",
      }
    }).then(function(apiDataWalk){
        console.log("pedestrian route", apiDataWalk)
    })
  }, [inputTo, inputFrom])

  // create a useEffect to call axios when onChange happens for the input fields for MapForm
  useEffect(() => {
    // conditional statement to call axios when input length is longer than 1 character
    if ((input.length > 1)) {
      axios({
        url: 'http://www.mapquestapi.com/search/v3/prediction',
        params: {
          key: 'pXPeEb8fKG1bWJTjmqYRZoLhF0sGhYUW',
          q: `${input}`,
          collection: `${["adminArea", "address", "poi", "airport"]}`,
          limit: 5,
          countryCode: 'CA',
          location: [43.6, 79.3]
        }
      }).then((response) => {
        setGivenAddress(response.data.results)
      })
    }
  }, [input])

  // handleInputFrom tracks the value change in our FROM input field to give the autocomplete api call information
  const handleInputFrom = (e) => {
    setInput(e.target.value)
  }
  
  // handleInputTo tracks the value change in our TO input field to give the autocomplete api call information
  const handleInputTo = (e) => {
    setInput(e.target.value)
  }
  
  // form submit function which takes the final FROM and TO inputs values and saves them to state. This is then used for our main route API call as a starting and ending destination.
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(e)
    setInputFrom(e.target[0].value)
    setInputTo(e.target[1].value)
  }

  return (
    <section>
      <form action="" onSubmit={handleSubmit}>
        <input type="text" onChange={handleInputFrom} list="fromLocation" id="from"/>
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
        <input type="text" onChange={handleInputTo} list="toLocation" id="to"/>
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



