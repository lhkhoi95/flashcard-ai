import React from "react";
import FlashcardHorizontalRotation from "./Flashcard";

export default function FlashcardsGrid({ flashcards }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
      {flashcards.map((flashcard, index) => {
        return (
          <div key={index} className="h-56">
            <FlashcardHorizontalRotation
              front={flashcard.front}
              back={flashcard.back}
            />
          </div>
        );
      })}
    </div>
  );
}
