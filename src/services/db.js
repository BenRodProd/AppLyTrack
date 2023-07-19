import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

let db = false;

export const getDb = () => {
    if(!db){
        const firebaseConfig = {
            apiKey: <API_KEY>,
            authDomain: <AUTH_DOMAIN>,
            projectId: <PROJECT_ID>,
            storageBucket: <STORAGE_BUCKET>,
            messagingSenderId: <MESSAGING_SENDER_ID>,
            appId: <APP_ID>
        }

        const app = initializeApp(firebaseConfig)

        db = getFirestore(app)
    }

    return db
}