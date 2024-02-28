import { IEditDataUser, IError, useEditUserMutation } from "@/src/shared/api";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

export const useEditOnSubmit = () => {
  const [editUser, {isLoading, error, data, isSuccess}] = useEditUserMutation();
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

  const onSubmit: SubmitHandler<IEditDataUser> = async (userData) => { 
    await editUser(userData).unwrap();
  };

  return {onSubmit, isLoading, errorMsg, data, isSuccess}
}