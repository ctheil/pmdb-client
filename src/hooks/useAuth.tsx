import { AuthClient, AuthError } from "@/api/auth";
import { PMDB, PMDBError } from "@/api/pmdb-api";
import { useEffect, useState, useCallback } from "react";

// type User = {
//   username: string
//   email: string
// }
type UserData = {
  name: string,
  email: string,
  picture: string
}
export default function useAuth() {
  const [loggedIn, setLoggedIn] = useState(false)
  const [user, setUser] = useState<UserData | null>(null)

  const checkLoginState = useCallback(async () => {
    try {
      const loggedIn = await AuthClient.getLoginState()
      if (loggedIn instanceof AuthError) {
        console.error(loggedIn)
        return
      }
      console.log(loggedIn)
      setLoggedIn(loggedIn.loggedIn)
      user && setUser(user)
    } catch (err) {
      console.error(err)
    }
  }, [])

  useEffect(() => {
    checkLoginState()
  }, [checkLoginState])

  // useEffect(() => {
  //   async function getData() {
  //     const pmdb = new PMDB()
  //     const user = await pmdb.getUserData()
  //     if (user instanceof PMDBError || !user) {
  //       setUser(null)
  //     } else {
  //       setUser(user)
  //     }
  //   }
  //   getData();
  // })

  return { user, loggedIn, checkLoginState }
}
