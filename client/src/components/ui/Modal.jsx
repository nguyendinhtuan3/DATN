export default function Modal({ show, onClose, title, children }) {
  if (!show) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-[90%] max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div>{children}</div>
        <button
          onClick={onClose}
          className="mt-4 text-blue-500 hover:underline"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
