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