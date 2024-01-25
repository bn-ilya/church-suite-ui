import { LiveChatFormData } from "@/utils/types/LiveChatFormData.interface";
import { InputHTMLAttributes } from "react";
import { UseFormRegister } from "react-hook-form";

export interface IFormUploadInputProps extends InputHTMLAttributes<HTMLInputElement> {
  ref?: (e: HTMLInputElement | null) => void
}