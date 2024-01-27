import { IFile } from "@/src/shared/api/interfaces";

export interface FormData {
  name: string,
  city: string,
  tel: number,
  count: number,
  comment?: string,
  files?: FileList,
  cheque?: Array<IFile['id']>
}