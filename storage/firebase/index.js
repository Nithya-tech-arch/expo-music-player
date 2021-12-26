// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDeJnL1x4WAWOnknrWl5-IyChuxthbu6ms",
    authDomain: "majja-737e2.firebaseapp.com",
    projectId: "majja-737e2",
    storageBucket: "majja-737e2.appspot.com",
    messagingSenderId: "974589090586",
    appId: "1:974589090586:web:0b0478e469c960c465eaa3"
};

// Initialize Firebase
let Firebase;

if (firebase.apps.length === 0) {
    Firebase = firebase.initializeApp(firebaseConfig);
}

export default Firebase;