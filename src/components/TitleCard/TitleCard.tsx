import { useState } from "react";
import { Title } from "../../models/title";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { motion } from "framer-motion";
type Props = {
  title: Title
}

const TitleCard = ({ title }: Props) => {
  // const [hover, setHover] = useState(false)
  const [selected, setSelected] = useState(false)


  return <motion.div drag="x" whileDrag={{ scale: 0.8, rotate: 10 }} dragConstraints={{ left: 0, right: 1000 }} dragElastic={0.9}>
    <Card className="overflow-hidden grid m-5"
      onClick={() => setSelected(!selected)}
    >
      <div className="overflow-hidden col-start-1 row-start-1">
        <img src={title.poster_path} />
      </div>
    </Card>
  </motion.div>
}

export default TitleCard
