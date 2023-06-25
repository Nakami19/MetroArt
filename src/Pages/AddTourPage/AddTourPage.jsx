import React, { useEffect, useState } from 'react'
import { useArts } from '../../hooks/useArts';
import { AddTour } from '../../firebase/info';

export function AddTourPage() {
    const {arts, getArts, isLoading} =useArts();
    const [checkedValues, setValue] = useState([]);
    const [selectValue, setSelectValue] = useState("Disponible");
    const [nameValue, setNameValue] = useState("");
    const [durationValue, setDurationValue] = useState("45");
    const [descriptionValue, setDescriptionValue] = useState("");


    function handleChange(event){

        const {value, checked} = event.target

        if(checked){
            setValue(pre => [...pre, value])
        }else(
            setValue(pre => [...pre.filter(skill => skill!==value)]
            )
        )

    }

    function handleForm(){
        let arrayobras = [];
        let important = "";
        checkedValues.map((nameobra) => {
            arts.map((obra) => {
                if(nameobra == obra.nombre){
                    arrayobras.push(obra)
                    important+=(obra.ubicacion+' ')
                }
            })
        })
        let disp = false
        if(selectValue == 'Disponible'){
            disp = true
        }

        const data = {
            description: descriptionValue,
            disponible: disp,
            duration: durationValue,
            feedbacks:[],
            id:'1234',
            important_places: important,
            name: nameValue,
            obras: arrayobras,
            reviews: 0,
            url: 'https://images.pexels.com/photos/1252983/pexels-photo-1252983.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
        }
        console.log(data)
        //const add = AddTour(data)

    }

    console.log(checkedValues)

    useEffect(()=>{
        getArts()
    },[])


    if(isLoading) {
        return (
            <>
            <span className="loading loading-spinner loading-lg"></span>
            </>
        )
    } else if (!isLoading) {

        return (
        <section className='p-7 md:p-16 flex flex-col gap-5 lg:flex-row lg:justify-center lg:items-center'>
        <div className='flex flex-col gap-5 w-full lg:items-center lg:w-96'>
            <h1 className='text-center font-raleway text-2xl font-bold text-[#4E598C]'>nombre</h1>
            <div className="avatar w-96">
                <div className=" w-full rounded">
                    <img src='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBISERESERISGBISEhEYFRISERESFRISGBgZGhgUGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHhISHjErISUxNDQ0NDE0NDE0NDE0NDQ0NDQ0NDQ0NDQ0NDQ0MTQ0NDE0NDQ0NDQ0NDQ0MTQxNDQ0Pf/AABEIALcBEwMBIgACEQEDEQH/xAAbAAACAgMBAAAAAAAAAAAAAAAAAQIEAwUGB//EAEEQAAICAQIEAwYDBQcACwAAAAECABEDBCEFEjFBBlFhEyJxgZGxMqHBFCNCUvAHcoKSstHhFSQzNENTYmNzovH/xAAZAQADAQEBAAAAAAAAAAAAAAAAAQMCBAX/xAAlEQACAgICAgICAwEAAAAAAAAAAQIRAyESMQRBIlETMhRCkWH/2gAMAwEAAhEDEQA/APRAJICSAkgIxURAjqSAjqAxVHUcIDFUccIrAUcIQAIQhAAhCEQwhCEACEIQAIRwgMUcIQAIQhAYqhUlFAYjCo4QGKKo6hUBkSIqkiIEQNGIiRZZlqRIjQGLlimSoTVgTAkhCOZs5whHCIAqEI4DFCo4QAUI4QAUI4QAIVCEACFQhAYQhCABCOEAFCOEACEI4DCEIQGKoVHCAxRSUIDIxVJVEYGiJERElERACFQk4QsAEYhCBAI4QgAQhHABRwhAAhCoQAIQhAAhCEAFCEYgAoQhCxjhCEACAhHAAhCEBhCOEBijhCZGEIVCAxQMcIAQik4iIGiNQjhNAKOEIEAjhHABRwhAAhCEACEIQAUhnYhSR1FfeZJj1P4D8vvExrsqrnfzH0El7Z/MfQThPFuEHVodv+wxj/7vMGnwAdhNKDauymvo9C9q/n+QiOZ/MfQThHRe9flNbrSvQdx9JqOFv2ZlKMez032z+Y+gi9u/mPpPENSbO39espPiHl+UsvEf2cj8uCdJHvnt8nmP8oh7fJ6f5RPARh9Iexg/Ff2bXkxfo99Ooyen+WS02odno1VHoJ4NpsXvp/fT7ie8aYe/8jIZMbg1svCcZJ0i8I4o5MAjhCA0EVRwgMIQhAYoRxQAIo4oARqElCBoiI5j56k1NzRAccIQAIQhAAhHCAChHCACmPUfgPy+8yTHqPwH5feJjXZwnif/AL0v/wAWP/W8rINpe8Qp/wBZU1/4Sf6nmFU2nTGuKMOTtlHPZmr1SmtvtNzmFX95qdUpO06caPP8nI0mah8e/wDR3mM45cZPTeR5Z0nmLI7KgxRjFLQSS9nMtF45Stixe+n99fuJ7Vpvx/Izx/Gvvp/fX7iev6Y+/wDIzg8vtHq+FLlFl+EJBnAnMdZOOVk1SMxUMCw7XLAMyMcIoQGOELiJgA4SPNDmgMcUickg+dR1IgOjLCVv2zH/ADL9RFAfFml1HFBy84Irr/tLfBeKLlDC6ZTRXuJzq4C38Puqe01vEC2HIMmIkMK5qB3HltMYXzVt7OfI3FnpfMIcwnNcH4g+XGCSfnNuENbky7jWrFGVq6L3MI+aUFT1lfU6vkNc35xUNujcXC5q8OsJ7y+j2ImqGnZmhMReMvUAonIaj8J+Ux+2vpIZHsEen6iJjXZy/HUvOp/9tf8AU0r8s2fFBj9oOd0U8g2ZgDVtvUx/ugBeRKNAHnWjfSpSOSKSQpY5Nto1OXDYO0pPpCb2/KdJyYzVZMdkkAB13YdQPPoYn0C77mVjmSOafjcuzlH0m3T9JgOk+Ey+NdW+lxoUDAux98LaKBWzE7Am9u+xj8HZsmowM2RAWDGnIG69KHqKP1lVnOZ+EmYl0B8vyMDo/hOkGhNbgfnItw/0H0Ef5xrw19HNJpxzLv8AxL9xPTsTEPYHYzj24duNu47es6xHCmz6zmzz5NHb42LgmSbiJLFQpsdyRMeoGRhsfylY5OVyx7m5J+JrIW/R0IqpoWDc3Mebz7zbaTVEbZDfr/vNS/Fl8xK/7a7H3FJ+Ajbk+xpI6l9Uo7yueIqDvc5p9Y4NHYyLZn6k/wD5FTGoo6TJxVB5/aUc/GR2M1iA5B12lbU4QOphropGKRs043R638rmV+NtWwE5rMVUWD9JLEHK2brtBpFFFG2yca/mv5GazU8WDE0TNdq0PTeU8eIxUkWikXjqD/MYSr7A+f5wisodhoNSgx2223TzM02m1AfUFGIpia+HrMHFXbHhJBFjrXlNR4XR8mcO18t7X2jxxTfx6PDnOmkz1PTYERQABB8huhDDiPL1j/Z5Sjd6MT2BtsfOajU6Uk2SSfMzeNgJ7yP7KCN5qNIy9nNuuX+A0e20zJq9Yg6oR6p/zN0ujAMk+muO19GeL+yhh12c7sBfpYEsLqcrjoB8LmX9lIk0QiJpGk2VmGQC7+VSWkyOzNzjblP3EtMpiRCL+H6iJ9Gk/kjl/EoH7Ql/+UopjSm2f1ABHr+k1VBGKixXu2xW6Hl6dPObTxMP3/u/ibAn4m5VCq7m6rf/AJE0rZyAWBbm5rOVncoqBQ+4JpyRVA/zGedJfJnqR/VBqtD7PkLFVVl3POrU2xVdhs1bAUem11vp9S+RchKuSXdR+7yPzsVrcXQPui7+fQS/gTG+PmC84POV2bI5yNy9B2vcdyPtUYIVyOi78t82PIGTko8w5wN7Y117jyErHRDI7K+o4jq+QI+QtjIcnG9OrKu9sT3FdL6g9hUMPijWIKV8bKCtDGmPlWwaSlGw3UX0+hmHT65Xok4zylbGRQqlypHIHJssT3HQBpS1D4Ucrj5m5GI58bc3MCtbbHYuz1W/5S8W+mckqNvh8aaxrNoaA/gWugsBevn3MuYPGGqYD3cJv+Io1fMBun9fHn3KlSAipkXGylAcjEGx7xFCj073uTvW2VlZVVPaMFyFSVAApUFsNui3zjofwm73g2NPZvsfizVFgGw46PJZ5HWlbo18587+U9G5bNehnimjzsGXHzE41ZGB963PMAh67d9j2M9y0i/vPk0e7N+mV9Ppwz+8LobD1uGu4djamC7+nebf2Y8ouQR3swcg3CQHB7X0m90uFVWgBNi2FT2ExHTgdJqUrBaNXm4cmTICw2XfbazI67hilfcBs7Vf5zaBGvYTKqHvM2as53T8OZAF7yHEeAMylle2A/D0v0E6VsQO/eN02qF7sfJnM6Hw/jCKXssRZJJ2+EX7ETzogvlnQppiBVmLTaQY+au5s2bmXsop0cPqeG5FyEOD02PYynrNKUFqN532u0vtK9O80HFdJyAE+c0qfZaOSzjf3vkYTpQ6/wAohHxib5v6NNm1AYAMKDMdz5TJl16aZOZKLE9qraZ/EnB8jOhRCU7hdh85quJcL5cJs0QelVIYlJbPJyPtJHX+FvES6kFSCGXt6djOqVrni/grU+z1LK7VYNb1c9Sw62ygXe51NezMJembipGCNYkgJgqKo6khIwChVHyxwBgMRWQdfdP9d5kJkX6GD6HHs4XxlkVMjEu6t+zpVAEOebIQo9RTH5jpOOw6kMHPfke152XlXZmqgbvfb0M73xP4XyazKuRMqIFxhPeRmPMC5vrVe/0rsZz2HwBmxnmGpxc29H2T2O/nXWjIqC2zqc9JI0T8VZGZzytYIR3GyZKAJog7WDXzmrxZTzlUXJsoBxlmBbfd3ANAdNu23xnS5P7OcxJI1WOvLkf73vJr4AzqtLqMFk22RsTs5PeielyiikRk5SOZ1OjIAdr5DuycwLIQBSlrHmdwPPaVn4dkV2UlaHvgIeYFAaXla/ePN7u/cTq2/s+1Zq9ZjoCq5Mn9Hbb4bSWb+z/VOwc6rFzBQu6OF5R0UKNgPT1PnGm17JcX7RzHteRAr8/MeRVx84CihZBChaBHX085bVwqYWZn9oHKuoLm0P4CTZCOAwpRd3Zm6b+z3UlQDqMF778j15j3a2IN79d5Yy+A8pCAZsSheYsF9py87UC6Keh5VHzFxOjUYtM0OBHxJha0JyOqkbjnUvvzUfe3B+Q37X7LpmrJ8jPOX8D6nmxn9oxFMbKVBGQkgG6N7Xuf9p6Fpj7/AMm/SCRt6To2a5Lgz1MYgTc1RKzKrxlxMIMiYcQssBhHcqyfPCh2Z+aHNK9xF4qNWWC0fNKyvvJvkhQWjKalXUaZcgphcfOZgfV0Zl90bWtlf/obH5H6wk/20wm+Eh/l/wChomV8anrYH2mi8Q8EOTdTt3AlDgfEHGQY+b1IvoPKdk+6fKPicdqSPFeK8NfBmU3sTsRYo+U7Hw9r2VFOTqD57kSPjPQj2JyfysPznOcC4mQyq3Tpv9xNJrpkmmno9g0WqV1BBlqcRwviLYnAIJxuTTUdp2GDMHUEd4SjWy0J3r2Z7hIzFnyMARjTmflYqpJRTXYvRC9R6zBTZnhEpFWT+fSU8vEN6Qf4pmU1HspDDKb0i9UVjpYmqyZ2NczfTaWcQXGvO5oAbA9fnJrLZZ+NxVt79Fw479JpOK69MbAIOb+b0HnKfFvEd2mI/wCKc9q+I8innZB7RhbE0aNWLPwuTllt1E6Mfj8Y8p/4dkjcwB85KabhXGcOQcqZFY+SsCfpNtz/AB+ksjkkqZMwExnIIBxGBO4rkOeJngBImZtGff8Akf0lYvM2ga3/AMJ/SNdif6s2UUIpQhY4RSVRNjRGoomaLmjQWMmImItIFo6FY7jWYy0QeDWgT2Znfac5r9WFcrcuarW8hIPlOP4nqC2QG5xKbU7fo6+Fxo6hNWKG8JyI1xG3lCd354/RzfhZhTVHDrELkBWIHWelnIHxgqeo7TzfxJow2TExFAn8V9533BUrEgJ6ASs0uziwt20afxHpHyaXIo61Y+INzz7gWInUrjcd9x6T2TVYgyEV2nm2n0RXiTFloHoRJqKZuTcWdzhx4wEFDbYCbjAoAEqY9KtKfKbPT4xQP0ik1WikIv2HLQs9PLvNbl4ygsICWHUdD8ZtMiggg/rNRl4SjvYUgjoyk2Prdzlm5f1O/wAdYv7lLPk5i2RbUdWXcX/Mf69fibekHOKQWfPsPiZc03DAv42LegHKIa3XY9Pj7ADoqipNQfcjoeaL+ONWL2OPCC7kF/M9v7o/Wclxnir5mKoTy+kp8U4s+ZzueW+kjjK41LsQABZJk5y9LorjVO27f39GDHj9nbuRQF2Zx/GNf7bNzMaQfgXfp515y3xXiOTUtyraYgep2LeteUp6fSgtt8yes3ihx+UuwyXJUi/wfAuR0CG35hQFhrvahPaNMGCIHNsEUMbu2AF795wXgbS1qCQAQuNrNA8t0Ab7H/md/c6Me7kcHlSpqP0SuK4iZG5U5SUYMhcLhQWZLhcx3C4UFk5JRMXNMiGJjRIrExjuYHajMrehv7GwkZFslwU3NoyyRmNoO1TGzzSRlsZkCZBnmNsk2omXIp8V0xZbHWcfr0YH4Tts2WwQZyHEQ/tDtsJy5ce7OvDl1RosiNZ3MUsZOp2/KEjTLcjpfEemAx838QogdhLPhrjCkDGWF7d5Djj48mIjm7djOM4JkVdSPeoBtrPWeo9qmeIm1K0ewq4Imv1PD1bIr1utzLpXtBXlM/NI9M6XUlsyoaAEv4Pwr8Jqrm3UUAPSYkUgIiFwM13EOJY8SlnPTt3Mk3RaMXJ0jLr9YuNCxPw+M894rrmyuWYmt+huh8Icb4+czGtlHQTUo5J6zLV7ZeL46RewOg61/X2mi4xxgZHONT7imj/6iJc4q4x4mc9a2PQgnYbzlcOnLbk0Pzk4wV2zpWR6S7LOTUFvdQWf09Zn02jLEWxJ77kD6d5LHg5QAo6/Un1nReH+DPncKvuoK58lbKPL1Y+U036iNtL5SZ1fgbHyYcgAHJzijQFtXvb9/wCGdNcwaXTpiRcaClUbD7knufWZrl4JqNM8zJJSk2h3FcVxTZKyVwuCrAiFjpgTETDlMRUwtBTFcmjzGyyJQw0xW0Z+eYzZMniEHNTDdFErRBgBMfPUM2QAWekrtnBBImYSTlQTVRsebJMJyzG7XMTNOuMTklIytlmJ8omFnlZ3lFEnKZZbMJrtdmXlPSLJklLO4PWOWLkjMM/F7Na+cWfd/KEzcqwkP4sjo/mxOa1WsdlNO1HtNbo8pOVdzYI3hCaJemez8Ic+yWz2E2HPCEUuykejJg951HmRNyYQkZ9l8fRW1WUKpY9AJ5Zx/iJy5G3NAmhCEhLs7YagzTc28t6c1vCEzIcTHx9wdOLH4sigfLf9Jp9IhA3jhBfqbj+x0vh7g7al62CKLdtiQu/QdyaM9I0ulTEq48ahVXoB+p7n1hCVxJHL5M3yUfRluFwhLHMImK44QAyY95kIqEJOXZWPREtK2bMR0hCYNDx5LmVWhCbfZiPRBclEzHkYkjyhCYkaiDEEEGa7MwQmu8ISePs1lK4yGQd4QnqRPMkYHeVnaEJREZFbI0wPiJFwhNvSJxSb2UnBsxwhGY4o/9k=' />
                </div>
            </div>
        </div>
        <div className='font-montserrat flex flex-col gap-7 lg:w-7/12 md:justify-evenly'>

            <div className='flex flex-col gap-2 lg:gap-4'>
                <h1 className='font-bold'>Información del tour</h1>
                <div className='bg-black w-full h-0.5 '></div>
                
                <div className='text-xs flex flex-col gap-3 font-bold '>
                <div className='flex gap-2 items-center'>
                    <p>Nombre:</p>
                    <input type="text" onChange={(event)=> setNameValue(event.target.value)} placeholder="Nombre" className="input input-bordered input-sm font-normal text-xs" />
                </div>
                
                <div className='flex gap-2 items-center'> 
                    <p>Disponibilidad:</p>
                    <select value={selectValue} onChange={(event)=> setSelectValue(event.target.value)} className="select select-bordered select-sm max-w-xs text-xs">
                        <option>Disponible</option>
                        <option>No disponible</option>
                    </select>
                </div>
                <div className='flex items-center gap-2'>
                    <p>Duración:</p>
                    <select value={durationValue} onChange={(event)=> setDurationValue(event.target.value)} className="select select-bordered select-sm max-w-xs text-xs">
                        <option>45</option>
                        <option>60</option>
                        <option>160</option>
                    </select>
                    <p>minutos</p>
                </div>
            </div>
            </div>
            
            <div className='text-xs flex flex-col gap-2 text-justify lg:gap-4'>
                <p className='font-bold'>Descripción</p>
                <textarea onChange={(event)=> setDescriptionValue(event.target.value)} className="textarea textarea-bordered h-24 text-xs" defaultValue={""}></textarea>
            </div>
            <div className='lg:flex lg:justify-end lg:gap-2'>
                <button className="btn btn-sm btn-outline normal-case text-[#FF8C42] hover:bg-[#c45815] font-montserrat md:btn-md lg:btn-wide">Cancelar</button>
                <button className="btn btn-sm bg-[#FF8C42] normal-case text-white hover:bg-[#c45815] font-montserrat md:btn-md lg:btn-wide" onClick={handleForm}>Guardar</button>
            </div>
            
        </div>
    <div id="dropdownSearch" className=" rounded-lg shadow w-60 lg:h-96 font-montserrat ">
    <div className="p-3">
      <label htmlFor="input-group-search" className="sr-only">Search</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg className="w-5 h-5 text-gray-500 " aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
        </div>
        <input type="text" id="input-group-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Buscar obra"/>
      </div>
    </div>
    <ul className="h-44 lg:h-72 px-3 pb-3 overflow-y-auto text-sm text-gray-700" aria-labelledby="dropdownSearchButton">

      {
        arts.map((art) => {
            return (
                <li>
                    <div className="flex items-center p-2 rounded hover:bg-gray-100">
                    <input id="checkbox-item-11" type="checkbox" value={art.nombre} onChange={handleChange} className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"/>
                    <label htmlFor="checkbox-item-11" className="w-full ml-2 text-sm font-medium text-gray-900 rounded">{art.nombre}</label>
                    </div>
                </li>
            )
        })
      }
   
      
    </ul>

    </div>
    </section>
        )}
}
