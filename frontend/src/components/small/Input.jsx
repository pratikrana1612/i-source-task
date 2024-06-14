export default function Input({ label, name, ...props }) {
  return (
    <div className="grid sm:grid-cols-12">
      <label htmlFor={name} className="sm:col-span-3">
        {label}
      </label>
      <input
        id={name}
        className="px-4 py-3 bg-gray-100 focus:bg-transparent w-full text-sm outline-[#333] rounded-sm  sm:col-span-9"
        name={name}
        {...props}
      />
    </div>
  );
}
