import React, {useState ,useEffect} from "react"

function DigitalClock (){

    const [time, setTime] = useState(new Date());

    // useEffect(function , dependencies)

    useEffect(() =>{
        // const interValId = setInterval(callBackFunction, timePeriod);
        const interValId = setInterval(()=>{
            setTime(new Date());
            console.log('tick');
        }, 1000); // 1000 --> 1sec // callBack Function is here is working
        return  () =>{
            clearInterval(interValId);
        }
    } , []);


    function formateTime(){
        let hour = time.getHours();
        const minute = time.getMinutes();
        const second = time.getSeconds();
        // const miliSecond = time.getMilliseconds();
        const meridiem = hour <= 12 ? 'AM':'PM';

        hour = hour%12 || 12;

        return `${padZero(hour)}:${padZero(minute)}:${padZero(second)}  ${padZero(meridiem)}`;
    }

    function padZero(number){
        return (number < 10 ? '0': '')+number;
    }

    return(
        <>
        <div className="clock-container">
            <div className="clock-container-title">
                <h1>Digital Watch</h1>
                 <p>“Time waits for no one” – Satyam Pal</p>
            </div>
            <div className="clock">
                <span>{formateTime()}</span>
            </div>
        </div>
        </>
    )
}

export default DigitalClock