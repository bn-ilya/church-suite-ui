import { SubmitHandler } from "react-hook-form";
import { FormDataToSend } from "../type";
import { ILiveChatClient, useAddLiveChatClientMutation, useUploadImageMutation } from "@/src/shared/api";

export const useOnSubmit = () => {
  const [uploadImage, {isLoading: isUploadedImage}] = useUploadImageMutation();
  const [addLiveChatClient, {isLoading: isAddingClient, isSuccess, data}] = useAddLiveChatClientMutation();

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
    await addLiveChatClient(data).unwrap();
  };

  return {onSubmit, isSuccess, isAddingClient, isUploadedImage, data};
}