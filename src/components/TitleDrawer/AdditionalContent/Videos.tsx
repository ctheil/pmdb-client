import { Video } from "@/models/title";
import { useEffect, useState } from "react";
import { DrawerTitle } from "../../ui/drawer";
import { Button } from "../../ui/button";
import { FaPlay } from "react-icons/fa";

type Props = {
  videos: Video[]
  updateVideo: (key: string) => void
}

function getNumVids(buttons: { [key: string]: Video[] }): number {
  let total = 0;
  for (let key in buttons) {
    total += buttons[key].length
  }
  return total

}

export default function Videos({ videos, updateVideo }: Props) {
  const [vidButtons, setVidButtons] = useState<{ [key: string]: Video[] }>({})

  useEffect(() => {
    if (videos.length < 1) return;
    var buttons = { ...vidButtons };
    let i = 0;
    for (let video of videos) {
      if (i === 0) {
        i++
        continue;
      }

      if (!buttons[video.type]) {
        buttons[video.type] = [];
      }
      buttons[video.type].push(video)
    }
    setVidButtons(buttons)
  }, [])

  return (
    <div className="w-full pt-4">
      <DrawerTitle className="text-sm">Additional Videos: {getNumVids(vidButtons)}</DrawerTitle>
      <div className="pt-4 w-full flex flex-wrap gap-2">
        {Object.keys(vidButtons).map(key => {
          console.log(vidButtons[key].length)
          return <Button
            key={key}
            disabled={vidButtons[key].length < 1}
            variant="ghost"
            className="p-2"
            onClick={() => {
              var buttons = { ...vidButtons };
              var rndVidKey = buttons[key].pop()?.key;
              if (!rndVidKey) {
                return;
              }
              setVidButtons(buttons)
              updateVideo(rndVidKey)
            }
            }>
            <FaPlay className="mr-2" size={10} /> {key}
          </Button>
        })}
      </div>
    </div>
  )
}
