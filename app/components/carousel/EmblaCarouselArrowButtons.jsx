import React, { useCallback, useEffect, useState } from "react";

import { X, Check, Undo, RotateCcw } from "lucide-react";

export const usePrevNextButtons = (emblaApi) => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};

export const PrevButton = ({ children, isDisabled, ...props }) => {
  const styles = `rounded-full border-2 border-gray-200 p-0 md:p-1 hover:bg-red-200 ${
    isDisabled ? "text-gray-300" : "text-red-500"
  }`;
  return (
    <button className={styles} type="button" disabled={isDisabled} {...props}>
      <X className="size-12" />
      {children}
    </button>
  );
};

export const NextButton = ({ children, isDisabled, ...props }) => {
  const styles = `rounded-full border-2 border-gray-100 p-0 md:p-1 hover:bg-green-200 ${
    isDisabled ? "text-gray-300" : "text-green-500"
  }`;
  return (
    <button className={styles} type="button" disabled={isDisabled} {...props}>
      <Check className="size-12" />
      {children}
    </button>
  );
};

export const UndoButton = ({ children, isDisabled, ...props }) => {
  const styles = `rounded-full p-2 hover:bg-gray-200 ${
    isDisabled ? "text-gray-300" : "text-black"
  }`;
  return (
    <button className={styles} type="button" disabled={isDisabled} {...props}>
      <Undo className="size-6 md:size-6" />
      {children}
    </button>
  );
};

export const ResetButton = ({ children, isDisabled, ...props }) => {
  const styles = `rounded-full p-2 hover:bg-gray-200 ${
    isDisabled ? "text-gray-300" : "text-black"
  }`;
  return (
    <button className={styles} type="button" disabled={isDisabled} {...props}>
      <RotateCcw className="size-4 md:size-6" />
      {children}
    </button>
  );
};
