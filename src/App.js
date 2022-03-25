import { useState, useEffect} from 'react';
import "./App.scss";
import {Routes, Route, Link} from 'react-router-dom';

// importing components
import PodcastDetails from './Components/PodcastDetails';
import Home from './Components/Home';


function App() {



  return (
      <>
      <Link to='/'>
        <h1>hello</h1>
      </Link>
        
        <Routes>
          <Route path="/" element={<Home />} /> 
          <Route path="/:podcastId" element={<PodcastDetails />} />
        </Routes>

      </>
  );
};

export default App;