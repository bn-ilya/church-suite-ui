import { InputHTMLAttributes } from "react";

export interface IUploadInputProps extends InputHTMLAttributes<HTMLInputElement> {
  defaultNames?: Array<string>
  refCallback?: (e: HTMLInputElement | null) => void
}