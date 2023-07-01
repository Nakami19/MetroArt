import { db } from "./config";
import { collection, deleteDoc, onSnapshot } from 'firebase/firestore';


export const firebaseToursData = {
    data_tour: []
    };

export const loadToursFromFirebase = () => {
        const ToursRef = collection(db, "tours");
        onSnapshot(ToursRef, (snapshot) => {
          firebaseToursData.data_tour = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        });
      };



   export const firebaseArtsData = {
    data_art: []
    };

    export const loadArtsFromFirebase = () => {
        console.log(firebaseArtsData.data_art+ "  AAAAAAAAAAAAAAA")
    const ArtsRef = collection(db, "obras");
    onSnapshot(ArtsRef, (snapshot) => {
   firebaseArtsData.data_art = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));} )
   console.log(firebaseArtsData.data_art+ "  aaaaaaaaaaaaaa")
      };

// const ArtsRef = collection(db, "obras");
//     onSnapshot(ArtsRef, (snapshot) => {
//    firebaseArtsData.data_art = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));} )
// const ToursRef = collection(db, "tours");
//     onSnapshot(ToursRef, (snapshot) => {
//    firebaseToursData.data_tour = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));} )


