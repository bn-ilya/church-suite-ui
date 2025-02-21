import { SubmitHandler } from "react-hook-form";
import { FormDataToSend } from "../type";
import {
  ILiveChatClient,
  useAddLiveChatClientChildrenBulkMutation,
  useAddLiveChatClientMutation,
  useSetLcFormMutation,
  useUploadImageMutation,
} from "@/src/shared/api";
import { useEffect, useState } from "react";
import { useErrorReq } from "@/src/shared/model";
import { countUsersByDefault } from "../constatns";

export const useRegOnSubmit = ({ disabled }: { disabled: boolean }) => {
  const [uploadImage, { isLoading: isUploadedImage, error: errorUpload }] =
    useUploadImageMutation();
  const [
    addLiveChatClient,
    { isLoading: isAddingClient, data, error: errorAddLc },
  ] = useAddLiveChatClientMutation();
  const [
    addLiveChatClientChildrenBulk,
    { isLoading: isAddingClientChildrens },
  ] = useAddLiveChatClientChildrenBulkMutation();
  const [setLcForm, { isLoading: isLoadingSetLcForm, error: errorSetLc }] =
    useSetLcFormMutation();
  const [isSuccess, setSuccess] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const errorInfoUpload = useErrorReq(errorUpload);
  const errorInfoAddLc = useErrorReq(errorAddLc);
  const errorInfoSetLc = useErrorReq(errorSetLc);

  const onSubmit: SubmitHandler<FormDataToSend> = async (formData) => {
    if (disabled) return;
    if (!formData.count) {
      formData.count = countUsersByDefault;
      if (formData.childrens?.length) {
        formData.count = countUsersByDefault + formData.childrens?.length;
      }
    }

    const { files, childrens, ...liveChatClientData } = formData;
    const data: ILiveChatClient = liveChatClientData;

    if (files?.length) {
      const res = await uploadImage(files).unwrap();
      data.cheques = res.map((file) => file.id);
    }

    if (childrens?.length) {
      const dataChildrens = childrens.map((child) => ({ name: child }));
      const res = await addLiveChatClientChildrenBulk(dataChildrens).unwrap();
      data.live_chat_client_childrens = res.data.map((child) => child.id);
    }

    const response = await addLiveChatClient(data).unwrap();
    await setLcForm({ lcFormId: response.data.id });
    setSuccess(true);
  };

  useEffect(() => {
    if (
      isUploadedImage ||
      isAddingClient ||
      isLoadingSetLcForm ||
      isAddingClientChildrens
    ) {
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [
    isUploadedImage,
    isAddingClient,
    isLoadingSetLcForm,
    isAddingClientChildrens,
  ]);

  return {
    onSubmit,
    isSuccess,
    isLoading,
    errors: [errorInfoUpload, errorInfoAddLc, errorInfoSetLc],
    data,
  };
};
