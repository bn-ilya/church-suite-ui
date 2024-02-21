import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import { IError } from "../../api";

type TError =  FetchBaseQueryError | SerializedError | undefined; 

export const useErrorReq = (error: TError) => {
  const [errorMsg, setErrorMsg] = useState('');

  const clearErrorMsg = () => {
    setErrorMsg('');
  }
  
  useEffect(() => {
    if (error) {
      if ('status' in error) {
        const errMsg = 'error' in error ? error.error : (error.data as IError).error.message;
        setErrorMsg(errMsg);
      } else {
        error.message && setErrorMsg(error.message);
      }
    }

    return clearErrorMsg
  }, [error])

  return errorMsg;
}