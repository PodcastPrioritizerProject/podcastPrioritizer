import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdReturnLeft } from 'react-icons/io'



const PodcastDetails = () => {
    const { podcastId } = useParams(); 
    const [ podcastInfo, setPodcastInfo ] = useState({})
    const [podcastPublisher, setPodcastPublisher] = useState("")
    const [actualDescription, setActualDescription] = useState("")
    
    //Call Podcast API using the epsiode ID to display the specific epsisode
    useEffect(() => {
        axios({
            url: `https://listen-api.listennotes.com/api/v2/episodes/${podcastId}`,
            headers: { "X-ListenAPI-Key": "d6e3e64e5eec4dd68226157de0098df4" },
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

    // adding a useEffect for an undefined and regex for description
    useEffect(() => {

        if (description === undefined) {

        } else {
        let newDescription = description
        let newestDescription = newDescription.replace(/(<([^>]+)>)/gi, "")
        setActualDescription(newestDescription)

        }
    }, [description])

    console.log(podcastInfo)
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

        } else {
            let newDescription = description
            let newestDescription = newDescription.replace(/(<([^>]+)>)/gi, " ");
            setActualDescription(newestDescription)
        }
    }, [description])
    
    return (
        <div className="podcastCard">
            <div className="navBar">
                <Link to='/'>
                    <button type='button'> 
                        <IoMdReturnLeft /> 
                    </button>
                </Link>
            </div>
            <div className="wrapper">
                <div className="podcastContent">
                    <div className="podcastCardImage">
                        <img src={image} alt="" />
                    </div>
                    <div className="podcastCardText">
                        <div className="details">
                            <h2>{podcastPublisher}</h2>
                            <h3>{title}</h3>
                            <p>{audioHours} {audioMinutes}minutes</p>
                        </div>
                        <div className="podcastBody">
                            <p>{actualDescription}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PodcastDetails;