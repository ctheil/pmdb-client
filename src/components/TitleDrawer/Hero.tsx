import { Title, TitleDetails } from "@/models/title"
import { Loader2 } from "lucide-react"
import { DrawerDescription, DrawerTitle } from "../ui/drawer"
import { FaClock, FaThumbsUp } from "react-icons/fa"
import { useEffect, useState } from "react"
import { YoutubePreview } from "./VideoPreview"
import { motion, AnimatePresence } from "framer-motion"
import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io"

type Props = {
  title: Title
  loading: boolean
  video_embed_id: null | string
  year: string
  data: TitleDetails | null
}

type VideoState = "loading" | "playing" | "finished"
export default function Hero({ title, loading, video_embed_id, year, data }: Props) {
  const [vidState, setVidState] = useState<VideoState>("loading")
  const [playback, setPlayback] = useState({ muted: true })

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
          <img src={title.backdrop_path} className="mt-[-1.5rem] row-start-1 col-start-1" />
        }
        {vidState !== "finished" && video_embed_id &&
          <YoutubePreview muted={playback.muted} handleSetVidState={handleSetVidState} embed_id={video_embed_id} />
        }
      </div>
      {loading || vidState === "loading" &&
        <div className="flex w-full h-full items-center justify-center bg-black/30 mt-[-1.5rem] row-start-1 col-start-1">
          <Loader2 className="h-w w-4 animate-spin font-black" />
        </div>
      }
      <div
        className="row-start-1 col-start-1 mt-auto bg-gradient-to-t from-slate-950 to-slate-950/0 pl-4 pr-4 z-10 pt-10">
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
            <DrawerTitle className="">{title.title}</DrawerTitle>
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
