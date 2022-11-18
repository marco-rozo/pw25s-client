import { ChangeEvent } from "react";

interface IInputProps {
  name: string;
  className: string;
  classNameLabel?: string;
  label: string;
  type: string;
  placeholder?: string;
  value: string;
  hasError?: boolean;
  error?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({
  name,
  className,
  classNameLabel = "",
  label,
  type,
  placeholder = "",
  value,
  hasError = false,
  error = "",
  onChange,
}: IInputProps) {
  return (
    <>
      {label && (
        <label className="block text-sm font-semibold text-gray-800">
          {label}
        </label>
      )}
      <input
        type={type}
        className={className}
        onChange={onChange}
        value={value}
        name={name}
        placeholder={placeholder}
      />
      {hasError && (
        <div className="text-red-700 font-extralight  text-xs">{error}</div>
      )}
    </>
  );
}
