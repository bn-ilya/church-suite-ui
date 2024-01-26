import { InputHTMLAttributes } from "react";

export interface IUploadInputProps extends InputHTMLAttributes<HTMLInputElement> {
  refCallback?: (e: HTMLInputElement | null) => void
}