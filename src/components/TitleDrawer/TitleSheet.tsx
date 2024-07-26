import { Title, TitleDetails } from "@/models/title"
import { useEffect, useState } from "react"
import { PMDB, PMDBError } from "@/api/pmdb-api"
import Hero from "./Hero"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { getVideos } from "./util"
import { useUserPreferences } from "@/lib/UserContext"
import AdditionalContent from "./AdditionalContent"
import { Video } from "@/models/title.video"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "../ui/sheet"

type Props = {
  title: Title
  open: boolean
  handleClose: () => void
}
export default function TitleSheet({ title, open, handleClose }: Props) {
  const [data, setData] = useState<null | TitleDetails>(null)
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false)
  // const [error, setError] = useState<null | PMDBError>(null)
  const [currVid, setCurrVid] = useState<null | string>(null)
  const { userPrefs } = useUserPreferences()


  useEffect(() => {
    async function getData() {
      setLoading(true);
      const pmdb = new PMDB()
      const _data = await pmdb.getDetailsById(title.id, title.title)
      if (_data instanceof PMDBError) {
        // setError(_data)
      } else {
        setData(_data)
        var videos = getVideos(_data.videos.results, userPrefs.videoMediaTypePrefOrder)
        setVideos(videos)
        setCurrVid(videos[0]?.key || null)
      }
      setLoading(false)
    }
    getData()
  }, [])

  function updateVideo(key: string) {
    setCurrVid(key)
  }




  return <Sheet open={open}>
    <SheetContent side="bottom" className="bg-black h-full border-none mt-8">
      <Hero title={title} data={data} year={new Date(title.release_date).getFullYear() + ""} loading={loading} video_key={currVid} />
      <div className="h-full overflow-y-scroll pt-6 pb-20">
        <SheetHeader className="relative flex flex-col text-start">
          {data ?
            <div className="flex gap-1 ml-[-5px] mb-2">
              {
                data.genres.map(genre => <Badge key={genre.id} variant="secondary">{genre.name}</Badge>)
              }
            </div>
            :
            <div className="flex gap-1 ml-[-5px] mb-2">
              <Badge variant="secondary" className="pr-12">&nbsp;</Badge>
              <Badge variant="secondary" className="pr-20">&nbsp;</Badge>
              <Badge variant="secondary" className="pr-12">&nbsp;</Badge>
            </div>
          }
          <SheetTitle className="text-sm">Description</SheetTitle>
          <SheetDescription>{title.overview}</SheetDescription>
          <AdditionalContent videos={videos} updateVideo={updateVideo} cast={data?.credits.cast || null} watchProviders={data?.["watch/providers"] || null} />
        </SheetHeader>
        {/* <SheetFooter> */}
        {/*   <div className="flex gap-3 w-full"> */}
        {/*     <Button className="w-full">Want to see it</Button> */}
        {/*     <Button variant="outline" className="w-full">Seen it</Button> */}
        {/*   </div> */}
        {/*   <Button onClick={handleClose} variant="outline" className="bg-black">Close</Button> */}
        {/*   <div className="p-2"> */}
        {/*     {error && <ErrorSnack error={error} />} */}
        {/*   </div> */}
        {/* </SheetFooter> */}
        <div className="absolute bottom-4 left-4 right-4">
          <Button onClick={handleClose} variant="outline" className="bg-black w-full">Close</Button>
        </div>
      </div>
    </SheetContent>
  </Sheet>

}
