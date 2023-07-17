import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAmn17M-Ed-BTnUyqCE468Q3bW-MTJM5tQ",
    authDomain: "applytrack-72920.firebaseapp.com",
    projectId: "applytrack-72920",
    storageBucket: "applytrack-72920.appspot.com",
    messagingSenderId: "678827715267",
    appId: "1:678827715267:web:af15b9798706454e8d5076",
    measurementId: "G-8CSZJGPJFQ"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export default app;