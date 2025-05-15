import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";

const FloorDetail = ({ level, onClose }) => {
  const { t } = useTranslation();

  if (!level) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 50, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white p-4 rounded-xl shadow-xl z-20 max-w-sm w-full"
        role="dialog"
        aria-labelledby="floor-title"
        aria-describedby="floor-desc"
      >
        <h2 id="floor-title" className="font-bold text-lg">
          {level.name || t("floorDetail.title", { id: level.id })}
        </h2>
        <p id="floor-desc" className="text-sm text-gray-600">
          {t("floorDetail.description", { id: level.id })}
        </p>
        <button
          onClick={onClose}
          className="mt-3 text-blue-500 hover:underline focus:outline-none focus:ring-2 focus:ring-blue-300 rounded"
        >
          {t("common.close")}
        </button>
      </motion.div>
    </AnimatePresence>
  );
};

export default FloorDetail;
