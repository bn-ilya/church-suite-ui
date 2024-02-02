import { SubmitHandler } from "react-hook-form";
import { FormDataToSend } from "../type";
import { useUpdateLiveChatClientMutation, useUploadImageMutation } from "@/src/shared/api";

export const useEditOnSubmit = (id: number) => {
  const [uploadImage, {isLoading: isUploadedImage}] = useUploadImageMutation();
  const [updateLiveChatClient, {isLoading: isAddingClient, isSuccess, data}] = useUpdateLiveChatClientMutation();

  const onSubmit: SubmitHandler<FormDataToSend> = async (formData) => { 
    if (formData.files?.length) {
      const files = await uploadImage(formData.files).unwrap();
      formData.cheques = files.map(file => file.id);
      delete formData.files;
    }

    const data = {
      body: formData,
      id
    }

    await updateLiveChatClient(data).unwrap();
  };

  return {onSubmit, isSuccess, isAddingClient, isUploadedImage, data};
}