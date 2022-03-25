import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';


const PodcastDetails = () => {
    const { podcastId } = useParams(); 
    const [ podcastInfo, setPodcastInfo ] = useState({})
    const [podcastPublisher, setPodcastPublisher] = useState("")
  

    useEffect(() => {
        axios({
            url: `https://listen-api.listennotes.com/api/v2/episodes/${podcastId}`,
            headers: { "X-ListenAPI-Key": "0be4947c18024c2d8a5bb0dcb11eb2ac" },
            params: {
                id: `${podcastId}`
            }
        }).then(( apiResponse) => {
            setPodcastInfo(apiResponse.data)
            setPodcastPublisher(podcastInfo.podcast.title)
            console.log(podcastInfo.podcast.title)
        })
    }, [])

    const { title, description, image, audio_length_sec } = podcastInfo
   
    const audioMinutes = Math.floor(audio_length_sec / 60)
    
    return (
        <div className="podcastCard">
            <div className="podcastCardImage">
                <img src={image} alt="" />
            </div>
            <div className="podcastCardText">
                <h2>{podcastPublisher}</h2>
                <h2>{title}</h2>
                <p>{audioMinutes}minutes</p>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default PodcastDetails;