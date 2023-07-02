import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore"
import {GoogleAuthProvider, getAuth,FacebookAuthProvider } from "firebase/auth"


const firebaseConfig = {
    apiKey: "AIzaSyD-lZYGy_MrEbWW6q1dbwkPBeYBQC3N2SM",
    authDomain: "metro-art-collection.firebaseapp.com",
    projectId: "metro-art-collection",
    storageBucket: "metro-art-collection.appspot.com",
    messagingSenderId: "247466555086",
    appId: "1:247466555086:web:59da0619e81af21ce2c29f",
    measurementId: "G-DZ5CCXKYE6"
  };

// const firebaseConfig = {
//   apiKey: "AIzaSyCG0flNOGZrCTlfmHjO3wIanutJsIMhNmk",
//   authDomain: "proyecto2-2769c.firebaseapp.com",
//   projectId: "proyecto2-2769c",
//   storageBucket: "proyecto2-2769c.appspot.com",
//   messagingSenderId: "969240058912",
//   appId: "1:969240058912:web:1a3e73901bdea3e1a3b045"
// };


const app = initializeApp(firebaseConfig);
export const auth=getAuth(app); 
export const db=getFirestore(app); 
export const storage=getStorage(app) 

export const googleProvider=new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account"})

export const facebookProvider = new FacebookAuthProvider();