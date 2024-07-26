export type WatchProviders = {
  results: { [key: string]: Region }
}
type Region = {
  link: string
  buy: Provider[] | null
  rent: Provider[] | null
  flatrate: Provider[] | null
}

export type Provider = {
  display_priority: number
  logo_path: string
  provider_name: string
  provider_id: number
}
