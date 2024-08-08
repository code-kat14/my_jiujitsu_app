/*IMPORTING FUNCTIONS FROM FIREBASE LIBRARY*/
import { initializeApp } from 'firebase/app'; 
import { getDatabase, ref, set } from 'firebase/database'; 
import { getAuth, connectAuthEmulator, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import 'dotenv/config'

const firebaseConfig = {
    apiKey: process.env.FIREBASE_DB_API_KEY,
    authDomain: process.env.FIREBABASE_AUTH_DOMAIN,
    databaseURL: process.env.FIREBASE_DATABASE_URL,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);
const auth = getAuth(app);
connectAuthEmulator(auth,"http://localhost:9099");

/*Test to see if database is connected*/ 
console.log("DATABASE CONNECTED", database);

//------!!------
//Have a state, this variable will be running at all times
//possible live server button problem
//process.env for firebase credentials
//create .gs file ---- script to write data/ image to database
//store credential token for session with user
//dont add security rules to database


/*LOGIN PAGE*/
const email_input = document.getElementById("email_input");
const password_input = document.getElementById("password_input");
const login_button = document.getElementById("login");
const register_button = document.getElementById("register");

/*-----TEST writing to realtime database-----*/
const test = document.getElementById("test_button");
function writeToDatabase() {
    console.log("test button pressed");
    const database_ref = ref(database, 'test'); 
    const data = {
        message: 'Hello, Firebase!' 
    };

    set(database_ref, data)
        .then(() => {
            console.log('Data written successfully!');
        })
        .catch((error) => {
            console.error('Error writing data to Firebase:', error);
        });
}
test.addEventListener("click", writeToDatabase);
/*-----END TEST---------*/

/*--CHECK IF EMAIL IS VALID--*/
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

/*--CHECK IF PASSWORD IS VALID--*/
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

/*---LOGIN---*/
function login_function() 
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
    
    const userCredential = signInWithEmailAndPassword(auth, email, password);
    console.log(userCredential);
}
login_button.addEventListener("click", login_function);

/*---REGISTER---*/
function register_function()
{
    const email = email_input.value;
    const password = password_input.value;

    if (validate_email(email) == false)
    {
        alert("you did not enter a valid email")
        return;
    }
    if(validate_password(password) == false)
    {
        alert("you did not meet password requirments of 8 characters")
        return;
    }

    auth.createUserWithEmailAndPassword(auth, email, password) 
        .then((userCredential) => { 
            const user = userCredential.user;
            console.log(user)
            console.log("user created")
            alert("user created")

            const database_ref = database.ref()

            database_ref.child('users/' + user.uid).set({
                email: email,
                last_login: Date.now()
            });
        })

        .catch(function(error) {
            const errorCode = error.code;
            const errorMessage = error.message;

            alert(errorCode, errorMessage)
        })

    console.log("register butten has been clicked")
}
register_button.addEventListener("click", register_function);
