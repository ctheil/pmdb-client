import { Title, TitleDetails } from "@/models/title"
import { Loader2 } from "lucide-react"
import { DrawerDescription, DrawerTitle } from "../ui/drawer"
import { FaClock, FaPlay, FaThumbsUp } from "react-icons/fa"
import { useState } from "react"
import { YoutubePreview } from "./VideoPreview"
import { motion, AnimatePresence } from "framer-motion"
import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io"
import { useUserPreferences } from "@/lib/UserContext"

type Props = {
  title: Title
  loading: boolean
  year: string
  data: TitleDetails | null
  video_key: string | null
}


type VideoState = "loading" | "playing" | "finished" | "paused"
export default function Hero({ title, year, data, video_key }: Props) {
  const [fullscreen, _] = useState(false);
  // const [media, setMedia] = useState<Video[]>([])
  const { userPrefs } = useUserPreferences()
  const [vidState, setVidState] = useState<VideoState>(userPrefs.videoAutoplay ? "loading" : "paused")
  const [playback, setPlayback] = useState({ muted: userPrefs.videoDefaultMuted })

  // useEffect(() => {})

  function handleSetVidState(state: VideoState) {
    setVidState(state)
  }

  function handleMute(muted: boolean) {
    setPlayback({ muted: muted })
  }


  return (
    <div className="grid">
      <div className="row-start-1 col-start-1 shadow-red-500">
        {vidState !== "playing" &&
          <div className="mt-[-1.5rem] row-start-1 col-start-1 grid">
            <img src={title.backdrop_path} className="w-full h-full max-h-[194.25px] row-start-1 col-start-1" />
            {video_key &&
              <div className="row-start-1 col-start-1 w-full h-full flex items-center justify-center bg-black/30">
                {!userPrefs.videoAutoplay && vidState === "paused" ?
                  <FaPlay onClick={() => setVidState("loading")} size={30} className="shadow-inner" />
                  :
                  <Loader2 className="h-w w-4 animate-spin font-black" />
                }
              </div>
            }
          </div>
        }
        {vidState !== "finished" && video_key &&
          <YoutubePreview muted={playback.muted} handleSetVidState={handleSetVidState} embed_id={video_key} fullscreen={fullscreen} autoplay={!userPrefs.videoAutoplay ? vidState !== "paused" : true} />
        }
      </div>
      <div
        className="row-start-1 col-start-1 mt-auto bg-gradient-to-t from-black to-black/0 pl-4 pr-4 z-10 pt-10">
        <AnimatePresence>
          <motion.div
            key={1}
            layout
            className="flex gap-1 items-center pb-1">
            {vidState === "playing" &&
              <motion.div
                key={2}
                layout
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 'auto', opacity: 1 }}
                transition={{ delay: 0.3, transition: 10 }}
              >
                {
                  playback.muted ? <IoMdVolumeOff className="size-6 text-muted-foreground" onClick={() => handleMute(false)} /> :
                    <IoMdVolumeHigh className="size-6 text-muted-foreground" onClick={() => handleMute(true)} />
                }
              </motion.div>
            }
            <DrawerTitle className="text-ellipsis overflow-hidden whitespace-nowrap">{title.title}</DrawerTitle>
            {/* {vidState === "playing" && */}
            {/*   <MdFullscreen className="size-6 text-muted-foreground ml-auto" onClick={() => { */}
            {/*     setFullscreen(!fullscreen) */}
            {/*   } */}
            {/*   } /> */}
            {/* } */}
          </motion.div>
          {vidState !== "playing" &&
            <motion.div
              initial={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="flex gap-3">
              {data &&
                <>
                  <div className="flex items-center gap-1">
                    <FaClock className="text-muted-foreground" />
                    <DrawerDescription className="text-md">{data.runtime}</DrawerDescription>
                  </div>
                  <div className="flex items-center gap-1">
                    <FaThumbsUp className="text-muted-foreground" />
                    <DrawerDescription className="text-md">{Math.floor(data.vote_average * 10)}%</DrawerDescription>
                  </div>
                </>
              }
              <DrawerDescription className="text-md">{year}</DrawerDescription>

            </motion.div>
          }
        </AnimatePresence>
      </div>
    </div>
  )

}
