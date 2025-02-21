import { IUploadFile } from "@/src/shared/api";

export interface FormDataReceived {
  id: number,
  city: string,
  count: number,
  comment?: string,
  files?: FileList,
  senderName?: string,
  cheques?: Array<string> 
}

export interface FormDataToSend {
  city: string,
  count: number,
  childrens?: Array<string>
  comment?: string,
  files?: FileList,
  senderName?: string,
  cheques?: Array<IUploadFile['id']>
}