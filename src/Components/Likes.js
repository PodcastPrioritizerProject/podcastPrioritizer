import firebase from "../firebase";
import {useState, useEffect } from 'react';

// access our database, import the corresponding firebase modules
import { getDatabase, ref, onValue, push, remove, set} from 'firebase/database';
import { AiFillHeart, AiFillPlayCircle } from 'react-icons/ai'
import { FaTrashAlt } from 'react-icons/fa'


const Likes = () => {

    // creating useState variables
    const [ likedPodcasts, setLikedPodcasts ] = useState([]);
    const [ showNav, setShowNav ] = useState(false);

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
<<<<<<< HEAD
            // console.log(response)
        });
    }, []);
      // console.log(likedPodcasts);
=======
        });
    }, []);
>>>>>>> 3b63c9d3ddbd722a1ce207bd602142f457821f51

    // adding a function to remove the liked podcast off of firebase as well as the DOM
    const handleRemove = (e) => {
      const database = getDatabase(firebase);
      const dbRef = ref(database, `${e.key}`);
      remove(dbRef)
    }

    // adding a function to add a class to display the nav and hide when clicked
    const handleLikes = () => {
        setShowNav(!showNav)
    }

    return (
        <nav>
            <div className="wrapper">

                <button onClick={handleLikes}className="likes">  <AiFillHeart /> 
                </button>
                <ul className={
                    showNav === true ? 'showNav' : null
                }
                >
                    <div className="wrapperUl">
                        {likedPodcasts.map((eachLikedPodcast) => {
                            return (
                            <li className="likedPodcastsContainer" key={eachLikedPodcast.key}>
                                <div className="imageContainer">
                                    <img src={`${eachLikedPodcast.name.image}`} alt={`image of ${eachLikedPodcast.name.titleArtist}`} />
                                </div>
                                <div className="textContainer">
                                    <h4 className="podcastTitle">{eachLikedPodcast.name.title}</h4>
                                    <h4 className="podcastArtist">{eachLikedPodcast.name.titleArtist}</h4>
                                    <div className="likesButtons">
                                            <button className="likesButton" type="button" onClick={() => { handleRemove(eachLikedPodcast) }}><FaTrashAlt /></button>
                                            <button disabled={true} className="playButton" type="button"> < AiFillPlayCircle/></button>
                                    </div>
                                </div>
                            </li>
                            )
                        })}
                    </div>
                </ul>
            </div>
        </nav>
    )
}

export default Likes;