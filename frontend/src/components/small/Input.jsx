import { useRef, useState } from "react";

export default function Input({ label, name, isRequired = false, ...props }) {
  const input = useRef();
  const [error, setError] = useState("");

  const handleBlur = () => {
    if (isRequired && !input.current.value) {
      setError(`${label} is required`);
    } else {
      setError("");
    }
  };

  return (
    <div className="grid sm:grid-cols-12 gap-2">
      <label htmlFor={name} className="sm:col-span-3">
        {label}
      </label>
      <input
        id={name}
        className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm sm:col-span-9"
        name={name}
        ref={input}
        onBlur={handleBlur}
        {...props}
      />
      {error && (
        <span className="text-red-500 text-sm sm:col-span-12">{error}</span>
      )}
    </div>
  );
}
