import { AuthClient } from "@/api/auth"
import useAuth from "@/hooks/useAuth"
import AuthContext from "@/lib/AuthContext"
import { useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Callback = () => {
  const called = useRef(false)
  const { checkLoginState, loggedIn } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    ; (async () => {
      if (loggedIn === false) {
        try {
          if (called.current) return
          called.current = true
          const res = AuthClient.getAuthTokens(window.location.search)
          checkLoginState()
          navigate("/")
        } catch (err) {
          console.error(err)
          navigate("/")
        }
      } else if (loggedIn) {
        navigate("/")
      }
    })()
  }, [checkLoginState, loggedIn, navigate])

  return <></>
}

export default Callback
