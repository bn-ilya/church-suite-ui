export interface IEvent {
  id: number,
  attributes: {
      name: string,
      date: string,
      createdAt: string,
      updatedAt: string,
      publishedAt: string
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