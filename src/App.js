import { useEffect, useState } from 'react';
import axios from "axios";
import "./App.scss";

// importing components
import MapForm from './Components/MapForm';
import PodcastGenreForm from './Components/PodcastGenreForm';

function App() {



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
