import React, { useState, useContext, useEffect, useRef } from "react"; // these are all the React HOOK's

function StopWatch() {
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const intervalIdRef = useRef(null);
  const startTimeReaf = useRef(0);

  // const [lap, setLap] = useState([{hour:1}, {minutes:34}, {seconds:43}, {milliSeconds}])

useEffect(() =>{
    if(isRunning){
      intervalIdRef.current = setInterval(()=>{
        setElapsedTime(Date.now()-startTimeReaf.current);
      });
    }

    return ()=>{
      clearInterval(intervalIdRef.current);
    }
}, [isRunning]);


  function start() {
    setIsRunning(true);
    startTimeReaf.current = Date.now() - elapsedTime; // setRefrance ==> nowdate IN SEC - ELAPSEDTIME;

  //  console.log( startTimeReaf.current);
   
  }

  function stop() {
    setIsRunning(false);
  }

  function reset() {
    setElapsedTime(0);
    setIsRunning(false);
  }

  function formateTime() {

    let hour = Math.floor(elapsedTime /(1000 * 60 * 60));

    let minutes = Math.floor(elapsedTime /(1000 * 60) % 60);

    let seconds = Math.floor(elapsedTime / (1000) % 60);

    let milliSeconds = Math.floor((elapsedTime % 1000)/10);

    hour = String(hour).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliSeconds = String(milliSeconds).padStart(2, "0");

    return `${hour}:${minutes}:${seconds}:${milliSeconds}`;
  }

  function lap(){

   return alert('Sorry this functionility is not working yet')

  }

  return (
    //   this is called the fragment <> </>
    <>
      <div className="stopWatch">

        <div className="digital-watch">

          <div className="displayWatch">{formateTime()}</div>

          <div className="controlls">
            <button className="stat-btn" onClick={start}>
              Start
            </button>
            <button className="stop-btn" onClick={stop}>
              Stop
            </button>
            <button className="reset-btn" onClick={reset}>
              Reset
            </button>
                        <button className="lap-btn" onClick={lap}>
              Lap
            </button>
          </div>
        </div>
        <div className="lap-history">
              <ul>
                <h4>Lap</h4>
                <h4>Lap Time</h4>
                <h4>Total</h4>
              </ul>
              <ul>
                <li>1</li>
                <li>+ 00:05:08</li>
                <li>00:05:08</li>
              </ul>
          </div>
      </div>
    </>
  );
}
export default StopWatch;
