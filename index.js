import { initializeApp } from 'firebase/app';
const app_settings = {
    database_url: "https://my-jiu-jitsu-app-default-rtdb.firebaseio.com/"
}

const app = initializeApp(app_settings);

console.log(app);

/*LOGIN PAGE*/
const email_input = document.getElementById("email_input");
const password_input = document.getElementById("password_input");
const login_button = document.getElementById("login");
const register_button = document.getElementById("register");

