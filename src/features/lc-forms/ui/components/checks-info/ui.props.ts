import { InputHTMLAttributes } from "react";

export interface IChecksInfoProps extends InputHTMLAttributes<HTMLInputElement> {
  defaultNames?: Array<string>
  refCallback?: (e: HTMLInputElement | null) => void
}