import { IUploadFile } from "@/src/shared/api";

export interface FormDataReceived {
  city: string,
  count: number,
  comment?: string,
  files?: FileList,
  cheques?: Array<string> 
}

export interface FormDataToSend {
  city: string,
  count: number,
  comment?: string,
  files?: FileList,
  cheques?: Array<IUploadFile['id']>
}