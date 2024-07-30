import axios, { AxiosError } from "axios";
import { Title, TitleDetails, TitleRes } from "../models/title";
import { TUser, User } from "@/models/user";

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
      const res = await axios.get(this.baseUrl + `/titles/trending?domain=${domain}&include_images=${include_images}&image_size=${image_size}`, {
        withCredentials: true
      })
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
      const res = await axios.get(this.baseUrl + `/titles/details/${id}?include=cvp`, {
        withCredentials: true
      })
      const result: TitleDetails = res.data.results;
      // const titles = results.map(t => new Title(t))
      return result;
    } catch (_err) {
      console.error(_err)
      const err = _err as AxiosError
      return new PMDBError(err, `Error getting details for ${name} from the server`)
    }
  }

  // async getUser(): Promise<TUser, PMDBError> {
  async getUserData(): Promise<TUser | null | PMDBError> {
    try {
      const res = await axios.get(this.baseUrl + `/user/`, {
        withCredentials: true
      })
      console.log("getUserData", res.data)
      const userData: TUser = {
        username: res.data?.username,
        email: res.data?.email,
      }
      if (!userData.email || !userData.username) {
        return null
      }
      return userData
    } catch (_err) {
      console.error("[getUser]: error: ", _err)
      const err = _err as AxiosError
      console.warn("[getUser]: error: ", err.message)
      return new PMDBError(err, `Error getting user`)
    }

  }
  async login(email: string, password: string): Promise<boolean | PMDBError> {
    try {
      const res = await axios.post(this.baseUrl + `/auth/login/`, {
        email, password
      },
      )
      return res.status === 200
    } catch (_err) {
      const err = _err as AxiosError
      console.error("[getUser]: error: ", err.message)
      return new PMDBError(err, `Error getting user`)
    }


  }

}
