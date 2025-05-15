import ItemCard from "./ItemCard";

export default function Inventory({ items = [], onUse }) {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">🎒 My Inventory</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {items.length === 0 ? (
          <p className="text-gray-500">You don’t have any items yet.</p>
        ) : (
          items.map((item) => (
            <ItemCard key={item.id} item={item} onUse={onUse} />
          ))
        )}
      </div>
    </div>
  );
}
