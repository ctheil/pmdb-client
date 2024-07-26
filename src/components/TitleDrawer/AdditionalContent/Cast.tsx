import { DrawerTitle } from "@/components/ui/drawer";
import { Credit as TCredit } from "@/models/title"

type Props = {
  cast: TCredit[]
}
export default function Cast({ cast }: Props) {
  const data = cast.slice(0, 10);

  return <div className="flex flex-col ">
    <DrawerTitle className="text-sm pb-4">Cast</DrawerTitle>
    <div className="flex flex-nowrap gap-4 overflow-x-scroll pb-3">
      {data.map(c => <Credit data={c} />)}

    </div>
  </div>

}

function Credit({ data }: { data: TCredit }) {

  if (!data.profile_path) return;

  return <div className="">
    <div className="w-[75px] h-[75px] object-cover rounded-[50%] overflow-hidden">
      <img
        src={data.profile_path}
      // className="object-cover"
      />
    </div>
    <div className="flex flex-col items-center text-center mt-2">
      <p className="text-xs">{data.name}</p>
      <p className="text-xs text-muted-foreground" >{data.character}</p>
    </div>
  </div>

}
