export default function Modal({ children }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="rounded-lg bg-white p-6">{children}</div>
    </div>
  );
}
