import { ReactNode, useState, createContext, useContext } from "react";


type VideoMediaType = "Clip" | "Teaser" | "Trailer" | "Extra"
// type PrefOrder = "primary" | "secondary" | "tertiary"
export type VideoMediaTypeOrder = {
  primary: VideoMediaType
  secondary: VideoMediaType,
  tertiary: VideoMediaType,
}

type UserPrefs = {
  videoAutoplay: boolean,
  videoDefaultMuted: boolean,
  videoMediaTypePrefOrder: VideoMediaTypeOrder
  // video: {
  //   autoplay: boolean,
  //   mediaTypePrefOrder: VideoMediaTypeOrder,
  //   defaultMute: boolean
  // }
}
type UserProviderState = {
  userPrefs: UserPrefs
  updatePref: <K extends keyof UserPrefs>(pref: K, value: UserPrefs[K]) => void
}

const defaultPrefs: UserPrefs = {
  videoAutoplay: true,
  videoMediaTypePrefOrder: {
    primary: "Clip",
    secondary: "Teaser",
    tertiary: "Trailer"
  },
  videoDefaultMuted: false
}

const defaultState: UserProviderState = {
  userPrefs: defaultPrefs,
  updatePref: () => null
}

export const UserPreferencesContext = createContext<UserProviderState>(defaultState);

type ProviderProps = {
  children: ReactNode
  prefs?: UserPrefs

}
export function UserPrefsProvider({ children, prefs = defaultPrefs, ...props }: ProviderProps) {
  const [userPrefs, setUserPrefs] = useState(prefs);

  const value = {
    userPrefs,
    updatePref: <K extends keyof UserPrefs>(pref: K, value: UserPrefs[K]) => {
      setUserPrefs({ ...userPrefs, [pref]: value })
    }
  }

  return (

    <UserPreferencesContext.Provider {...props} value={value}>
      {children}
    </UserPreferencesContext.Provider>
  )

}

export const useUserPreferences = () => useContext(UserPreferencesContext)
