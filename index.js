//const firebase = require('firebase-admin');
import { initializeApp } from 'firebase/app'; 
import { getDatabase } from 'firebase/database'; 
import { getAuth, connectAuthEmulator, signInWithEmailAndPassword } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDBeu30InEKxUvQ2seVtghxfiya9nLlSTA",
    authDomain: "my-jiu-jitsu-app.firebaseapp.com",
    databaseURL: "https://my-jiu-jitsu-app-default-rtdb.firebaseio.com",
    projectId: "my-jiu-jitsu-app",
    storageBucket: "my-jiu-jitsu-app.appspot.com",
    messagingSenderId: "270039588756",
    appId: "1:270039588756:web:de47e7c139d429cd7f3981"
};


const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
connectAuthEmulator(auth,"http://localhost:9099");

/*Test to see if database is connected*/ 
console.log("DATABASE CONNECTED");

/*LOGIN PAGE*/
const email_input = document.getElementById("email_input");
const password_input = document.getElementById("password_input");
const login_button = document.getElementById("login");
const register_button = document.getElementById("register");

login_button.addEventListener("click", login_function());

const login_function = async () => 
{
    const email = email_input.value;
    const password = password_input.value;

    const user_credential = signInWithEmailAndPassword(auth, email, password);
    console.log(user_credential);
}
