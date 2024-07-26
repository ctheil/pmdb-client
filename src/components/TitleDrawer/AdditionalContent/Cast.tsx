import { DrawerTitle } from "@/components/ui/drawer";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Credit as TCredit } from "@/models/title.credit";

type Props = {
  cast: TCredit[]
}
export default function Cast({ cast }: Props) {
  const data = cast.slice(0, 10);

  return <div className="flex flex-col">
    <DrawerTitle className="text-sm">Cast</DrawerTitle>
    <ScrollArea className="">
      <div className="flex w-max p-4 pl-0 space-x-4">
        {data.map(c => {
          if (!c.profile_path) return
          return <Credit key={c.name} data={c} />
        }
        )}

      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  </div>

}

function Credit({ data }: { data: TCredit }) {

  if (!data.profile_path) return;

  return <div className="flex items-center flex-col max-w-[100px]">
    <div className="w-[75px] h-auto object-cover rounded-md overflow-hidden">
      <img
        src={data.profile_path}
        className=""
      />
    </div>
    <div className="flex flex-col items-center text-center mt-2 max-h-[20px]">
      <p className="text-xs text-muted-foreground">{data.name}</p>
    </div>
  </div>

}
