import { IConfirmDataLogin, useConfirmLoginMutation } from "@/src/shared/api";
import { useErrorReq } from "@/src/shared/model";
import { SubmitHandler } from "react-hook-form";

export const useConfirmOnSumbit = () => {
  const [confirmLogin, {isLoading, error, data}] = useConfirmLoginMutation();
  const errorInfo = useErrorReq(error);

  const onSubmit: SubmitHandler<IConfirmDataLogin> = async (confirmData) => { 
    confirmData.id = localStorage.getItem("id") || '';
    await confirmLogin(confirmData).unwrap();
  };

  return {onSubmit, isLoading, errorInfo, data}
}