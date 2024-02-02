import { UseFormSetValue } from "react-hook-form";
import { FormDataToSend } from "../../../model/type";

export interface ISwitchCountClients {
  setIsShowCount: (isSwitch: boolean) => void,
  defaultSelected: boolean,
}