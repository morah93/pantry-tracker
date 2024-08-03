// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCwTVqcBeSg87zvcYL-mF59hiH_1NFFdsI",
  authDomain: "pantry-tracker-c3eb2.firebaseapp.com",
  projectId: "pantry-tracker-c3eb2",
  storageBucket: "pantry-tracker-c3eb2.appspot.com",
  messagingSenderId: "795391262451",
  appId: "1:795391262451:web:d5b9dc6dc138616d264186",
  measurementId: "G-24Q4JW38GG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const firestore = getFirestore(app);
export {firestore};
