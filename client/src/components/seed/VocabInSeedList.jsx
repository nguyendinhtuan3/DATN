export default function VocabInSeedList({ seed }) {
  return (
    <ul className="space-y-2 mt-4">
      {seed.words.map((w, i) => (
        <li key={i} className="flex justify-between p-2 rounded bg-gray-100">
          <span>{w.word}</span>
          <span
            className={`text-sm ${
              w.learned ? "text-green-600" : "text-gray-400"
            }`}
          >
            {w.learned ? "✔ Đã học" : "📖 Chưa học"}
          </span>
        </li>
      ))}
    </ul>
  );
}
