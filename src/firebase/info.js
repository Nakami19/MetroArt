import { db } from "./config";
import { collection } from 'firebase/firestore';
import { doc, setDoc, addDoc, updateDoc, getDoc, getDocs } from "firebase/firestore";

export const getToursDocuments= async ()=>{
    let tourss=[];
    const tours= collection(db, "tours")
    const tour = await getDocs(tours);
    tour.forEach((doc) => {
       tourss.push(doc.data());
    });
    return tourss;
  }
