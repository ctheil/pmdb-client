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
