import { Skeleton } from "@/components/ui/skeleton";

export default function ACSkeleton() {
  return <div className="pt-4">
    <Skeleton className="w-full h-2" />
    <div className="w-full flex gap-3 pt-4">
      <Skeleton className="w-[80px] h-[40px]" />
      <Skeleton className="w-[77px] h-[40px]" />
      <Skeleton className="w-[104px] h-[40px]" />
    </div>

    <Skeleton className="w-20 h-3 mt-6" />
    <div className="w-full flex gap-3 pt-4">
      {new Array(7).fill("").map(() =>
        <Skeleton className="w-[32px] h-[32px]" />
      )}
    </div>

    <Skeleton className="w-12 h-3 mt-6" />
    <div className="w-full flex gap-3 pt-4">
      {new Array(10).fill("").map(() =>
        <div className="flex flex-col items-center max-w-[100px]">
          <Skeleton className="w-[72px] h-[112px]" />
          <Skeleton className="w-[90%] h-3 mt-1" />
        </div>
      )}
    </div>


  </div>
}
