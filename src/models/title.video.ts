
export type Video = {
  name: string
  key: string
  site: string
  size: number
  official: boolean
  published_at: string
  id: string
  type: string
}
export type Videos = {
  id: number
  results: Video[]
}
