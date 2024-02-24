import { IGetMeResLcForm } from "@/src/shared/api";
import { FormDataReceived } from "../../model/type";

export function prepareFormData(data: IGetMeResLcForm): FormDataReceived {
  if (!data.cheques) {
    const {cheques, ...prepareData} = data;
    return prepareData;
  }

  const cheques = data.cheques.map((check) => {
    return check.name;
  })

  const prepareData: FormDataReceived = {...data, cheques};
  return prepareData;
}