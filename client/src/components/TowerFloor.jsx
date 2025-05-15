import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import getColor from "../utils/getColor";

const TowerFloor = ({ level, onClick, refProp }) => {
  const controls = useAnimation();
  const width = `${100 - level.id * 5}%`;

  useEffect(() => {
    if (level.status === "unlocked") {
      controls.start({
        y: [0, -10, 0],
        transition: { duration: 0.5, repeat: 3, ease: "easeInOut" },
      });
    }
  }, [level.status, level.id]);

  return (
    <motion.div
      ref={refProp}
      animate={controls}
      whileHover={{ scale: level.status !== "locked" ? 1.05 : 1 }}
      className={`h-20 ${getColor(
        level.status
      )} rounded-xl shadow-xl flex items-center justify-center cursor-pointer`}
      style={{ width }}
      onClick={() => level.status !== "locked" && onClick(level)}
    >
      <p className="text-white font-bold">{level.name}</p>
    </motion.div>
  );
};

export default TowerFloor;
