"use client";

import { ErrorHandler } from "@/src/shared/ui";
import { Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/src/shared/model";
import { useLoginOnSubmit } from "./model/hooks/useLoginOnSubmit";

const timerTime = 60;

export const RepeatVerify = () => {
  const phone = useAppSelector(state => state.userSlice.phone);
  const {onSubmit, isLoading, errorInfo} = useLoginOnSubmit()
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
    onSubmit({id: localStorage.getItem("id") || undefined})
  }

  return (
    <div>
      {!isAvailable && attempts > 0 ? (
        <div className="flex gap-2 justify-center text-zinc-400">
          <div>Отправить повторно через:</div>
          <div>{timer}</div>
        </div>
      ):(
        attempts > 0 && (
          <div className="flex justify-center">
            <Button isLoading={isLoading} variant="light" size="sm" onClick={handleClick}>Отправить снова</Button>
          </div>
        )
      )}

      <ErrorHandler message={errorInfo.errorMsg} code={errorInfo.errorCode}/>
    </div>
  )
}