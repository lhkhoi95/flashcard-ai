import React, { useEffect, useState } from "react";
import { useDotButton } from "./EmblaCarouselDotButton";
import {
  PrevButton,
  NextButton,
  UndoButton,
  usePrevNextButtons,
  ResetButton,
} from "./EmblaCarouselArrowButtons";
import useEmblaCarousel from "embla-carousel-react";
import Image from "next/image";
import Tooltip from "../Tooltip";
import { CORRECT_IMAGE_URL, INCORRECT_IMAGE_URL } from "@/app/lib/constants";

const EmblaCarousel = (props) => {
  const { slides, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [imageUrl, setImageUrl] = useState(null);
  const [displayImage, setDisplayImage] = useState(false);
  const [imageKey, setImageKey] = useState(0);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  function handleIncorrect() {
    setImageUrl(INCORRECT_IMAGE_URL);
    setDisplayImage(true);
    setImageKey((prevKey) => prevKey + 1);
    onNextButtonClick();
  }

  function handleCorrect() {
    setImageUrl(CORRECT_IMAGE_URL);
    setDisplayImage(true);
    setImageKey((prevKey) => prevKey + 1);
    onNextButtonClick();
  }

  function resetCarousel() {
    emblaApi.scrollTo(0);
  }

  useEffect(() => {
    if (displayImage) {
      const timer = setTimeout(() => {
        setDisplayImage(false);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [displayImage, imageKey]);

  return (
    <section>
      <div className="relative overflow-hidden" ref={emblaRef}>
        {displayImage && (
          <Image
            key={imageKey}
            src={`${imageUrl}?${imageKey}`}
            className="absolute left-1/2 top-1/2 z-50 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-inherit md:h-80 md:w-80"
            alt="status"
            unoptimized
            width="512"
            height="512"
          />
        )}
        <div className="h-96">
          {slides.map((obj, index) => {
            return (
              <div className="h-full" key={index}>
                <div className="flex h-full select-none items-center justify-center">
                  {obj}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="relative mx-0 mt-4 md:mx-8">
        <div className="absolute left-0 flex flex-row items-center">
          <Tooltip content="Undo">
            <UndoButton
              onClick={onPrevButtonClick}
              isDisabled={prevBtnDisabled}
            />
          </Tooltip>
          <Tooltip content="Reset">
            <ResetButton onClick={resetCarousel} />
          </Tooltip>
        </div>
        <div className="flex items-center justify-end gap-4 md:justify-center">
          <PrevButton onClick={handleIncorrect} isDisabled={nextBtnDisabled} />
          <div className="w-14 text-center">
            {selectedIndex + 1} / {slides.length}
          </div>
          <NextButton onClick={handleCorrect} isDisabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default EmblaCarousel;
