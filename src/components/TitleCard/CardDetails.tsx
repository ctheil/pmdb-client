import { Title } from "@/models/title"
import { CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { motion } from "framer-motion"

type Props = {
  title: Title
}
export default function CardDetails({ title }: Props) {

  return (
    <div className="row-start-1 col-start-1 relative">
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}

      >
        <CardHeader>
          <img className="absolute top-0 left-0 right-0 bottom-0" src={title.backdrop_path} />
          <CardTitle className="">
            {title.title}
          </CardTitle>
        </CardHeader>
      </motion.div>
      <motion.div>
        <CardContent>
          <CardDescription className="max-w-[50ch]">
            {title.overview}
          </CardDescription>
        </CardContent>
      </motion.div>
    </div>
  )

}
