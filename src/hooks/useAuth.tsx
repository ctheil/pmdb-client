import { PMDB, PMDBError } from "@/api/pmdb-api";
import { useEffect, useState } from "react";

type User = {
  username: string
  email: string
}
export default function useAuth() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    async function getData() {
      const pmdb = new PMDB()
      const user = await pmdb.getUserData()
      if (user instanceof PMDBError || !user) {
        setUser(null)
      } else {
        setUser(user)
      }
    }
    getData();
  })

  return { user }
}
