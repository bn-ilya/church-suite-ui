import { IAttributesCommonsRes } from "./commons";
import { IFile } from "./entities/file";
import { IUploadFile } from './upload';

export interface ILiveChatClient {
  name: string,
  city: string,
  tel: number,
  count: number,
  comment?: string,
  cheques?: Array<IUploadFile['id']>
}

export interface IAddLiveChatClientReq {
  data: ILiveChatClient
}

export interface IUpdateClientReq {
  body: ILiveChatClient
  id: number
}

interface IAttributesRes extends ILiveChatClient, IAttributesCommonsRes {}

interface IDataCheque {
  id: number,
  attributes: IFile
}

interface IAttributesPopulateRes extends Omit<ILiveChatClient, 'cheques'>, IAttributesCommonsRes {
  cheques: {
    data: Array<IDataCheque> | null
  }
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

export interface IGetLiveChatClientRes {
  data: {
    attributes: IAttributesPopulateRes,
    id: number
  },
  meta: {},
}