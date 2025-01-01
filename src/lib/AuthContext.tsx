import { AuthClient, AuthError } from "@/api/auth"
import axios from "axios"
import { useCallback, useEffect, useState, createContext } from "react"

type UserData = {
  name: string,
  email: string,
  picture: string
}
type AuthProviderState = {
  user: null | UserData,
  loggedIn: boolean
  checkLoginState: () => void
}

const defaultState: AuthProviderState = {
  user: null,
  loggedIn: false,
  checkLoginState: () => { },
}
const AuthContext = createContext<AuthProviderState>(defaultState)

const AuthContextProvider = ({ children }: { children: HTMLElement }) => {

  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)

  const checkLoginState = useCallback(async () => {
    try {
      const loggedIn = await AuthClient.getLoginState()
      if (loggedIn instanceof AuthError) {
        console.error(loggedIn)
        return
      }
      setLoggedIn(loggedIn.loggedIn)
      user && setUser(user)
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    checkLoginState()
  }, [checkLoginState])

  return <AuthContext.Provider value={{ loggedIn, checkLoginState, user }}>
  </AuthContext.Provider>
}

export default AuthContext;


