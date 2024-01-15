import { IAttributesCommonsRes } from "./commons.interface"

export interface IEvent extends IAttributesCommonsRes {
  id: number,
  attributes: {
      name: string,
      date: string
  }
}

interface IMetaPagination {
  page: number,
  pageSize: number,
  pageCount: number,
  total: number,
}

interface IMeta {
  pagination: IMetaPagination
}

export interface IEvents {
  data: Array<IEvent>,
  meta: IMeta
}