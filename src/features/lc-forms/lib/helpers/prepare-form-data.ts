import { IGetLiveChatClientRes } from "@/src/shared/api";
import { FormDataReceived } from "../../../lc-edit-form/model/type";

export function prepareFormData(data: IGetLiveChatClientRes['data']): FormDataReceived {
  
  if (!data.attributes.cheques.data) {
    const {cheques, ...prepareData} = data.attributes;
    return prepareData;
  }

  const cheques = data.attributes.cheques.data.map((check) => {
    return check.attributes.name;
  })

  const prepareData: FormDataReceived = {...data.attributes, cheques};
  return prepareData;
}