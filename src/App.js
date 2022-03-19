import { useEffect, useState } from 'react';
import axios from "axios";
import "./App.scss";

// importing components
import MapForm from './Components/MapForm';
import PodcastGenreForm from './Components/PodcastGenreForm';



// Api URL: "http://www.mapquestapi.com/directions/v2/route"
// Api key: pXPeEb8fKG1bWJTjmqYRZoLhF0sGhYUW
function App() {

//   const [ givenAddress, setGivenAddress ] = useState([]);


//   useEffect(function() {
    
//     axios({
//       url: "http://www.mapquestapi.com/directions/v2/route",
//       params: {
//         key: "pXPeEb8fKG1bWJTjmqYRZoLhF0sGhYUW",
//         from: "Toronto, CA",
//         to: "Hamilton, CA",
//         unit: 'k',
//         routeType: "bicycle",
//       }
//     }).then(function(apiData){
//         // console.log(apiData)
//     })
//     // axios({
//     //   url: "https://www.mapquestapi.com/staticmap/v5/map",
//     //   params: {
//     //     key: "pXPeEb8fKG1bWJTjmqYRZoLhF0sGhYUW",
//     //     format: "png",
//     //     // size: "500,200@2x",
//     //     // start: "Toronto, CA",
//     //     // end: "Hamilton, CA",
//     //     session: "6234e2b1-005d-6750-02b4-34e5-12e03e48224f" 
//     //   }
//     // }).then(function (apiData) {
//     //   console.log(apiData.request.responseURL)
//     // })
    
//     axios({
//       url: 'https://listen-api.listennotes.com/api/v2/search',
//       headers: { "X-ListenAPI-Key": "0be4947c18024c2d8a5bb0dcb11eb2ac" },
//       params: {
//         q: 'star wars'

//       }

//     }).then( (response) => {
//       // console.log(response.data.results)
//     })
//   }, [])
// // 
//   const [input, setInput] = useState("");

//   useEffect(function () {
//     if (input.length > 1) {
//       axios({
//         url: 'http://www.mapquestapi.com/search/v3/prediction',
//         params: {
//           key: 'pXPeEb8fKG1bWJTjmqYRZoLhF0sGhYUW',
//           q: `${input}`,
//           collection: 'address',
//           limit: 5,
//           countryCode: 'CA'

  
//         }
  
//       }).then((response) => {
//         // console.log(response.data.results)
//         setGivenAddress(response.data.results)
//       })

      
//     }
//   }, [input])

  
//   console.log(input)
//   const handleInput = (e) => {
//       setInput(e.target.value)
//   }

  return (
      <>
        <h1>hello</h1>
        <MapForm />
        <PodcastGenreForm />
        {/* <form action="">
          <input type="text"
          
          ></input>
          <button>Submit</button>
        </form> */}
        {/* <h2>hello again</h2>
      <input type="text" onChange={handleInput} list="cars" />
      <datalist id="cars" >
        {
          givenAddress.map((singleAddress) => {
            return (
              <option>{singleAddress.displayString}</option>
            )
          })

        }
      </datalist> */}
      </>
  );
}

export default App;
