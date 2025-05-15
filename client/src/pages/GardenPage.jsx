import GardenCanvas from "./GardenCanvas";
import GrowthBar from "./GrowthBar";
import WaterButton from "./WaterButton";
import GardenStats from "./GardenStats";

export default function Garden({ userStats }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🌱 Vocabulary Garden</h2>
      <GardenCanvas stage={userStats.plantStage} />
      <GrowthBar value={userStats.exp} max={userStats.nextStageExp} />
      <div className="mt-4 flex items-center gap-4">
        <WaterButton />
        <GardenStats stats={userStats} />
      </div>
    </div>
  );
}
