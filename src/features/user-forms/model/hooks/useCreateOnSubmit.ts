import { IError, IRegDataUser, useCreateUserMutation } from "@/src/shared/api";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

export const useCreateOnSubmit = () => {
  const [createUser, {isLoading, error}] = useCreateUserMutation();
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

  const onSubmit: SubmitHandler<IRegDataUser> = async (userData) => { 
    await createUser(userData).unwrap();
  };

  return {onSubmit, isLoading, errorMsg}
}