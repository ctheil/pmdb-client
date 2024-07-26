import { Credits } from "./title.credit";
import { WatchProviders } from "./title.provider";
import { Videos } from "./title.video";

export type TitleRes = {
  type: string;
  id: number
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  release_date: string
  runtime: number
  status: string
  title: string
  backdrop_path: string
}

export class Title {
  type: string;
  id: number
  original_language: string
  original_title: string
  overview: string
  poster_path: string
  release_date: string
  runtime: number
  status: string
  title: string
  backdrop_path: string

  constructor(
    title: {
      type: string,
      id: number,
      original_language: string,
      original_title: string,
      overview: string,
      poster_path: string,
      release_date: string,
      runtime: number,
      status: string,
      title: string
      backdrop_path: string
    }) {


    this.type = title.type;
    this.id = title.id
    this.original_language = title.original_language
    this.original_title = title.original_title
    this.overview = title.overview
    this.poster_path = title.poster_path
    this.release_date = title.release_date
    this.runtime = title.runtime
    this.status = title.status
    this.title = title.title
    this.backdrop_path = title.backdrop_path
  }
}



export type TitleDetails = {
  adult: boolean
  backdrop_path: string
  belongs_to_collection: {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  }
  budget: number
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  id: number
  imdb_id: string
  origin_country: string
  original_title: string
  overview: string
  popularity: string
  poster_path: string
  production_companies: {
    id: string
    logo_path: string
    origin_country: string
  }[]
  release_date: string
  runtime: number
  status: string
  vote_average: number
  vote_count: number
  videos: Videos
  credits: Credits
  "watch/providers": WatchProviders
}

