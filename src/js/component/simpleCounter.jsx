import React, {useState, useEffect} from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons"

const SimpleCounter = () =>{
    const [seconds, setSeconds] = useState(0)
    const [isActive, setisActive] = useState(false)
    const [minutes,setMinutes] = useState (0)
    const [hours,setHours] = useState (0)
    const [days,setDays] = useState (0)
    const [startColor, setstartColor] = useState ("grey")
    const [stopColor, setstopColor] = useState ("grey")
    const [resetColor, setresetColor] = useState ("grey")
    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setSeconds(prevSeconds => {
                    if (prevSeconds >= 9) {
                        setMinutes(prevMinutes => {
                            if (prevMinutes >= 9) {
                                setHours(prevHours => {
                                    if (prevHours >= 9) {
                                        setDays(prevDays => prevDays + 1);
                                        return 0; 
                                    }
                                    else{
                                        return prevHours + 1;
                                    }
                                });
                                return 0; 
                            }
                            else {
                                return prevMinutes + 1;
                            }
                        });
                        return 0; 
                    } else {
                        return prevSeconds + 1; 
                    }
                });
            }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval); 
    }, [isActive, seconds]);

    function startTimer() {
        setisActive(true);
        setstartColor("blue")
        setstopColor("grey")
        setresetColor("grey") 
    }

    function stopTimer() {
        setisActive(false);
        setstartColor("grey")
        setstopColor("blue")
        setresetColor("grey")  
    }
    function resetTimer () {
        setisActive (false);
        setSeconds(0);
        setMinutes(0);
        setHours(0);
        setDays(0);
        setstartColor("grey")
        setstopColor("grey")
        setresetColor("blue") 
    }
    return (
    <>
        <div className="d-flex justify-content-center">
            <div className="contador reloj mx-2"><FontAwesomeIcon icon={faClock} /></div>
            <div className="contador segundos mx-2">{days}</div>
            <div className="contador minutos mx-2">{hours}</div>
            <div className="contador horas mx-2">{minutes}</div>
            <div className="contador dias mx-2">{seconds}</div>
        </div>
        <div className="d-flex justify-content-center" >
            <button className="btn btn-primary m-2 start" style = {{background: startColor}} onClick={()=>{startTimer()}} type="button">Start Timer</button>
            <button className="btn btn-primary m-2" style = {{background: stopColor}} onClick={()=>{stopTimer()}} type="button">Stop Timer </button>
            <button className="btn btn-primary m-2" style = {{background: resetColor}} onClick={()=>{resetTimer()}} type="button">Reset Timer </button>
        </div>
    </>
    
)}

export default SimpleCounter