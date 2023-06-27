import { Calendar } from '../../Components/Calendar/Calendar'
import React,{ useState,useContext,useEffect } from "react";
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router';
import { useTours } from '../../hooks/useTours';
import { HOME_URL } from '../../constants/url';
import { PayPalScriptProvider } from '@paypal/react-paypal-js';
import { PaypalWrapper } from '../../Components/PaypalWrapper/PaypalWrapper';

export function ReservationPage() {

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
    const {tour, getOneTour, isLoading}=useTours();
    const navigate = useNavigate();

    useEffect(()=>{
        getOneTour(tourId);
    },[])
    
    const handleConfirmar= (event)=>{
        event.preventDefault();
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
        alert(formattedFecha)
    }

  
    const formattedFecha = dayjs(selectedDate).format('MM/DD/YYYY');

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

