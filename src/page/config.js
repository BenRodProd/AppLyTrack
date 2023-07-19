import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

let db = false;

export const getDb = () => {
    if(!db){
        const firebaseConfig = {
            apiKey: "AIzaSyAmn17M-Ed-BTnUyqCE468Q3bW-MTJM5tQ",
            authDomain: "applytrack-72920.firebaseapp.com",
            projectId: "applytrack-72920",
            storageBucket: "applytrack-72920.appspot.com",
            messagingSenderId: "678827715267",
            appId: "1:678827715267:web:af15b9798706454e8d5076",
            measurementId: "G-8CSZJGPJFQ"
          };

        const app = initializeApp(firebaseConfig)

        db = getFirestore(app)
    }

    return db
}