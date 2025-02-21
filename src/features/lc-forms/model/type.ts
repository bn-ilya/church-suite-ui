import { IUploadFile } from "@/src/shared/api";
import { ILiveChatClientChildren } from "@/src/shared/api/interfaces/liveChatClientChildren";

export interface FormDataReceived {
  id: number;
  city: string;
  count: number;
  live_chat_client_childrens: ILiveChatClientChildren[];
  comment?: string;
  files?: FileList;
  senderName?: string;
  cheques?: Array<string>;
}

export interface FormDataToSend {
  city: string;
  count: number;
  childrens?: Array<string>;
  comment?: string;
  files?: FileList;
  senderName?: string;
  cheques?: Array<IUploadFile["id"]>;
}
