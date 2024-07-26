import { useState } from "react";
import { Title } from "../../models/title";
import { Card } from "../ui/card";
import { motion } from "framer-motion";
import { FaInfoCircle } from "react-icons/fa";
import TitleDrawer from "../TitleDrawer/TitleDrawer";
type Props = {
  title: Title | undefined
  swipe: "left" | "right" | "up" | null
}


const swipeVariants = {
  left: { x: 1000, opacity: 0, rotate: 90 },
  right: { x: -1000, opacity: 0, rotate: -90 },
  up: { y: -1000, opacity: 0 },
}

const TitleCard = ({ title, swipe }: Props) => {
  const [selected, setSelected] = useState(false)

  if (!title) return;

  return (

    <motion.div
      key={title.id}
      initial={{ opacity: 1, x: 0, y: 0 }}
      animate={swipe ? swipeVariants[swipe] : {}}
      exit={swipe ? swipeVariants[swipe] : {}}
      transition={{ duration: 0.5 }}
      // layout
      drag="x"
      whileDrag={{ scale: 0.8, rotate: 10 }}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.9}
      dragMomentum={false}
      className="row-start-1 col-start-1"
    >
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
        <TitleDrawer title={title} open={selected} setOpen={setSelected} handleClose={() => setSelected(false)} />
      }
    </motion.div>
  )
}

export default TitleCard
