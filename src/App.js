import React, {useState, useEffect} from "react";
import {Subject, interval, takeUntil} from "rxjs";
import "./App.css";
import Time from "./Time.js"

function App(){
  const [time, setTime] = useState(0);
  const [timerOn, setTimeOn] = useState(false);
  const [wasClicked, setClick] = useState(false);
  let timeout;

  useEffect(() => {
    const unsubscribe = new Subject();
    const observable$ = interval(1000)
      .pipe(takeUntil(unsubscribe))
      .subscribe(()=>{
        if(timerOn) {
          setTime((element) => element + 1);
        }
      });
      return () => {
        unsubscribe.next();
        unsubscribe.complete();
      }
  },[timerOn]);



  return(
    <div>
      <div className="container">

        <div>
          <Time time={time}/>
        </div>

        <div className="buttons">

          {!timerOn && time === 0 && (
            <button onClick={()=>{
              setTimeOn(true)}}>Start</button>
          )}

          {(time || timerOn) && (
            <button onClick={()=>{
              setTimeOn(false);setTime(0);
            }}>Stop</button>
          )}

          {(time || timerOn) && (
           <button onClick={function doubleClick(){
            if(time > 0) {
              setTimeOn(true);
            }
             if(wasClicked){
               setClick(false);
               clearTimeout(timeout);
               setTimeOn(false);
               return;
             }
             else{
               setClick(true);
               timeout = setTimeout(() =>{
                setClick(false);
               }, 300)
             }
             
           }}>

             {timerOn ? "Wait" : "Start"}
           </button>
          )}

          {(time || timerOn) && (
            <button onClick={() => setTime(0)}>Reset</button>
          )}

        </div>

      </div>
      
    </div>
  );
}
export default App;