import { db } from "./config";
import { collection, deleteDoc } from 'firebase/firestore';
import { doc, setDoc, addDoc, updateDoc, getDoc, getDocs } from "firebase/firestore";
import { firebaseArtsData, firebaseToursData, loadArtsFromFirebase, loadToursFromFirebase } from "./data";

export const getToursDocuments= async ()=>{
    loadToursFromFirebase()
    console.log(firebaseToursData.data_tour + "lalalla")
    let tourss=[];
    firebaseToursData.data_tour.forEach((doc) => {
        tourss.push(doc);
     });
    // const tours= collection(db, "obras");
    // const tour= await getDocs(arts);
    // tour.forEach((doc) => {
    //    tourss.push(doc.data());
    // });
    return tourss;
  }

export const AddTour=async (data) =>{
    const newTourRef = doc(collection(db, "tours"));
    data.generated_id = newTourRef.id;
    await setDoc(newTourRef, data);
}

export const UpdateTour= async (data, id) =>{
    const docRef = doc(db, "tours", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        data.generated_id = docRef.id
        await setDoc(docRef, data);
    } else {
    // docSnap.data() will be undefined in this case
    }
    
}

export const DeleteTour=async (id) => {
    await deleteDoc(doc(db, "tours", id));
}

export const getArtDocuments=async () => {
    loadArtsFromFirebase()
    let obrass=[];
    // const arts= collection(db, "obras");
    // const art= await getDocs(arts);
    console.log(firebaseArtsData.data_art+" jijijijij")
    firebaseArtsData.data_art.forEach((doc)=>{
        obrass.push(doc)
    })
    // art.forEach((doc)=>{
    //     obrass.push(doc.data())
    // })
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


// export const firebaseToursData = {
//     data_tour: []
//     };
// const ToursRef = collection(db, "tours");
//     onSnapshot(ToursRef, (snapshot) => {
//    firebaseToursData.data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));} )

//    export const firebaseArtsData = {
//     data_art: []
//     };
// const ArtsRef = collection(db, "tours");
//     onSnapshot(ArtsRef, (snapshot) => {
//    firebaseToursData.data = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));} )
