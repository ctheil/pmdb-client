import { VideoMediaTypeOrder } from "@/lib/UserContext"
import { Video } from "@/models/title"

type VMedia = {
  primary: Video[]
  secondary: Video[]
  tertiary: Video[]
  else: Video[]
}

export function getVideos(videos: Video[] | null, mediaTypePrefOrder: VideoMediaTypeOrder): Video[] {
  var media: VMedia = {
    primary: [],
    secondary: [],
    tertiary: [],
    else: [],
  }
  if (!videos) return []
  for (let video of videos) {
    switch (video.type) {
      case mediaTypePrefOrder.primary:
        media.primary.push(video);
        break;
      case mediaTypePrefOrder.secondary:
        media.secondary.push(video);
        break;
      case mediaTypePrefOrder.tertiary:
        media.tertiary.push(video);
        break;
      default:
        media.else.push(video)
    }
  }

  return [...media.primary, ...media.secondary, ...media.tertiary, ...media.else]
}
