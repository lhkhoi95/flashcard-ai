import React, { Suspense } from "react";
import CardSets from "../../components/flashcards/Cards";
import { Container } from "@/app/components/ui/craft";
import { CardsSkeleton } from "@/app/components/Skeletons";

export default function FlashcardSets() {
  return (
    <Container className="min-h-screen">
      <h1 className="mb-12 mt-24 text-3xl font-bold">Your Flashcard Sets</h1>
      <Suspense fallback={<CardsSkeleton />}>
        <CardSets />
      </Suspense>
    </Container>
  );
}
