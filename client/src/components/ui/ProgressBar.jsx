export default function ProgressBar({ value, max = 100 }) {
  const percent = Math.min((value / max) * 100, 100);
  return (
    <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden">
      <div
        className="h-full bg-gradient-to-r from-green-400 to-blue-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}
