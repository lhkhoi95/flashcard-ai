"use client";
import { useState } from "react";

export default function FlashcardHorizontalRotation({ front, back }) {
  return (
    <div className="group h-full w-full [perspective:1000px]">
      <div className="relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-gray-200 p-4 text-center shadow-xl [backface-visibility:hidden]">
          <p className="text-2xl font-bold text-gray-800">{front}</p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-indigo-200 p-4 text-center shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
          <p className="text-2xl font-bold text-indigo-800">{back}</p>
        </div>
      </div>
    </div>
  );
}

export function FlashcardVerticalRotation({ front, back }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div
      className="h-full w-full cursor-pointer px-0 py-4 [perspective:1000px] md:p-8"
      onClick={handleClick}
    >
      <div
        className={`relative h-full w-full transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? "[transform:rotateX(180deg)]" : ""
        }`}
      >
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-emerald-100 p-4 text-center [backface-visibility:hidden] sm:shadow-none md:shadow-xl">
          <p className="text-2xl font-bold text-emerald-800">{front}</p>
        </div>
        <div className="absolute inset-0 flex items-center justify-center rounded-xl bg-amber-100 p-4 text-center [backface-visibility:hidden] [transform:rotateX(180deg)] sm:shadow-none md:shadow-xl">
          <p className="text-2xl font-bold text-amber-800">{back}</p>
        </div>
      </div>
    </div>
  );
}
