/**
 * Modal Component
 *
 * @param {boolean} isOpen - Controls modal visibility
 * @param {string} title - Modal title
 * @param {React.ReactNode} children - Content displayed inside modal
 * @param {Function} onClose - Function called when modal closes
 */
function Modal({ isOpen, title, children, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">{title}</h2>

        {children}

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default Modal;