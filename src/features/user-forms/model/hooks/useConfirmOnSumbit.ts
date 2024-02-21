import { IConfirmDataLogin, useConfirmLoginMutation } from "@/src/shared/api";
import { useErrorReq } from "@/src/shared/model";
import { SubmitHandler } from "react-hook-form";

export const useConfirmOnSumbit = (phone: string) => {
  const [confirmLogin, {isLoading, error, data}] = useConfirmLoginMutation();
  const errorMsg = useErrorReq(error);

  const onSubmit: SubmitHandler<IConfirmDataLogin> = async (confirmData) => { 
    confirmData.phone = phone;
    await confirmLogin(confirmData).unwrap();
  };

  return {onSubmit, isLoading, errorMsg, data}
}