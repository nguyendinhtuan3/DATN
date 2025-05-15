import PlantGrowthStage from "./PlantGrowthStage";
import SeedProgressBar from "./SeedProgressBar";

export default function SeedCard({ seed, onClick }) {
  const learnedCount = seed.words.filter((w) => w.learned).length;
  const total = seed.words.length;
  const progress = (learnedCount / total) * 100;
  const stage = Math.floor(progress / 25); // 0-4 level

  return (
    <div
      onClick={() => onClick(seed)}
      className="bg-white p-4 rounded-xl shadow hover:scale-105 transition cursor-pointer"
    >
      <PlantGrowthStage level={stage} />
      <h4 className="mt-2 font-semibold text-center">{seed.name}</h4>
      <SeedProgressBar value={learnedCount} max={total} />
      <p className="text-xs text-gray-500 text-center">
        {learnedCount}/{total} từ đã học
      </p>
    </div>
  );
}
