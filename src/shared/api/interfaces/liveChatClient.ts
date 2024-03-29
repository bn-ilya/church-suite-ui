import { IAttributesCommonsRes, IDataCheque, IMeta } from "./commons";
import { IUploadFile } from './upload';

export interface ILiveChatClient {
  city: string,
  count: number,
  comment?: string,
  cheques?: Array<IUploadFile['id']>,
}

export interface IAddLiveChatClientReq {
  data: ILiveChatClient
}

export interface IUpdateClientReq {
  body: ILiveChatClient
  id: number
}

interface IAttributesRes extends ILiveChatClient, IAttributesCommonsRes {}

interface IAttributesPopulateRes extends Omit<ILiveChatClient, 'cheques'>, IAttributesCommonsRes {
  cheques: {
    data: Array<IDataCheque> | null
  },
}

export interface IAddLiveChatClientRes {
  data: {
    attributes: IAttributesRes,
    id: number
  },
  meta: {},
}

export interface IUpdateLiveChatClientRes {
  data: {
    attributes: IAttributesRes,
    id: number
  },
  meta: {},
}

export interface IDeleteLiveChatClientRes {
  data: {
    attributes: IAttributesRes,
    id: number
  },
  meta: {},
}

export interface IGetLiveChatClientDataRes {
  attributes: IAttributesPopulateRes,
  id: number
}

export interface IGetLiveChatClientRes {
  data: IGetLiveChatClientDataRes,
  meta: IMeta,
}

export interface IGetLiveChatClientByCodeRes {
  data: Array<IGetLiveChatClientDataRes>,
  meta: IMeta,
}