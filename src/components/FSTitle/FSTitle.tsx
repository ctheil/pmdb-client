import { Title } from "@/models/title"

type Props = {
  title: Title
}
export default function FSTitle({ title }: Props) {

  return <div className="w-full h-full flex flex-col">
    <div className="w-full mb-auto">
      <img src={title.backdrop_path} className="w-full" />
    </div>
    <div>

    </div>
  </div>

}
