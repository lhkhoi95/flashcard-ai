import React from "react";
import { cn } from "../lib/utils";

export default function Input({
  label,
  id,
  error,
  center,
  className,
  ...props
}) {
  return (
    <div
      className={`mx-4 w-full md:mx-0 ${center ? "text-center" : "text-left "}`}
    >
      {label && (
        <label className="mr-4" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        className={cn("rounded-lg focus:outline-none", className)}
        id={id}
        {...props} // Spread the props like type, name, value, etc.
      />
      <div className="pt-2 text-red-500">{error && <p>{error}</p>}</div>
    </div>
  );
}

export function InputIcon({ children, id, error, classes, ...props }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <input
          className={`rounded-lg border-2 border-gray-300 focus:border-blue-300 focus:outline-none ${classes}`}
          id={id}
          {...props} // Spread the props like type, name, value, etc.
        />
        {/* Render the icon */}
        <span className="w-fit">{children}</span>
      </div>
      <div className="pt-2 text-red-500">{error && <p>{error}</p>}</div>
    </div>
  );
}
