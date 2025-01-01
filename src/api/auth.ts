import axios, { AxiosError } from "axios"

export class AuthError {
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


// type UserData = {
//   email: string,
//   name: string,
//   picture: string
// }
const VERSION = "v1"
const BASE_URL: string = `http://localhost:8080/${VERSION}`

export class AuthClient {
  constructor() { }


  public static async getLoginState(): Promise<{ loggedIn: boolean } | AuthError> {
    try {
      const { data } = await axios.get(`${BASE_URL}/oauth/logged_in`)

      return data

    } catch (_err) {
      console.error(_err)
      const err = _err as AxiosError
      return new AuthError(err, `Error getting logged in state`)
    }
  }

  public static async login(): Promise<undefined | AuthError> {
    try {
      const resp = await axios.get(`${BASE_URL}/oauth/url`)
      console.log("login!", resp)
      //naviage to consent screen
      window.location.assign(resp.data.url)
    } catch (_err) {
      console.error(_err)
      const err = _err as AxiosError
      return new AuthError(err, `Error getting oauth login url.`)
    }
  }

  public static async getAuthTokens(params: string): Promise<void | AuthError> {
    try {
      const res = await axios.get(`${BASE_URL}/oauth/token${params}`)
      console.log("response: ", res)
    } catch (_err) {
      console.error(_err)
      const err = _err as AxiosError
      return new AuthError(err, `Error fetching oauth token`)
    }
  }
}
