import { useEffect } from "react";
import { UseFormWatch } from "react-hook-form";
import { FormDataToSend } from "../type";

type TSetSumRegister = (sumRegister: number) => void;

export const useWatchForm = (watch: UseFormWatch<FormDataToSend>, setSumRegister: TSetSumRegister, costRegister: number) => {
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "count") {
          setSumRegister(Number(value.count) * costRegister);
        }
      }
    )
    return () => subscription.unsubscribe()
  }, [watch])
} 