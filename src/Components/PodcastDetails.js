import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


const PodcastDetails = () => {
    const { podcastId } = useParams(); 
    const [ podcastInfo, setPodcastInfo ] = useState({})
    const [podcastPublisher, setPodcastPublisher] = useState("")
    const [actualDescription, setActualDescription] = useState("")
    
    //Call Podcast API using the epsiode ID to display the specific epsisode
    useEffect(() => {
        axios({
            url: `https://listen-api.listennotes.com/api/v2/episodes/${podcastId}`,
            headers: { "X-ListenAPI-Key": "0be4947c18024c2d8a5bb0dcb11eb2ac" },
            params: {
                id: `${podcastId}`
            }
        }).then(( apiResponse) => {
            //Set returned episode object into useState
            setPodcastInfo(apiResponse.data)
            //Set returned podcast object intoUseState
            setPodcastPublisher(apiResponse.data.podcast.title)
        })
    }, [])

    //Destructure the object returned by the API call
    const { title, description, image, audio_length_sec } = podcastInfo

    
    useEffect(() => {

        if (description === undefined) {
        console.log("no info")
        } else {
        let newDescription = description
        let newestDescription = newDescription.replace(/(<([^>]+)>)/gi, "")
        setActualDescription(newestDescription)

        }
    }, [description])


    //Calculate podcast time to be minutes and hours 
    const audioMinutes = Math.floor(audio_length_sec / 60) % 60
    let audioHours = Math.floor(audio_length_sec / 3600) 

    //Conditional that makes the hours singular or plural based on the length of the podcast
    if (audioHours == 0) {
        audioHours = null
    } else if (audioHours == 1) {
        audioHours = `${audioHours}hr`
    } else {
        audioHours = `${audioHours}hrs`
    }

    
    //Run a useEffect which takes in the description, if evaluated to a string run Regex to remove HTML elements from API call.   
    useEffect( () => {
        if (description === undefined) {
            console.log("no info")
        } else {
            let newDescription = description
            let newestDescription = newDescription.replace(/(<([^>]+)>)/gi, " ");
            setActualDescription(newestDescription)
        }
    }, [description])
    
    return (
        <div className="podcastCard">
        <Link to='/'>
          <button type='button'>BACK ICON HERE</button>
        </Link>
            <div className="podcastCardImage">
                <img src={image} alt="" />
            </div>
            <div className="podcastCardText">
                <h2>{podcastPublisher}</h2>
                <h2>{title}</h2>
                <p>{audioHours} {audioMinutes}minutes</p>
                <p>{actualDescription}</p>
            </div>
        </div>
    )
}

export default PodcastDetails;