import firebase from "../firebase";
import {useState, useEffect } from 'react';

// access our database, import the corresponding firebase modules
import { getDatabase, ref, onValue, push, remove, set} from 'firebase/database';

const Likes = () => {

    // creating useState variables

    const [ likedPodcasts, setLikedPodcasts ] = useState([]);

    // useEffect to go through the firebase data
    useEffect(() => {
      
      const database = getDatabase(firebase);
      const dbRef = ref(database);
      // let newKey = firebase.database().ref(database);
      // newKey.child('first').set('1');
        onValue(dbRef, (response) => {
            const newState = [];
            const data = response.val();
            for (let propertyName in data) {
                
                newState.push(
                    {
                        key: propertyName,
                        name: data[propertyName]
                    }
                );
            }
            setLikedPodcasts(newState);
            console.log(response)
        });
    }, []);
      console.log(likedPodcasts);

    const handleRemove = (e) => {
      const database = getDatabase(firebase);
      const dbRef = ref(database, `${e.key}`);
      remove(dbRef)
      console.log(e)
    }

    return (
        <nav>
            <ul>
                {likedPodcasts.map((eachLikedPodcast) => {
                    return (
                      <li className="likedPodcastsContainer" key={eachLikedPodcast.key}>
                          <div className="imageContainer">
                              <img src={`${eachLikedPodcast.name.image}`} alt={`image of ${eachLikedPodcast.name.titleArtist}`} />
                          </div>
                          <div className="textContainer">
                              <h4>{eachLikedPodcast.name.title}</h4>
                              <h4>{eachLikedPodcast.name.titleArtist}</h4>
                          </div>
                          <div className="likesButtons">
                            <button className="likesButton" type="button" onClick={() => {handleRemove(eachLikedPodcast)}}>remove</button>
                            <button className="playButton" type="button">play</button>
                          </div>
                      </li>
                    )
                })}
            </ul>
        </nav>
    )
}

export default Likes;