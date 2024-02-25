"use client";

import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";

const timerTime = 60;

export const RepeatVerify = () => {
  const [isAvailable, setAvailable] = useState(false);
  const [timer, changeTimer] = useState(timerTime);
  const [attempts, setAttempts] = useState(2);

  useEffect(()=>{
    if (attempts != 0) {
      const timerId = setInterval(()=>{
        changeTimer((prev) => {
          if (prev-1 != 0) {
            return prev-1;
          } else {
            clearInterval(timerId);
            setAvailable(true);
            return 0;
          }
        }); 
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [attempts])

  const handleClick = () => {
    setAvailable(false);
    changeTimer(timerTime);
    setAttempts(prev=>prev-1);
    console.log('Отправка повторноого запроса')
  }

  return (
    <div>
      {timer}
      <Button isDisabled={!isAvailable} onClick={handleClick}>Отправить снова</Button>
    </div>
  )
}