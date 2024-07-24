import { useState } from "react";
import { Title } from "../../models/title";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";
import TitleDrawer from "../TitleDrawer/TitleDrawer";
type Props = {
  title: Title
}

const TitleCard = ({ title }: Props) => {
  const [selected, setSelected] = useState(false)


  return <motion.div className="row-start-1 col-start-1" drag="x" whileDrag={{ scale: 0.8, rotate: 10 }} dragConstraints={{ left: 0, right: 1000 }} dragElastic={0.9} dragMomentum={false}>
    <Card className="overflow-hidden grid m-5 relative"
      onClick={() => setSelected(!selected)}
    >
      <div className="overflow-hidden col-start-1 row-start-1 relative">
        <img src={title.poster_path} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-black/0 p-5 pb-5 flex ">
        <FaInfoCircle className="size-7 ml-auto font-bold" onClick={() => setSelected(!selected)} />
      </div>
    </Card>
    {selected &&
      <TitleDrawer title={title} open={selected} handleClose={() => setSelected(false)} />
    }
  </motion.div>
}

export default TitleCard
