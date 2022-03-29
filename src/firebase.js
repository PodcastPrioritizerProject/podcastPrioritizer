// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCZUxR1Sljq_F81WavTERajaoSYpsSJK4M",
    authDomain: "podcastprioritizer-b2430.firebaseapp.com",
    projectId: "podcastprioritizer-b2430",
    storageBucket: "podcastprioritizer-b2430.appspot.com",
    messagingSenderId: "592793745628",
    appId: "1:592793745628:web:e88d98830f9e4ca8545c19"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);

export default firebase;