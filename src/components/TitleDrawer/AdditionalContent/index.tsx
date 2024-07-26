import { Video, Credit } from "@/models/title"
import Videos from "./Videos"
import Cast from "./Cast"

type Props = {
  videos: Video[]
  updateVideo: (key: string) => void
  cast: Credit[] | null
}

export default function AdditionalContent({ videos, updateVideo, cast }: Props) {
  return (
    <div className="flex-col gap-8 flex">
      {
        videos.length > 1 &&
        <Videos videos={videos} updateVideo={updateVideo} />
      }
      {cast && <Cast cast={cast} />}
    </div>
  )
}
