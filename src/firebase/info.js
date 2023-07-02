import { db } from "./config";
import { collection, deleteDoc } from 'firebase/firestore';
import { doc, setDoc, addDoc, updateDoc, getDoc, getDocs } from "firebase/firestore";
import { firebaseArtsData, firebaseToursData, loadArtsFromFirebase, loadToursFromFirebase } from "./data";

export const getToursDocuments= async ()=>{
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

export const UpdateUserss= async (data, id)=>{
    const docRef= doc(db,"users",id);
    const docSnap= await getDoc(docRef)

    if(docSnap.exists()) {
        await setDoc(docRef, data);
    }
}

export const DeleteTour=async (id,users) => {
    console.log(id + " id")
    users.map((one)=>{
        if(one.reservas.length>0) {
          one.reservas.map((reserva)=>{
            if(reserva.id_tour==id) {
                let indice=one.reservas.indexOf(reserva)
                one.reservas.splice(indice,1)
                const data= {
                    email: one.email,
                    fullname: one.fullname,
                    id: one.id,
                    name: one.name,
                    reservas: one.reservas,
                    url: one.url,
                    usertype: one.usertype
                }
                UpdateUserss(data,one.id)
            }
          })  
        }
        
    })

    // users.map((usuario)=>{
    //     if (usuario.reservas.length>0) {
    //         console.log(usuario.name)
    //         usuario.reservas.map((reserva)=>{
    //             console.log(reserva)
    //         })
            
    //     }
    // })
    await deleteDoc(doc(db, "tours", id));
}

export const deleteArt=async (id, tours) => {
    tours.map((tour)=>{
        tour.obras.map((obra)=>{
            if(obra.id==id){
                let indice=tour.obras.indexOf(obra);
                tour.obras.splice(indice,1);
                const data = {
                    description: tour.description,
                    disponible: tour.disponible,
                    duration: tour.duration,
                    feedbacks:tour.feedbacks,
                    id:tour.id,
                    generated_id : tour.generated_id,
                    important_places: tour.important_places,
                    name: tour.name,
                    obras: tour.obras,
                    reviews: tour.reviews,
                    url: tour.url,
                }

                UpdateTour(data, tour.id)
            }
        })
    })
    await deleteDoc(doc(db, "obras", id));
}

export const getArtDocuments=async () => {
    let obrass=[];
    // const arts= collection(db, "obras");
    // const art= await getDocs(arts);
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
