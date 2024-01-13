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

export type TFiles = IFile[]

export interface IFile {
  id: number
  name: string
  alternativeText: string | null
  caption: string | null
  width: number
  height: number
  formats: Formats
  hash: string
  ext: string
  mime: string
  size: number
  url: string
  previewUrl: string | null
  provider: string
  provider_metadata: string | null
  createdAt: string
  updatedAt: string
}

interface Formats {
  thumbnail: Thumbnail
  small: Small
  medium: Medium
}

interface Thumbnail {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  url: string
}

interface Small {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  url: string
}

interface Medium {
  name: string
  hash: string
  ext: string
  mime: string
  path: string | null
  width: number
  height: number
  size: number
  url: string
}
