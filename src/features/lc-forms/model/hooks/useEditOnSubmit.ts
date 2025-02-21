import { SubmitHandler } from "react-hook-form";
import { FormDataToSend } from "../type";
import {
  useUpdateLiveChatClientMutation,
  useUploadImageMutation,
} from "@/src/shared/api";
import { useErrorReq } from "@/src/shared/model";

export const useEditOnSubmit = ({ id }: { id: number }) => {
  const [uploadImage, { isLoading: isUploadedImage, error: errorUpload }] =
    useUploadImageMutation();
  const [
    updateLiveChatClient,
    { isLoading: isAddingClient, isSuccess, data, error: errorUpdateLc },
  ] = useUpdateLiveChatClientMutation();
  const errorInfoUpload = useErrorReq(errorUpload);
  const errorInfoUpdateLc = useErrorReq(errorUpdateLc);

  const onSubmit: SubmitHandler<FormDataToSend> = async (formData) => {
    if (formData.files?.length) {
      const files = await uploadImage(formData.files).unwrap();
      formData.cheques = files.map((file) => file.id);
      delete formData.files;
    }

    const data = {
      body: formData,
      id,
    };

    await updateLiveChatClient(data).unwrap();
  };

  return {
    onSubmit,
    isSuccess,
    isAddingClient,
    errors: [errorInfoUpdateLc, errorInfoUpload],
    isUploadedImage,
    data,
  };
};
