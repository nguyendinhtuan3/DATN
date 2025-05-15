import { GiPlantSeed, GiMagicPotion } from "react-icons/gi";
import { FaKey } from "react-icons/fa";

export default function ItemCard({ item, onUse }) {
  const getIcon = (type) => {
    switch (type) {
      case "seed":
        return <GiPlantSeed className="text-green-500 text-2xl" />;
      case "booster":
        return <GiMagicPotion className="text-purple-500 text-2xl" />;
      case "key":
        return <FaKey className="text-yellow-500 text-xl" />;
      default:
        return null;
    }
  };

  return (
    <div
      className="border rounded-xl p-4 shadow hover:shadow-lg cursor-pointer transition-all hover:scale-[1.02] bg-white"
      onClick={() => onUse && onUse(item)}
    >
      <div className="flex justify-between items-center mb-2">
        <div className="flex gap-2 items-center">
          {getIcon(item.type)}
          <h3 className="font-bold text-lg">{item.name}</h3>
        </div>
        <span className="text-xs bg-gray-100 px-2 py-0.5 rounded">
          x{item.quantity}
        </span>
      </div>

      <p className="text-sm text-gray-600">{item.description}</p>
    </div>
  );
}
