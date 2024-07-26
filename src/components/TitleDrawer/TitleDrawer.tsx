import { Title, TitleDetails, Video } from "@/models/title"
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer"
import { useEffect, useState } from "react"
import { PMDB, PMDBError } from "@/api/pmdb-api"
import ErrorSnack from "../Error/ErrorSnack"
import Hero from "./Hero"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { getVideos } from "./util"
import { useUserPreferences } from "@/lib/UserContext"
import AdditionalContent from "./AdditionalContent"

type Props = {
  title: Title
  open: boolean
  handleClose: () => void
}
export default function TitleDrawer({ title, open, handleClose }: Props) {
  const [data, setData] = useState<null | TitleDetails>(null)
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | PMDBError>(null)
  const [currVid, setCurrVid] = useState<null | string>(null)
  const { userPrefs } = useUserPreferences()


  useEffect(() => {
    async function getData() {
      console.log("getting details...")
      setLoading(true);
      const pmdb = new PMDB()
      const _data = await pmdb.getDetailsById(title.id, title.title)
      if (_data instanceof PMDBError) {
        setError(_data)
      } else {
        setData(_data)
        console.log(_data)
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




  return <Drawer open={open} onClose={handleClose}>
    <DrawerContent className="overflow-hidden bg-black">
      <Hero title={title} data={data} year={new Date(title.release_date).getFullYear() + ""} loading={loading} video_key={currVid} />
      <DrawerHeader className="relative flex flex-col text-start">
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
        <DrawerTitle className="text-sm">Description</DrawerTitle>
        <DrawerDescription>{title.overview}</DrawerDescription>
        <AdditionalContent videos={videos} updateVideo={updateVideo} cast={data?.credits.cast || null} />
      </DrawerHeader>
      <DrawerFooter>
        {/* <DrawerClose asChild> */}
        <div className="flex gap-3 w-full">
          <Button className="w-full">Want to see it</Button>
          <Button variant="outline" className="w-full">Seen it</Button>
        </div>
        <Button onClick={handleClose} variant="outline" className="bg-black">Close</Button>
        {/* </DrawerClose> */}
        <div className="p-2">
          {error && <ErrorSnack error={error} />}
        </div>
      </DrawerFooter>
    </DrawerContent>
  </Drawer>

}
