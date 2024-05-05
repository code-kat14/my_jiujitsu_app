/*IMPORTING FUNCTIONS FROM FIREBASE LIBRARY*/
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

/*returns true if email is valid-false if invalid */
function validate_email(email)
{
    regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if(regex.test(email) == true)
    {
        console.log("valid email")
        return true;
    }
    else
    {
        console.log("not a valid email")
        return false;
    }
}

/*return true if password is at least 8 chars long */
function validate_password(password)
{
    if(password.length < 9)
    {
        console.log("password is less than 9 chars")
        return false;
    }
    else
    {
        console.log("password length accepted")
        return true;    
    }
}

const login_function = async () => 
{
    alert("login button has been pushed");
    console.log("login function started");

    const email = email_input.value;
    const password = password_input.value;

    if (validate_email(email) == false)
    {
        alert("you did not enter a valid email")
    }
    if(validate_password(password) == false)
    {
        alert("you did not meet password requirments of 8 characters")
    }
    
    const user_credential = await signInWithEmailAndPassword(auth, email, password);
    console.log(user_credential);
}

login_button.addEventListener("click", login_function);

register_button.addEventListener("click", function() {
    console.log("register butten has been clicked");
    alert("register button has been clicked!"); 
});

