import { SubmitHandler } from "react-hook-form";
import { FormDataToSend } from "../type";
import { ILiveChatClient, useAddLiveChatClientMutation, useSetLcFormMutation, useUploadImageMutation } from "@/src/shared/api";
import { useEffect, useState } from "react";

export const useRegOnSubmit = () => {
  const [uploadImage, {isLoading: isUploadedImage}] = useUploadImageMutation();
  const [addLiveChatClient, {isLoading: isAddingClient, data}] = useAddLiveChatClientMutation();
  const [setLcForm, {isLoading: isLoadingSetLcForm}] = useSetLcFormMutation()
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  
  const onSubmit: SubmitHandler<FormDataToSend> = async (formData) => { 
    if (formData.files?.length) {
      const files = await uploadImage(formData.files).unwrap();
      formData.cheques = files.map(file => file.id);
      delete formData.files;
    }

    if (!formData.count) {
      formData.count = 1;
    } 

    const data: ILiveChatClient = formData;
    const response = await addLiveChatClient(data).unwrap();
    await setLcForm({lcFormId: response.data.id});
    setSuccess(true)
  };

  useEffect(()=>{
    if (isUploadedImage || isAddingClient || isLoadingSetLcForm) {
      setLoading(true);
    }
    setLoading(false);
  }, [isUploadedImage, isAddingClient, isLoadingSetLcForm])

  return {onSubmit, isSuccess, isLoading, data};
}