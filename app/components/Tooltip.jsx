"use client";
import React, { useState } from "react";

const Tooltip = ({ content, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setIsVisible(true)}
        onMouseLeave={() => setIsVisible(false)}
      >
        {children}
      </div>
      {isVisible && (
        <div className="absolute bottom-full left-1/2 z-50 -translate-x-1/2 -translate-y-2 transform rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-black shadow-sm">
          {content}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
