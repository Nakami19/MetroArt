import { Calendar } from '../../Components/Calendar/Calendar'
import React,{ useState,useContext,useEffect } from "react";
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router';
import { useTours } from '../../hooks/useTours';
import { HOME_URL } from '../../constants/url';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PaypalWrapper } from '../../Components/PaypalWrapper/PaypalWrapper';
import {
  doc,
  onSnapshot,
  updateDoc,
  setDoc,
  deleteDoc,
  collection,
  serverTimestamp,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore';
import { db } from '../../firebase/config';
import { useUserContext } from '../../contexts/UserContext'
import { useGlobalContext } from '../../contexts/GlobalContext';

export function ReservationPage() {
  
    const profilecollection = collection(db, 'users');
    const { user } = useUserContext(); 

    const [pay, setPay] = useState(5);
    const [formData, setData] = useState({
        horario: "" 
      });
    const [errors, setErrors] = useState({fecha: '', horario: ''});
    const onChange = (event) => {
        setData((oldData) => ({
          ...oldData,
          [event.target.name]: event.target.value,
        }));
      };

    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateSelect = (date) => {
        setSelectedDate(date); 

      };
    const {tourId}=useParams();
    const {firebaseToursData, firebaseArtsData}=useGlobalContext()
    const {tour, getOneTour, isLoading}=useTours();
    const navigate = useNavigate();

    useEffect(()=>{

      getOneTour(tourId,firebaseToursData.data_tour); 
  },[firebaseToursData])

    const formattedFecha = dayjs(selectedDate).format('MM/DD/YYYY');

    
    const handleConfirmar= async (event)=>{
        event.preventDefault();
        const userRef = doc(profilecollection, user.id);
        const newErrors = {};

        if (!selectedDate) {
            newErrors.fecha = "La fecha de reserva es obligatoria";
        }

        else if (selectedDate.toString() == "Invalid Date"){
          newErrors.fecha = "La fecha ingresada es inválida";
        }
        else if (selectedDate.isBefore(dayjs(), "day")) {
        newErrors.fecha = "La fecha de reserva no puede ser anterior a la fecha actual";
        }

        if (!formData.horario) {
            newErrors.horario = "El horario a seleccionar es obligatorio";
          }

          if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
          }
          setErrors({ fecha: '', horario: '' })
        

        const reserva = {
          id_tour: tour.generated_id,
          fecha: formattedFecha,
          horario: formData.horario,
        }
        
        let lista = user.reservas
        lista.push(reserva)

        try {
          await updateDoc(userRef, {"reservas": lista});
          setData({horario: "" })
          navigate(HOME_URL)
          } catch (error) {
          console.error(error);
        }
    }

    function generarIdTicket() {
      const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const numeros = '0123456789';
      let id = '';
    
      // Agregar una letra aleatoria en una posición aleatoria
      const posicionLetra = Math.floor(Math.random() * 5);
      const letraAleatoria = letras.charAt(Math.floor(Math.random() * letras.length));
      id += id.length === posicionLetra ? letraAleatoria : numeros.charAt(Math.floor(Math.random() * numeros.length));
    
      // Agregar un número aleatorio en una posición aleatoria diferente a la anterior
      let posicionNumero = Math.floor(Math.random() * 5);
      while (posicionNumero === posicionLetra) {
        posicionNumero = Math.floor(Math.random() * 5);
      }
      const numeroAleatorio = numeros.charAt(Math.floor(Math.random() * numeros.length));
      id += id.length === posicionNumero ? numeroAleatorio : letras.charAt(Math.floor(Math.random() * letras.length));
    
      // Agregar caracteres alfanuméricos aleatorios en las posiciones restantes
      for (let i = 0; i < 5; i++) {
        if (i !== posicionLetra && i !== posicionNumero) {
          const caracterAleatorio = Math.random() < 0.5 ? letras.charAt(Math.floor(Math.random() * letras.length)) : numeros.charAt(Math.floor(Math.random() * numeros.length));
          id += caracterAleatorio;
        }
      }
    
      return id;
    }
    const xd= async (event)=>{
      event.preventDefault();
      const idTicket = generarIdTicket();
      alert(idTicket);    }

    
    const openPopup = () => {
        const width = 600;
        const height = 400;
        const left = (window.innerWidth - width) / 2;
        const top = (window.innerHeight - height) / 2;
        const popupUrl = 'https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=FJ48PVKAP2RMJ';
        const popupName = '_blank';
        const popupFeatures = `width=${width},height=${height},left=${left},top=${top}`;
      
        window.open(popupUrl, popupName, popupFeatures);
      }
    

    const cancelReservation = () => {
        navigate(HOME_URL)
      };
      


  return (
    <div className='p-6 flex flex-col gap-4 lg:gap-6'>
        <h1 className='font-bold font-raleway text-[#C14C00] text-xl text-center'>¡Completa tu reserva!</h1>
        <div className='flex flex-col gap-3 lg:flex-row lg:justify-center lg:gap-7'>
            <div className='flex flex-col gap-2'>
                <h2 className='font-bold text-center font-montserrat'>{tour.name}</h2>
                <img className='h-96'src={tour.url}/>
            </div>
            <form className='font-montserrat text-xs flex flex-col h-80 justify-evenly lg:h-96 lg:justify-center lg:gap-5'>
                <div>
                    <p className='font-bold'>Selecciona el día de la reserva</p>
                    <Calendar onDateSelect={handleDateSelect} />
                    {!errors.fecha && formattedFecha != "Invalid Date" && (<p className="text-500 text-xs mt-1">La fecha seleccionada es: {formattedFecha}</p>)}
                    {errors.fecha && (<p className="text-red-500 text-xs mt-1">{errors.fecha}</p>)}
                    </div>
                <div className='flex flex-col gap-2'>
                    <p className='font-bold'>Selecciona un horario</p>
                    <select value={formData.horario} className='p-4 border'id="horario" name="horario" onChange={onChange}>
                        <option value="" disabled defaultValue>Pulsa aquí para ver las horas</option>
                            <option>2</option>
                            <option>4</option>
                            <option>3</option>
                    </select>
                    {errors.horario && (<p className="text-red-500 text-xs mt-1">{errors.horario}</p>)}
                </div>
                <div className='flex items-center justify-evenly'>
                    <button className='btn normal-case font-montserrat text-xs text-[#4E598C] btn-outline hover:bg-[#4E598C]' onClick={cancelReservation}>Cancelar</button>
                    <button className='btn normal-case font-montserrat text-white text-xs bg-[#4E598C] hover:bg-[#1c285f]' onClick={handleConfirmar}>Confirmar reserva</button>
                </div>
            </form>
        </div>
        <div className='flex flex-col items-center gap-3'>
            <h1 className='text-center font-raleway font-bold text-xl text-[#4E598C]'>¡Ayúdanos y dona con PayPal!</h1>
            <form>
              <input className='p-3 border' type='number' onChange={(e) => {
                setPay(e.target.value)
              }} placeholder='Monto a donar'/>
            </form>
            <div>
            <PayPalScriptProvider
                options={{
                    "clientId": "Ab0lO39irIToxCMDFIsBPZpIOnDREVATxwk4WSxoEWCjzRNf4VMZD-GgYL6-cNAd_1FwzbFmDcOboYC8",
                    components: "buttons",
                    currency: "USD"
                }}
            >
              <PaypalWrapper
                  currency={"USD"}
                  pay={pay}
                  
              />
            </PayPalScriptProvider>
            </div>
        </div>
    </div>
    
  )
}

