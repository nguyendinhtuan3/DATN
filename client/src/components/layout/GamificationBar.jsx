import ProgressBar from "../ui/ProgressBar";

export default function GamificationBar({ level, exp, nextLevelExp, coin }) {
  return (
    <div className="bg-white shadow-md rounded-xl p-4 flex justify-between items-center">
      <div className="flex flex-col">
        <span className="text-sm text-gray-500">Level {level}</span>
        <ProgressBar value={exp} max={nextLevelExp} />
        <span className="text-xs text-gray-400">
          {exp}/{nextLevelExp} EXP
        </span>
      </div>
      <div className="flex items-center gap-1">
        <img src="/coin.svg" alt="coin" className="w-6 h-6" />
        <span className="font-semibold text-yellow-600">{coin}</span>
      </div>
    </div>
  );
}
