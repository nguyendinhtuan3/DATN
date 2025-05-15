import React, { useRef, useState } from "react";
import TowerFloor from "../components/TowerFloor";
import RewardPopup from "../components/RewardPopup";
import FloorDetail from "../components/FloorDetail";
import levels from "../data/levels";
import { AnimatePresence } from "framer-motion";

const TowerPage = () => {
  const [selected, setSelected] = useState(null);
  const [showReward, setShowReward] = useState(false);
  const levelRefs = useRef({});

  const handleClick = (level) => {
    setSelected(level);

    if (level.status === "unlocked") {
      levelRefs.current[level.id]?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });

      setTimeout(() => setShowReward(true), 600);
    }
  };

  return (
    <div className="relative">
      <div className="flex flex-col-reverse items-center gap-3 p-6">
        {levels.map((level) => (
          <TowerFloor
            key={level.id}
            level={level}
            onClick={handleClick}
            refProp={(el) => (levelRefs.current[level.id] = el)}
          />
        ))}
      </div>

      <AnimatePresence>
        {selected && (
          <FloorDetail level={selected} onClose={() => setSelected(null)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showReward && <RewardPopup onClose={() => setShowReward(false)} />}
      </AnimatePresence>
    </div>
  );
};

export default TowerPage;
