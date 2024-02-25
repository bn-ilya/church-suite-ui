import { IError, ILoginDataUser, IRegDataUser, useLoginUserMutation } from "@/src/shared/api";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

export const useLoginOnSubmit = () => {
  const [loginUser, {isLoading, error, data}] = useLoginUserMutation();
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

  const onSubmit: SubmitHandler<ILoginDataUser> = async (userData) => { 
    
    await loginUser(userData).unwrap();
  };

  return {onSubmit, isLoading, errorMsg, data}
}