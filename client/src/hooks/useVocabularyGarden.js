import { useState } from "react";
import { seeds as initialSeeds } from "../seeders/seedData";

export function useVocabularyGarden() {
  const [seeds, setSeeds] = useState(initialSeeds);

  // Đánh dấu một từ là đã học
  const markWordAsLearned = (seedId, wordIndex) => {
    setSeeds((prevSeeds) =>
      prevSeeds.map((seed) => {
        if (seed.id !== seedId) return seed;

        const updatedWords = [...seed.words];
        updatedWords[wordIndex] = {
          ...updatedWords[wordIndex],
          learned: true,
        };

        return { ...seed, words: updatedWords };
      })
    );
  };

  // Tính tiến độ và cấp độ phát triển cây
  const getSeedProgress = (seed) => {
    const learnedCount = seed.words.filter((w) => w.learned).length;
    const total = seed.words.length;
    const progress = total > 0 ? (learnedCount / total) * 100 : 0;
    const stage = Math.floor(progress / 25); // 0–4
    return { progress, stage, learnedCount, total };
  };

  return {
    seeds,
    markWordAsLearned,
    getSeedProgress,
  };
}
