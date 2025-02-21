import { IAttributesCommonsRes, IDataCheque, IMeta } from "./commons";
import { ILiveChatClientChildren } from "./liveChatClientChildren";
import { IUploadFile } from "./upload";

export interface ILiveChatClient {
  city: string;
  count: number;
  live_chat_client_childrens?: ILiveChatClientChildren[];
  comment?: string;
  cheques?: Array<IUploadFile["id"]>;
  senderName?: string;
}

export interface ILiveChatClientReq {
  city: string;
  count: number;
  live_chat_client_childrens?: Array<number>;
  comment?: string;
  cheques?: Array<IUploadFile["id"]>;
  senderName?: string;
}

export interface IAddLiveChatClientReq {
  data: ILiveChatClient;
}

export interface IUpdateClientReq {
  body: ILiveChatClient;
  id: number;
}

interface IAttributesRes extends ILiveChatClient, IAttributesCommonsRes {}

interface IAttributesPopulateRes
  extends Omit<ILiveChatClient, "cheques">,
    IAttributesCommonsRes {
  cheques: {
    data: Array<IDataCheque> | null;
  };
}

export interface IAddLiveChatClientRes {
  data: {
    attributes: IAttributesRes;
    id: number;
  };
  meta: {};
}

export interface IUpdateLiveChatClientRes {
  data: {
    attributes: IAttributesRes;
    id: number;
  };
  meta: {};
}

export interface IDeleteLiveChatClientRes {
  data: {
    attributes: IAttributesRes;
    id: number;
  };
  meta: {};
}

export interface IGetLiveChatClientDataRes {
  attributes: IAttributesPopulateRes;
  id: number;
}

export interface IGetLiveChatClientRes {
  data: IGetLiveChatClientDataRes;
  meta: IMeta;
}

export interface IGetLiveChatClientByCodeRes {
  data: Array<IGetLiveChatClientDataRes>;
  meta: IMeta;
}
