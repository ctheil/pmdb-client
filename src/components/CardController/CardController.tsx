import { ReactNode } from "react";
import { FaHeart } from "react-icons/fa";
import { MdClose, MdPlaylistAdd } from "react-icons/md";

type Props = {
  handleUpdateStack: (method: "LIKE" | "DISLIKE" | "ENLIST") => void
}
export default function CardController({ handleUpdateStack }: Props) {
  return <div className="w-full flex gap-10 items-center justify-center mt-auto">
    <ActionButton onClick={() => handleUpdateStack("DISLIKE")}>
      <MdClose size={40} className="text-red-400" />
    </ActionButton>
    <ActionButton onClick={() => handleUpdateStack("ENLIST")}>
      <MdPlaylistAdd size={30} className="text-slate-500" />
    </ActionButton>
    <ActionButton onClick={() => handleUpdateStack("LIKE")}>
      <FaHeart size={40} className="text-red-400" />
    </ActionButton>
  </div>
}

function ActionButton({ children, onClick }: { children: ReactNode, onClick?: () => void }) {
  return <button onClick={onClick} className="p-4 rounded-[50%] bg-slate-800 light:bg-slate-200 flex items-center justify-center">{children}</button>
}
