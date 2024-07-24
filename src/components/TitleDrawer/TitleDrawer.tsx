import { Title, TitleDetails } from "@/models/title"
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle, DrawerTrigger } from "../ui/drawer"
import { useEffect, useState } from "react"
import { Loader2 } from "lucide-react"
import { PMDB, PMDBError } from "@/api/pmdb-api"
import ErrorStack from "../Error/ErrorSnack"
import ErrorSnack from "../Error/ErrorSnack"
import { FaThumbsUp } from "react-icons/fa"
import Hero from "./Hero"
import { Badge } from "../ui/badge"

type Props = {
  title: Title
  open: boolean
  handleClose: () => void
}
export default function TitleDrawer({ title, open, handleClose }: Props) {
  const [data, setData] = useState<null | TitleDetails>(null)
  const [video, setVideo] = useState<null | string>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<null | PMDBError>(null)

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
        let vid_key = ""
        console.log("found videos...", _data.videos)
        for (let video of _data.videos.results) {
          console.log("vid ", video.site)
          if (video.site === "YouTube") {

            setVideo(video.key)
            break;
          }
        }

      }
      setLoading(false)
    }
    getData()
  }, [])

  console.log(data)


  var release_date = new Date(title.release_date)

  return <Drawer open={open} onClose={handleClose}>
    <DrawerContent className="overflow-hidden">
      <Hero title={title} data={data} year={release_date.getFullYear() + ""} video_embed_id={video} loading={loading} />
      <DrawerHeader className="relative flex flex-col text-start">
        {data &&
          <div className="flex gap-1 ml-[-5px] mb-2">
            {
              data.genres.map(genre => <Badge variant="secondary">{genre.name}</Badge>)
            }
          </div>
        }
        <DrawerTitle className="text-sm">Description</DrawerTitle>
        <DrawerDescription>{title.overview}</DrawerDescription>
      </DrawerHeader>
      <div className="p-2">
        {error && <ErrorSnack error={error} />}
      </div>
    </DrawerContent>
  </Drawer>

}
