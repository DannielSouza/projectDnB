import React, { useState } from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface TextareaProps {
  id: string;
  label: string;
  disabled?: boolean;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const Textarea: React.FC<TextareaProps> = ({
  id,
  label,
  disabled,
  required,
  register,
  errors,
}) => {
  const [isEmpty, setIsEmpty] = useState(false);

  const verifyEmptyInput = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setIsEmpty(e.target.value === "");
  };

  return (
    <div className="w-full relative">
      <textarea
        id={id}
        disabled={disabled}
        {...register(id, { required })}
        onBlur={verifyEmptyInput}
        placeholder=" "
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
      -translate-y-3
      top-6
      z-10
      origin-[0]
      left-4
      peer-placeholder-shown:scale-100
      peer-placeholder-shown:translate-y-0
      peer-focus:scale-75
      peer-focus:-translate-y-4
      ${errors[id] ? "text-rose-500" : "text-zinc-400"}
      ${!isEmpty ? "scale-75 -translate-y-4" : ""}
      `}
        htmlFor={id}
      >
        {label}
      </label>
    </div>
  );
};

export default Textarea;
