import { useNavigate } from "react-router-dom";
import { HOME_URL , COMPLETE_URL} from "../../constants/url";
import {
  registerWithEmailAndPassword,
  signInWithGoogle,
  signInWithFacebook
} from "../../firebase/auth-service";
import { useState , useEffect} from "react";
import {
  doc,
  onSnapshot ,
} from 'firebase/firestore';
import { useUsers } from "../../hooks/useUsers";
import { db } from '../../firebase/config';
import { useUserContext } from '../../contexts/UserContext'
import { useGlobalContext } from "../../contexts/GlobalContext";

export function SignupPage() {
  const {usuarios, getUsuarios} = useUsers()
  const [tipodeuser, setTipodeuser] = useState(null);
  const { user } = useUserContext(); 
  const {firebaseToursData, firebaseArtsData, firebaseUsersData}=useGlobalContext()

  useEffect(()=>{
    getUsuarios(firebaseUsersData.data_user);
  },[firebaseUsersData])

  const [errors, setErrors] = useState({
    usertype: "",
  });  const navigate = useNavigate();
  const [formData, setData] = useState({usertype: "" });

  const newErrors = {};

  const onSuccess = () => {
    navigate(HOME_URL); };

    useEffect(() => {
      if (user && user.id) {
        const userDocRef = doc(db, "users", user.id);
  
        const unsubscribe = onSnapshot(userDocRef, (doc) => {
          setTipodeuser(doc.data().usertype);
        });
  
        return () => unsubscribe();
      }
    }, [user]);
    
      const onFail = (_error) => {
        newErrors.email = "El correo electrónico es inválido o ya ha sido tomado";
      };
    
      const handleSubmit = async (event) => {
        event.preventDefault();
        if (!formData.email) {
          newErrors.email = "El correo electrónico es obligatorio";
        }
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
        if (!formData.fullname){
          newErrors.fullname = "El nombre y apellido es obligatorio";
        } else if (!/^[a-zA-Z\s]+$/.test(formData.fullname)) {
          newErrors.fullname = "El nombre y apellido solo pueden contener letras y espacios en blanco";
        }
       else if (formData.fullname.trim().length !== formData.fullname.length) {
        newErrors.fullname = "El nombre y apellido no pueden comenzar ni terminar con espacios en blanco";
      }

        if (!formData.password) {
          newErrors.password = "La contraseña es obligatoria";
        } else if(formData.password.length < 8){
          newErrors.password="Verifica que la contraseña contenga 8 caracteres"
        }
        if (!formData.usertype) {
          newErrors.usertype = "El tipo de usuario es obligatorio";
        }
        
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
        await registerWithEmailAndPassword({
          userData: formData,
          onSuccess,
          onFail,
        });
        if (Object.keys(newErrors).length > 0) {
          setErrors(newErrors);
          return;
        }
      };
    
      const handleGoogleClick = async () => {
        await signInWithGoogle({
          onSuccess: () => {
            if (user.usertype === "") {
              navigate(COMPLETE_URL);
            } else {
              navigate(HOME_URL);
            }
          },
        });
      };



  const handleFacebookClick = async () => {
  await signInWithFacebook({
    onSuccess: () => {
      if (user.usertype === "") {
        navigate(COMPLETE_URL);
      } else {
        navigate(HOME_URL);
      }
    },
  });
};
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

                    
    
                    <div className="bg-white shadow relative lg:rounded-none md: rounded-xl lg:px-28 md: px-10 md: pb-10 lg:min-h-screen lg:ms-auto md: h-5/6 lg:w-1/2 md: w-5/6  lg:mt-0 md: mt-10">
                     <div className="scale-90">   
                        <p tabIndex="0" className="focus:outline-none text-sm mt-1 font-medium leading-none text-gray-500 font-montserrat text-right">¿Ya tienes una cuenta? <a href="/login"   className="hover:text-orange-700 focus:text-orange-700 focus:outline-none focus:underline hover:underline text-sm font-medium leading-none  text-orange-500 cursor-pointer font-montserrat"> Inicia sesión</a></p>
                        <p tabIndex="0" className="focus:outline-none text-3xl font-extrabold leading-6  font-raleway text-[#001A72] text-center lg:mt-14 md: mt-10">Registrarse</p>

                        {/* Inputs */}

                            <div className='mt-6'>
                                <label id="email" className="text-sm font-medium leading-none text-gray-800 font-montserrat" >
                                    Correo electrónico
                                </label>
                                <input aria-labelledby="email" type="email" name="email" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" id="email" placeholder="Ej. simoncito@email.com" onChange={onChange}/>
                                {errors.email && (<p className="text-red-500 text-xs mt-1">{errors.email}</p>)}
                            </div>

                            <div className='mt-4'>
                                <label id="fullname" className="text-sm font-medium leading-none text-gray-800 font-montserrat">
                                    Nombre y apellido 
                                </label>
                                <input aria-labelledby="email" type="text" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" pattern="[A-Za-z]+" required  placeholder="Ej. Simón Bolívar" name="fullname" onChange={onChange}/>
                                {errors.fullname && (<p className="text-red-500 text-xs mt-1">{errors.fullname}</p>)}
                            </div>

                            <div className='mt-4'>
                                <label id="username" className="text-sm font-medium leading-none text-gray-800 font-montserrat">
                                    Nombre de usuario
                                </label>
                                <input aria-labelledby="email" type="text" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2" pattern="[A-Za-z]+" required  placeholder="@simoncito" name="name" onChange={onChange}/>
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


                            <div className="mt-4  w-full">
                                <label htmlFor="pass" className="text-sm font-medium leading-none text-gray-800 font-montserrat">
                                    Contraseña
                                </label>
                               <div className="relative flex items-center justify-center">
                                <input id="pass" type="password" name="password" className="bg-gray-200 border rounded  text-xs font-medium leading-none text-gray-800 py-3 w-full pl-3 mt-2"  placeholder="********" onChange={onChange}/>
                                <div className="absolute right-0 mt-2 mr-3 cursor-pointer">
                                        
                                </div>
                                
                               </div>
                               {errors.password && (<p className="text-red-500 text-xs mt-1">{errors.password}</p>)}

                            </div>


                        {/* Botones */}

                            <div className="mt-8">
                                <button type="submit" role="button" className="focus:ring-2 focus:ring-offset-2 focus:ring-indigo-700 text-sm font-semibold leading-none text-white focus:outline-none bg-black border rounded hover:bg-gray-700 py-4 w-full"  onClick={handleSubmit}>Registrarse</button>
                            </div>
                
                        
                        <div className="w-full flex items-center justify-between py-5 mt-2">
                             <hr className="w-full bg-gray-400"></hr>
                             <p className="text-base font-medium leading-4 px-2.5 text-gray-400">O</p>
                             <hr className="w-full bg-gray-400  "></hr>
                        </div>


                        <button aria-label="Continue with google" role="button" className="focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-3" onClick={handleGoogleClick}>
                            <img className="h-5 w-5" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/882px-Google_%22G%22_Logo.svg.png?20230305195327" alt="Google Logo" />
                            
                            <p className="text-base font-medium ml-4 text-gray-700 font-montserrat">Continuar con Google</p>
                        </button>
                        

                        <button aria-label="Continue with github" role="button" className="focus:outline-none  focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full mt-4" onClick={handleFacebookClick}>
                            <img className="h-5 w-5" src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Facebook_f_logo_%282021%29.svg/768px-Facebook_f_logo_%282021%29.svg.png?20210818083032" alt="Facebook Logo" />     
                            <p className="text-base font-medium ml-3 text-gray-700 font-montserrat">Continuar con Facebook</p>
                        </button>    
                        </div>

                    </div>
                </div>
            </div>
            
  )
  }