import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBLa7p81MMwSDY7p0BiPhPHWWVzTIiYi_s",
  authDomain: "impostor-live.firebaseapp.com",
  projectId: "impostor-live",
  storageBucket: "impostor-live.appspot.com",
  messagingSenderId: "98624595428",
  appId: "1:98624595428:web:de6ec75175944eb29c53f1",
  measurementId: "G-K3ZMW2P160",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firebase.storage();
