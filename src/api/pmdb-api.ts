import axios, { AxiosError } from "axios";
import { Title, TitleDetails, TitleRes } from "../models/title";

export class PMDBError {
  code: number
  message: string
  friendlyMessage: string
  error: Error

  constructor(error: AxiosError, friendlyMessage?: string) {
    let code = error.code || 500
    if (typeof (code) === "string") {
      code = parseInt(code);
    }
    this.code = code
    this.message = error.message;
    this.friendlyMessage = friendlyMessage || "Something went wrong..."
    this.error = error
  }
}

type Domain = "movie" | "tv" | "person"

export class PMDB {
  baseUrl: string
  version: string
  constructor() {
    this.version = "v1"
    // this.baseUrl = `http://localhost:8080/${this.version}`
    this.baseUrl = `http://10.0.0.218:8080/${this.version}`

  }

  async getTrendingTitles(include_images: boolean, image_size = 0, domain: Domain = "movie"): Promise<Title[] | PMDBError> {
    try {
      const res = await axios.get(this.baseUrl + `/titles/trending?domain=${domain}&include_images=${include_images}&image_size=${image_size}`)
      const results: TitleRes[] = res.data.results;
      const titles = results.map(t => new Title(t))
      return titles;
    } catch (_err) {
      console.error(_err)
      const err = _err as AxiosError
      return new PMDBError(err, `Error getting trending ${domain}s from the server`)
    }

  }

  async getDetailsById(id: number, name: string): Promise<TitleDetails | PMDBError> {
    try {
      const res = await axios.get(this.baseUrl + `/titles/details/${id}?include=cvp`)
      const result: TitleDetails = res.data.results;
      // const titles = results.map(t => new Title(t))
      return result;
    } catch (_err) {
      console.error(_err)
      const err = _err as AxiosError
      return new PMDBError(err, `Error getting details for ${name} from the server`)
    }
  }

}
