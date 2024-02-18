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