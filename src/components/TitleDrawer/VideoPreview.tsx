import { useState } from "react"
import ReactPlayer from "react-player"

type Props = {
  embed_id: string
  handleSetVidState: (state: "loading" | "playing" | "finished") => void
  muted: boolean
  fullscreen: boolean
  autoplay: boolean
}
export function YoutubePreview({ embed_id, handleSetVidState, muted, fullscreen, autoplay }: Props) {
  const [ready, setReady] = useState(false)


  return <div style={{ display: !ready ? "none" : "" }} className={`w-full h-full mt-[-1.5rem] row-start-1 col-start-1 grid z-0`} onMouseEnter={() => console.log("mouse enter")} >
    <div className="relative">
      <ReactPlayer
        config={{
          youtube: {
            playerVars: {
              'showInfo': 0,
              'cc_load_policy': 1,
              'iv_load_policy': 1
            }
          }
        }}
        width={"100%"}
        height={194.25}
        className="row-start-1 col-start-1 relative"
        url={`https://www.youtube.com/embed/${embed_id}`}
        // controls={false}
        volume={50}
        muted={muted}
        playing={autoplay}
        onPlay={() => {
          handleSetVidState("playing")
          setReady(true)
        }}
        onEnded={() => handleSetVidState("finished")}
        fullscreen={fullscreen}

      />

      {/* <div className="absolute bottom-2 right-4 z-[1000]"> */}
      {/*   {muted ? <IoMdVolumeOff className="size-6" onClick={() => setMuted(false)} /> : <IoMdVolumeHigh className="size-6" onClick={() => setMuted(true)} />} */}
      {/* </div> */}
    </div>

  </div>



}
