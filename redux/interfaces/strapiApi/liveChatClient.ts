import { IAttributesCommonsRes } from "./commons.interface";
import { IFile } from "./upload.interface";

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
    attributes: IAttributesRes
  },
  meta: {},
}