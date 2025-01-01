import { AuthClient } from "@/api/auth";

export default function OAuthLogin() {


  return <div>
    <button onClick={() => AuthClient.login()}>Login With Google</button>
  </div>
}
