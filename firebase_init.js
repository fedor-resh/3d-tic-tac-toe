import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCh2Y5_kUGjKFSXmeCgz7gMN9NWjznxHkU",
    authDomain: "d-tic-tac-toe-f7af0.firebaseapp.com",
    databaseURL: "https://d-tic-tac-toe-f7af0-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "d-tic-tac-toe-f7af0",
    storageBucket: "d-tic-tac-toe-f7af0.appspot.com",
    messagingSenderId: "564535201039",
    appId: "1:564535201039:web:70e3b753861edd7a64027a",
    measurementId: "G-ESLTS2QMML"
};

export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);