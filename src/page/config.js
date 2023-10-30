import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

let db = false;

export const getDb = () => {
  if (!db) {
    const firebaseConfig = {
      apiKey: process.env.REACT_APP_APIKEY,
      authDomain: process.env.REACT_APP_DOMAIN,
      projectId: process.env.REACT_APP_PROJECTID,
      storageBucket: process.env.REACT_APP_STORAGEBUCKET,
      messagingSenderId: process.env.REACT_APP_MESSAGINGSENDERID,
      appId: process.env.REACT_APP_APPID,
      measurementId: process.env.REACT_APP_MEASUREMENT
    };

    const app = initializeApp(firebaseConfig);

    db = getFirestore(app);
  }

  return db;
};
