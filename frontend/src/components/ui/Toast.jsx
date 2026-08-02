/**
 * Toast Component
 *
 * @param {string} message - Message displayed in toast
 * @param {string} type - Toast type (success or error)
 * @param {Function} onClose - Function called when toast closes
 */
import { useEffect } from "react";

function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className={`fixed top-5 right-5 px-4 py-2 rounded-md text-white shadow-md ${
        type === "success" ? "bg-green-600" : "bg-red-500"
      }`}
    >
      {message}
    </div>
  );
}

export default Toast;