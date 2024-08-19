"use client";
import React from "react";
import TopicGetter from "./TopicGetter";
import FlashcardsPreview from "./FlashcardsPreview";

export default function Flashcards() {
  const [flashcards, setFlashcards] = React.useState([]);

  return (
    <div className="mt-24 max-h-fit min-h-screen w-full">
      <TopicGetter setFlashcards={setFlashcards} />
      {flashcards.length > 0 && <FlashcardsPreview flashcards={flashcards} />}
    </div>
  );
}
