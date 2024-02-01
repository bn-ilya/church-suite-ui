import { IUploadFile } from "@/src/shared/api";

export interface FormDataReceived {
  name: string,
  city: string,
  tel: number,
  count: number,
  comment?: string,
  files?: FileList,
  cheques?: Array<string> 
}

export interface FormDataToSend {
  name: string,
  city: string,
  tel: number,
  count: number,
  comment?: string,
  files?: FileList,
  cheques?: Array<IUploadFile['id']>
}