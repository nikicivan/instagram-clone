import firebase from 'firebase';

const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyCJTZJV5bWgzyCTVNXuI5dl71on5-xAZ7w",
    authDomain: "instagram-clone-63dc7.firebaseapp.com",
    databaseURL: "https://instagram-clone-63dc7.firebaseio.com",
    projectId: "instagram-clone-63dc7",
    storageBucket: "instagram-clone-63dc7.appspot.com",
    messagingSenderId: "944749345452",
    appId: "1:944749345452:web:1d11acfc2eb4f0c619fd09",
    measurementId: "G-BZTGJMTD9Z"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };