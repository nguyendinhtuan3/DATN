import React from "react";
import { motion } from "framer-motion";

const RewardPopup = ({ onClose }) => (
  <motion.div
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-xl z-50 border-4 border-yellow-400"
  >
    <h2 className="text-2xl font-bold text-center text-yellow-500">
      🎉 Rewards Unlocked!
    </h2>
    <p className="text-center mt-2">
      You've earned <b>+100 EXP</b> and <b>+50 Coins</b> 🎁
    </p>
    <button
      onClick={onClose}
      className="mt-4 block mx-auto px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
    >
      OK
    </button>
  </motion.div>
);

export default RewardPopup;
