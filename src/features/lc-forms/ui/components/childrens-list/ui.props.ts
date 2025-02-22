import { Dispatch, SetStateAction } from "react";
import { UseFormRegister, UseFormUnregister } from "react-hook-form";
import { FormDataToSend } from "../../../model/type";

export interface IChildrensListProps {
  countChildrens: number;
  setCountChildrens: Dispatch<SetStateAction<number>>;
  setIsShowCount: Dispatch<SetStateAction<boolean>>;
  register: UseFormRegister<FormDataToSend>;
  unregister: UseFormUnregister<FormDataToSend>;
}
