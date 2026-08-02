/**
 * Button Component
 */

function Button({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
}) {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={`
        px-4
        py-3
        rounded-lg
        font-semibold
        text-white
        transition-all
        duration-200
        shadow-md
        ${
          disabled
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-green-600 hover:bg-green-700 hover:shadow-lg"
        }
        ${className}
      `}
    >
      {children}
    </button>
  );
}

export default Button;