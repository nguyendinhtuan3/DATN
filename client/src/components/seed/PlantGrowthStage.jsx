const stages = [
  "/plants/seed.png",
  "/plants/sprout.png",
  "/plants/young.png",
  "/plants/mature.png",
  "/plants/bloom.png",
];

export default function PlantGrowthStage({ level = 0 }) {
  return (
    <img
      src={stages[level]}
      alt={`Stage ${level}`}
      className="w-20 h-20 mx-auto object-contain"
    />
  );
}
