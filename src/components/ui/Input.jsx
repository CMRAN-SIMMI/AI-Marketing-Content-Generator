/**
 * Input Component
 *
 * @param {string} value - Current input value.
 * @param {Function} onChange - Function called when input value changes.
 * @param {string} placeholder - Placeholder text.
 * @param {string} type - Input type (text, email, password, etc.).
 * @param {string} label - Label displayed above the input field.
 */
function Input({
  value,
  onChange,
  placeholder,
  type = "text",
  label,
}) {
  return (
    <div>
      {label && (
        <label className="block mb-2 font-medium">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full p-2 border rounded-md"
      />
    </div>
  );
}

export default Input;