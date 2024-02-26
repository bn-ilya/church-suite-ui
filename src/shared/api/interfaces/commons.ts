import { IFile } from "./entities/file"

export interface IAttributesCommonsRes {
  createdAt: string,
  updatedAt: string,
  publishedAt: string
}

export interface IMeta {
  pagination?: {
    page: number,
    pageCount: number,
    pageSize: number,
    total: number
  }
}

export interface IError {
  data: null,
  error: {
    status: number,
    name: string,
    message: string,
    details: {}
  }
}

export interface IDataCheque {
  id: number,
  attributes: IFile
}

export type TApiChannel = "voice" | "sms"; 