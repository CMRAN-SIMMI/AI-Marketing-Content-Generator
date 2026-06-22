/**
 * Input Component
 *
 * @param {string} value - Current input value
 * @param {Function} onChange - Function called when input changes
 * @param {string} placeholder - Placeholder text
 * @param {string} type - Input type (text, email, password, etc.)
 * @param {string} label - Label displayed above input
 */
function Input({ value, onChange, placeholder }) {
  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="w-full p-2 border rounded-md"
    />
  );
}

export default Input;