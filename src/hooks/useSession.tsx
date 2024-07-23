import { useState } from "react";

export default function useSession(data: Titles[]) {
  const [titles, setTitles] = useState()

  return { titles }

}
