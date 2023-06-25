import { db } from "./config";
import { collection } from 'firebase/firestore';
import { doc, setDoc, addDoc, updateDoc, getDoc, getDocs } from "firebase/firestore";

export const getToursDocuments= async ()=>{
    let tourss=[];
    const tours= collection(db, "tours");
    const tour = await getDocs(tours);
    tour.forEach((doc) => {
       tourss.push(doc.data());
    });
    return tourss;
  }

export const getArtDocuments=async () => {
    let obrass=[];
    const arts= collection(db, "obras");
    const art= await getDocs(arts);
    art.forEach((doc)=>{
        obrass.push(doc.data())
    })
    return obrass;
}

export const getUserDocuments=async ()=>{
    let usuarios=[];
    const personas= collection(db, "users");
    const persona = await getDocs(personas);
    persona.forEach((doc) => {
        usuarios.push(doc.data());
    });
    return usuarios;
  }
