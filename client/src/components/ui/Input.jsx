export default function Input({ label, ...props }) {
  return (
    <div className="flex flex-col gap-1 mb-3">
      {label && <label className="text-sm font-semibold">{label}</label>}
      <input
        {...props}
        className="p-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
