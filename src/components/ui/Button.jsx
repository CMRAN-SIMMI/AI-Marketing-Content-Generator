/**
 * Button Component
 *
 * @param {React.ReactNode} children - Content displayed inside button
 * @param {Function} onClick - Function called when button is clicked
 * @param {string} type - HTML button type
 * @param {boolean} disabled - Disables button when true
 */

function Button({ children, onClick, type = "button", disabled = false }) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`px-4 py-2 rounded-md text-white transition ${
        disabled
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {children}
    </button>
  );
}

export default Button;