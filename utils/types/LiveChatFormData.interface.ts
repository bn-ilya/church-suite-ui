import { IFile } from "@/src/app/providers/store-provider/interfaces/strapiApi/upload.interface";

export interface LiveChatFormData {
  name: string,
  city: string,
  tel: number,
  count: number,
  comment?: string,
  files?: FileList,
  cheque?: Array<IFile['id']>
}