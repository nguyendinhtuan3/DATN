export default function SeedProgressBar({ value, max }) {
  const percent = (value / max) * 100;

  return (
    <div className="h-2 w-full bg-gray-200 rounded-full mt-2 mb-1">
      <div
        style={{ width: `${percent}%` }}
        className="h-full bg-green-500 rounded-full transition-all"
      ></div>
    </div>
  );
}
