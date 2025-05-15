import SeedCard from "./SeedCard";

export default function SeedGrid({ seeds, onSelectSeed }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {seeds.map((seed) => (
        <SeedCard key={seed.id} seed={seed} onClick={onSelectSeed} />
      ))}
    </div>
  );
}
