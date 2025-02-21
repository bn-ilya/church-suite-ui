import { Dispatch, SetStateAction, useEffect } from "react";
import { UseFormWatch } from "react-hook-form";
import { FormDataToSend } from "../type";

export const useWatchPaymentProvenForm = (
  watch: UseFormWatch<FormDataToSend>,
  setPaymenProven: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "files" || name === "senderName") {
        if (value.files?.length || value.senderName) {
          setPaymenProven(true);
          return;
        }

        setPaymenProven(false);
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
};
