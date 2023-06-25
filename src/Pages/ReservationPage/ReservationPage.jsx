import { Calendar } from '../../Components/Calendar/Calendar'
import React,{ useState,useContext,useEffect } from "react";
import dayjs from 'dayjs';
import { useNavigate, useParams } from 'react-router';
import { useTours } from '../../hooks/useTours';
import { HOME_URL } from '../../constants/url';

export function ReservationPage() {

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
            <button className='btn w-fit bg-[#C9D1F7]'><img className='h-5' onClick={openPopup} src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/2560px-PayPal.svg.png"/></button>
        </div>
    </div>
    
  )
}
