import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface DateInputProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Date: React.FC<DateInputProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
}) => {
  return (
    <div className="w-full relative">
      <input
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        type="date"
        className={`
          peer
          w-full
          p-4
          pt-6
          font-light
          bg-white
          border-2
          rounded-md
          outline-none
          transition
          disabled:opacity-70
          disabled:cursor-not-allowed
          pl-4
          ${errors[id] ? "border-rose-500" : "border-neutral-300"}
          ${errors[id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
      <label
        className={`
        absolute
        text-md
        duration-150
        transform
        top-6
        z-10
        origin-[0]
        left-4
        placeholder-shown:scale-100
        placeholder-shown:translate-y-0
        scale-75
        -translate-y-4
        ${errors[id] ? "text-rose-500" : "text-zinc-400"}
      `}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Date;
