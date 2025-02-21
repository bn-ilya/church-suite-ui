import { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

export interface IChecksInfoProps extends InputHTMLAttributes<HTMLInputElement> {
  defaultNames?: Array<string>
  refCallback?: (e: HTMLInputElement | null) => void
  defaultSenderName?: string
  registerSenderName?: UseFormRegisterReturn<"senderName"> 
}