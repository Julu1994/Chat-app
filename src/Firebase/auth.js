import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyCrK0UEzkJ1myIQbOOsBsvYjpJx3KPjd7U",
    authDomain: "mychat-46b79.firebaseapp.com",
    projectId: "mychat-46b79",
    storageBucket: "mychat-46b79.appspot.com",
    messagingSenderId: "83558087841",
    appId: "1:83558087841:web:f80470487eea4de333c4e0",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();
