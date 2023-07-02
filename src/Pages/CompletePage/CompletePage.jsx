import { useNavigate } from "react-router-dom";
import { HOME_URL } from "../../constants/url";
import { useState , useEffect} from "react";
import { useUsers } from "../../hooks/useUsers";
import {
  doc,
  updateDoc,
  collection,
  onSnapshot ,
} from 'firebase/firestore';
import { useUserContext } from '../../contexts/UserContext';
import { db } from '../../firebase/config';
import { useGlobalContext } from "../../contexts/GlobalContext";


export function CompletePage() {
  

  
  const { user, isLoadingUser } = useUserContext(); 
  const {usuarios, getUsuarios} = useUsers()
  const {firebaseToursData, firebaseArtsData, firebaseUsersData}=useGlobalContext()


  useEffect(()=>{
    getUsuarios(firebaseUsersData.data_user);
  },[firebaseUsersData])



  const [errors, setErrors] = useState({
    usertype: "",
  });  const navigate = useNavigate();
  const [formData, setData] = useState({usertype: "" });

  const newErrors = {};
  const profilecollection = collection(db, 'users');


    
      const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.name) {
          newErrors.name = "El nombre de usuario es obligatorio";
        } else if(formData.name.length < 4){
          newErrors.name="El mínimo de caracteres para el nombre de usuario es 4"
        } else if(formData.name.length > 16){
          newErrors.name="El límite es de 16 caracteres"
        }else if (formData.name.includes(" ")) { 
            newErrors.name = "El nombre de usuario no puede contener espacios en blanco";}
            usuarios.map((usuario)=>{
          if (usuario.name == formData.name){
            newErrors.name = "El nombre de usuario ya ha sido registrado";}
          })

        
          if (!formData.usertype) {
            newErrors.usertype = "El tipo de usuario es obligatorio";
          }

          if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
          }
          try {
            const userRef = doc(profilecollection, user.id);
            await updateDoc(userRef, {"name": formData.name, "usertype": formData.usertype})
            navigate(HOME_URL)
          } catch (error) {
            console.error(error);
          }
        }


    
      const onChange = (event) => {
        setData((oldData) => ({
          ...oldData,
          [event.target.name]: event.target.value,
        }));
      };

  return (
    // <!-- component -->
    <div className="min-h-screen  bg-[url('https://firebasestorage.googleapis.com/v0/b/metro-art-collection.appspot.com/o/proyecto-imagenes%2Ffondo2.png?alt=media&token=8ee412b6-5d37-4c7a-8310-f5ff7ecd68c0')] bg-no-repeat lg: bg-left bg-contain bg-[#4E598C] ">
    
                <div className="flex flex-col items-center justify-center ">

                    
    
                    <div className="bg-white shadow relative lg:rounded-none md: rounded-xl lg:px-28 md: px-10 md: pb-10 lg:min-h-screen lg:ms-auto md: h-5/6 lg:w-1/2 md: w-5/6  lg:mt-0 md: mt-28">
                     <div className="scale-90">   
                        <p tabIndex="0" className="focus:outline-none text-3xl font-extrabold leading-6  font-raleway text-[#001A72] text-center lg:mt-48 md: mt-20">Completar registro</p>

                        {/* Inputs */}

                          

                            <div className='mt-20'>
                                <label id="username" className="text-sm font-medium leading-none text-gray-800 font-montserrat">
                                    Nombre de usuario
                                </label>
                                <input aria-labelledby="email" type="text" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" pattern="[A-Za-z]+" required  placeholder="Ej. Simoncito" name="name" onChange={onChange} />
                                {errors.name && (<p className="text-red-500 text-xs mt-1">{errors.name}</p>)}
                            </div>


                            <div className='mt-4'>
                                <label className="text-sm font-medium leading-none text-gray-800 font-montserrat">
                                    Tipo de usuario
                                </label>
                                <select value={formData.usertype} className="select w-full bg-gray-200 mt-2" onChange={onChange} id="usertype" name="usertype" >
                                <option value="" disabled defaultValue>Pulsa aquí para seleccionar su tipo de usuario</option>
                                    <option>Visitante</option>
                                    <option>Administrador</option>
                                </select>
                                {errors.usertype && (<p className="text-red-500 text-xs mt-1">{errors.usertype}</p>)}
                            </div>


                           


                        {/* Botones */}

                            <div className="mt-8">
                                <button type="submit" role="button" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-black border rounded hover:bg-gray-700 py-4 w-full"  onClick={handleSubmit}>Registrarse</button>
                            </div>
                


                        </div>

                    </div>
                </div>
            </div>
            
  )
  }