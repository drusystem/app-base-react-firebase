
import { initializeApp } from 'firebase/app';
import { getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore/lite'


const firebaseConfig = {
  apiKey: "AIzaSyA1LfrJROMxalb8qkTRBaYYCDAkKPfTmbg",
  authDomain: "app-costos.firebaseapp.com",
  projectId: "app-costos",
  storageBucket: "app-costos.appspot.com",
  messagingSenderId: "648980018223",
  appId: "1:648980018223:web:218b0042d441eebc9a82da"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export {
    auth,
    db
};