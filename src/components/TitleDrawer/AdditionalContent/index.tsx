import Videos from "./Videos"
import Cast from "./Cast"
import { WatchProviders as TWatchProviders } from "@/models/title.provider"
import { Video } from "@/models/title.video"
import { Credit } from "@/models/title.credit"
import WatchProviders from "./WatchProviders"
import { ReactNode } from "react"
import { Separator } from "@/components/ui/separator"

type Props = {
  videos: Video[]
  updateVideo: (key: string) => void
  cast: Credit[] | null
  watchProviders: TWatchProviders | null
}

export default function AdditionalContent({ videos, updateVideo, cast, watchProviders }: Props) {
  return (
    <div className="flex-col gap-0 flex">
      {
        videos.length > 1 &&
        <ContentWrapper>
          <Videos videos={videos} updateVideo={updateVideo} />
        </ContentWrapper>
      }
      {watchProviders &&
        <ContentWrapper>
          <WatchProviders providers={watchProviders} />
        </ContentWrapper>
      }
      {cast &&
        <ContentWrapper>
          <Cast cast={cast} />
        </ContentWrapper>
      }
    </div>
  )
}

function ContentWrapper({ children }: { children: ReactNode }) {
  return <div className="w-full pt-4">
    <Separator className="mb-4 opacity-50" />
    {children}
  </div>
}
