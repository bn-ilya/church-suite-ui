import { IError, IRegDataUser, useCreateUserMutation } from "@/src/shared/api";
import { useErrorReq } from "@/src/shared/model";
import { useEffect, useState } from "react";
import { SubmitHandler } from "react-hook-form";

export const useCreateOnSubmit = () => {
  const [createUser, {isLoading, error, data}] = useCreateUserMutation();
  const {errorMsg, errorCode} = useErrorReq(error);

  const onSubmit: SubmitHandler<IRegDataUser> = async (userData) => { 
    
    await createUser(userData).unwrap();
  };

  return {onSubmit, isLoading, errorMsg, errorCode, data}
}