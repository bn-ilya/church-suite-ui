import { IAttributesCommonsRes, IDataCheque, IMeta } from "./commons";

export interface ILiveChatClientChildren {
  name: string
}

interface IAttributesRes extends ILiveChatClientChildren, IAttributesCommonsRes {}

export interface IAddLiveChatClientChildrenBulkRes {
  data: {
    attributes: IAttributesRes,
    id: number
  }[],
  meta: {},
}
