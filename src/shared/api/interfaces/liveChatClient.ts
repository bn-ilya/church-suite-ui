import { IAttributesCommonsRes } from "./commons";
import { IFile } from "./upload";

export interface ILiveChatClient {
  name: string,
  city: string,
  tel: number,
  count: number,
  comment?: string,
  cheque?: Array<IFile['id']>
}

export interface IAddLiveChatClientReq {
  data: ILiveChatClient
}

interface IAttributesRes extends ILiveChatClient, IAttributesCommonsRes {}

export interface IAddLiveChatClientRes {
  data: {
    attributes: IAttributesRes,
    id: number
  },
  meta: {},
}

export interface IGetLiveChatClientRes {
  data: {
    attributes: IAttributesRes,
    id: number
  },
  meta: {},
}