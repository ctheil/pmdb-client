import { Title, TitleDetails } from "@/models/title"
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "../ui/drawer"
import { useEffect, useState } from "react"
import { PMDB, PMDBError } from "@/api/pmdb-api"
import ErrorSnack from "../Error/ErrorSnack"
import Hero from "./Hero"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { getVideos } from "./util"
import { useUserPreferences } from "@/lib/UserContext"
import AdditionalContent from "./AdditionalContent"
import { Video } from "@/models/title.video"
import ACSkeleton from "./AdditionalContent/ACSkeleton"
import { Skeleton } from "../ui/skeleton"

type Props = {
  title: Title
  open: boolean
  setOpen: (open: boolean) => void
  handleClose: () => void
}
export default function TitleDrawer({ title, open, setOpen }: Props) {
  const [data, setData] = useState<null | TitleDetails>(null)
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | PMDBError>(null)
  const [currVid, setCurrVid] = useState<null | string>(null)
  const { userPrefs } = useUserPreferences()


  useEffect(() => {
    async function getData() {
      setLoading(true);
      const pmdb = new PMDB()
      const _data = await pmdb.getDetailsById(title.id, title.title)
      if (_data instanceof PMDBError) {
        setError(_data)
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



  return <Drawer open={open} onOpenChange={setOpen}>
    <DrawerContent className="bg-black overflow-hidden max-h-[90dvh]">
      <Hero title={title} data={data} year={new Date(title.release_date).getFullYear() + ""} loading={loading} video_key={currVid} />
      <div
        className="h-full overflow-y-scroll pb-[8rem]"
      >
        <DrawerHeader className="relative flex flex-col text-start pt-0">
          <div className="sticky top-0 left-0 right-0 h-8 ml-[-1rem] mr-[-1rem] bg-gradient-to-b from-black to-black/0" />
          {data ?
            <div className="flex gap-1 ml-[-5px] mb-2">
              {
                data.genres.map(genre => <Badge key={genre.id} variant="secondary">{genre.name}</Badge>)
              }
            </div>
            :
            <div className="flex gap-1 ml-[-5px] mb-2">
              {new Array(4).fill("").map(() => <Skeleton className="w-[59px] h-[22px] rounded-lg" />)}
            </div>
          }
          <DrawerTitle className="text-sm">Description</DrawerTitle>
          <DrawerDescription>{title.overview}</DrawerDescription>
          {data ?
            <AdditionalContent videos={videos} updateVideo={updateVideo} cast={data?.credits.cast || null} watchProviders={data?.["watch/providers"] || null} />
            :
            <ACSkeleton />
          }
        </DrawerHeader>
        <DrawerFooter>
          <div className="absolute bottom-0 left-0 right-0 h-[8rem] bg-gradient-to-t from-black to-black/0" />
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex gap-3 w-full">
              <Button className="w-full">Want to see it</Button>
              <Button variant="outline" className="w-full">Seen it</Button>
            </div>
            <DrawerClose asChild>
              <Button
                variant="outline"
                className="bg-black w-full mt-2">Close</Button>
            </DrawerClose>
            <div className="p-2">
              {error && <ErrorSnack error={error} />}
            </div>
          </div>
        </DrawerFooter>
      </div>
    </DrawerContent>
  </Drawer >

}
