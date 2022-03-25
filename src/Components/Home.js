import {useState, useEffect} from 'react';

// importing components
import Header from './Header';
import MapForm from './MapForm';
import PodcastGenreForm from './PodcastGenreForm';

const Home = (props) => {
    const [chosenTime, setChosenTime] = useState('');
    // const [sessionTime, setSessionTime] = useState(window.sessionStorage.getItem('count'));
    // console.log(window.sessionStorage.getItem('count'));
    // console.log(chosenTime)

    const handleTime = (time) => {
        console.log('handletime')
        setChosenTime(time)
    };

    // useEffect(() => {
    //     if (sessionTime === "") {
    //         console.log("empty string")
    //     } else {
    //         window.sessionStorage.setItem('count', sessionTime)
    //         console.log('windowSessionStorage!')
    //     }
    // }, [sessionTime]);


    return (
        <>
            <Header />
            <MapForm time={handleTime} />
            <PodcastGenreForm chosenTime={chosenTime} /> 
        </>
    )
}

export default Home;