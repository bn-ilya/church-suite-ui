import { ILoginDataUser, ILoginDataUserReq, IRegDataUser, TApiChannel, useLoginUserMutation } from "@/src/shared/api";
import { useErrorReq } from "@/src/shared/model";
import { SubmitHandler } from "react-hook-form";

export const useLoginOnSubmit = () => {
  const [loginUser, {isLoading, error, data}] = useLoginUserMutation();
  const errorInfo = useErrorReq(error);
  const onSubmit: SubmitHandler<ILoginDataUser> = async (userData) => {  
    const reqData: ILoginDataUserReq = {...userData, channel: "sms"} 
    await loginUser(reqData).unwrap();
  };

  return {onSubmit, isLoading, errorInfo, data}
}