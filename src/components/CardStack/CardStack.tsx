import { useEffect, useState } from "react";
import { Title } from "../../models/title";
import TitleCard from "../TitleCard/TitleCard";
import { PMDB, PMDBError } from "../../api/pmdb-api";
import Spinner from "../Loading/Spinner";

export default function CardStack() {
  const [data, setData] = useState<Title[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<null | PMDBError>(null);


  useEffect(() => {
    async function getData() {
      console.log("getting data...")
      setLoading(true);
      const pmdb = new PMDB()
      const data = await pmdb.getTrendingTitles(true, 5, "movie")
      if (data instanceof PMDBError) {
        setError(data)
      } else {
        setData(data)
      }
      setLoading(false)
    }

    getData()
  }, [])

  console.log(data)


  if (loading) {
    return <Spinner />

  }
  if (error || !data) {
    return <p className="text-red-500 text-xl">{error?.friendlyMessage || "Something went wrong..."}</p>
  }


  return <div className="flex flex-wrap gap-2 items-center justify-center w-full h-full">
    {/* {data.map((title) => <TitleCard key={title.id} title={title} />)} */}
    <TitleCard title={data[0]} />
    {/* <TitleCard title={data[1]} /> */}
  </div>
}
