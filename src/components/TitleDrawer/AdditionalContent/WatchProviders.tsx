import { DrawerTitle } from "@/components/ui/drawer"
import { useUserPreferences } from "@/lib/UserContext"
import { WatchProviders as TWatchProviders, Provider } from "@/models/title.provider"
import { FaCheckCircle } from "react-icons/fa"

type Props = {
  providers: TWatchProviders
}

function combineWithoutDups(a: Provider[], b: Provider[]): Provider[] {
  var out = [];
  var seen: { [key: number]: boolean } = {};

  for (let p of a) {
    seen[p.provider_id] = true;
    out.push(p);
  }
  for (let p of b) {
    if (!seen[p.provider_id]) {
      out.push(p)
    }
  }
  return out;
};

export default function WatchProviders({ providers }: Props) {
  const { userPrefs } = useUserPreferences();

  let purchase: Provider[] = []
  let rent = providers.results[userPrefs.providerRegion]?.rent || []
  let buy = providers.results[userPrefs.providerRegion]?.buy || []
  if (userPrefs.region === "any") {
  } else if (!providers.results?.[userPrefs.providerRegion]) {
    return <DrawerTitle className="text-sm">Not currently available in your region...</DrawerTitle>
  }

  purchase = combineWithoutDups(rent, buy)
  let flatrate = providers.results[userPrefs.providerRegion].flatrate
  let subs = [];
  if (flatrate) {
    for (let p of flatrate) {
      if (userPrefs.providers[p.provider_id]) {
        subs.push(p)
      }
    }
  }

  if (purchase.length < 1 && subs.length < 1) {
    return <DrawerTitle className="text-sm">Not currently available in your region or on your subscriptions...</DrawerTitle>

  }


  return <div className="flex flex-col gap-3">
    <DrawerTitle className="text-sm pb-1">Where to Watch: </DrawerTitle>
    {subs.length > 0 &&
      <>
        <div className="flex gap-4 overflow-x-scroll">
          {subs.map((r) => <div key={r.provider_id} className="overflow-hidden rounded-md max-w-20 relative">
            <img src={r.logo_path} />
            <FaCheckCircle className="absolute bottom-1 left-1 text-green-300 drop-shadow-md" />
          </div>)}
        </div>
      </>
    }
    <DrawerTitle className="text-xs text-muted-foreground">Rent / Buy</DrawerTitle>
    {purchase.length > 0 &&
      <div className="flex gap-4 overflow-x-scroll">
        {purchase.map((r) => <div key={r.provider_id} className="overflow-hidden rounded-md max-w-20 relative">
          <img className="" src={r.logo_path} />
        </div>)}
      </div>
    }
  </div>

}
