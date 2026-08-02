/**
 * Input Component
 *
 * @param {string} value - Current input value.
 * @param {Function} onChange - Function called when input value changes.
 * @param {string} placeholder - Placeholder text.
 * @param {string} type - Input type (text, email, password, etc.).
 * @param {string} label - Label displayed above the input field.
 * @param {boolean} darkMode - Enables dark mode styling.
 * @param {string} className - Additional Tailwind CSS classes.
 */

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  label,
  darkMode = false,
  className = "",
}) {
  return (
    <div>
      {label && (
        <label
          className={`block mb-2 font-medium ${
            darkMode ? "text-white" : "text-black"
          }`}
        >
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full
          p-3
          rounded-lg
          border
          transition-all
          duration-200
          ${
            darkMode
              ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400 focus:border-green-500 focus:ring-2 focus:ring-green-500 outline-none"
              : "bg-white border-gray-300 text-black placeholder-gray-500 focus:border-green-600 focus:ring-2 focus:ring-green-600 outline-none"
          }
          ${className}
        `}
      />
    </div>
  );
}

export default Input;