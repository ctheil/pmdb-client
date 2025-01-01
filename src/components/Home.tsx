import useAuth from "@/hooks/useAuth"
import CardStack from "./CardStack/CardStack"
import OAuthLogin from "./Auth/OAuthLogin"
import { createBrowserRouter } from "react-router-dom"
import Callback from "./Auth/Callback"

const Home = () => {
  const { loggedIn, user, checkLoginState } = useAuth()
  console.log("[home]: loggedIn:", loggedIn, "user: ", user)
  if (loggedIn) return <CardStack />
  if (!loggedIn) return <OAuthLogin />

  return <></>
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/auth/callback",
    element: <Callback />
  }
])

export default router
