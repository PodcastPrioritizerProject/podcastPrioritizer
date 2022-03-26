import { useParams } from 'react-router-dom';
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
            setPodcastInfo(apiResponse.data)
            setPodcastPublisher(apiResponse.data.podcast.title)

        })
    }, [])

    //Destructure the object returned by the API call
    const { title, description, image, audio_length_sec } = podcastInfo

    const audioMinutes = Math.floor(audio_length_sec / 60) % 60
    let audioHours = Math.floor(audio_length_sec / 3600) 

    if (audioHours == 0) {
        audioHours = null
    } else if (audioHours == 1) {
        audioHours = `${audioHours}hr`
    } else {
        audioHours = `${audioHours}hrs`
    }

    

    useEffect( () => {

        if (description === undefined) {
            console.log("no info")
        } else {
            let newDescription = description
            let newestDescription = newDescription.replace(/(<([^>]+)>)/gi, "");
            setActualDescription(newestDescription)
        }
    }, [description])


    
    
    return (
        <div className="podcastCard">
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