"use client";
import React from "react";
import { Container } from "../ui/craft";
import { titleCase } from "@/app/lib/helpers";
import { FlashcardVerticalRotation } from "./Flashcard";
import EmblaCarousel from "../carousel/EmblaCarousel";
import FlashcardsGrid from "./FlashcardsGrid";
import { Button } from "../ui/button";
import { ChevronLeft, Dices, MoveLeft, Pencil, Trash } from "lucide-react";
import Link from "next/link";
import { VIEW_FLASHCARD_SETS_URL } from "@/app/lib/constants";
import { deleteFlashcardSet } from "@/app/lib/firebase";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import Tooltip from "../Tooltip";
import AlertDialogComp from "../ui/AlertDialog";
import MatchingPairs from "@/app/components/flashcards/MatchingPairs";

const OPTIONS = { axis: "y" };

export default function Practice({ title, flashcards }) {
  const { user } = useUser();
  const router = useRouter();
  const SLIDES = flashcards.map((flashcard, index) => {
    const { front, back } = flashcard;
    return <FlashcardVerticalRotation key={index} front={front} back={back} />;
  });
  const [isPlaying, setIsPlaying] = React.useState(false);

  async function handleDelete() {
    await deleteFlashcardSet(user?.primaryEmailAddress.emailAddress, title);
    router.push(VIEW_FLASHCARD_SETS_URL);
  }

  function handlePlay() {
    setIsPlaying(true);
  }

  function handleBack() {
    setIsPlaying(false);
  }

  return (
    <Container className="min-h-screen">
      <div className="mt-24">
        {isPlaying ? (
          <>
            <Tooltip content="Practice">
              <Button
                variant="link"
                onClick={handleBack}
                className="pl-0 text-lg"
              >
                <span className="hidden md:block">Back</span>
                <span className="md:hidden">
                  <MoveLeft />
                </span>
              </Button>
            </Tooltip>
            <h1 className="mb-4 text-center text-2xl font-bold md:text-3xl">
              Match the front and back of the flashcards
            </h1>
            <MatchingPairs flashcards={flashcards} />
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <h1 className="mb-4 text-2xl font-bold md:text-3xl">
                {titleCase(title)}
              </h1>
              <Tooltip content="Game">
                <Button onClick={handlePlay}>
                  <span className="hidden md:block">Matching Pairs</span>
                  <span className="md:hidden">
                    <Dices />
                  </span>
                </Button>
              </Tooltip>
            </div>
            <EmblaCarousel slides={SLIDES} options={OPTIONS} />
            <div className="flex flex-row items-center justify-between">
              <h1 className="my-8 text-3xl font-bold">
                Terms ({flashcards.length})
              </h1>
              <div className="flex flex-row gap-2">
                <Tooltip content="Edit">
                  <Link
                    className="flex items-center rounded-md bg-gray-700 p-2 text-white hover:bg-gray-800"
                    href={`${VIEW_FLASHCARD_SETS_URL}/edit/${title}`}
                  >
                    <Pencil />
                  </Link>
                </Tooltip>

                <Tooltip content="Delete">
                  <AlertDialogComp onDelete={handleDelete}>
                    <Button variant="destructive" className="p-2">
                      <Trash />
                    </Button>
                  </AlertDialogComp>
                </Tooltip>
              </div>
            </div>
            <FlashcardsGrid flashcards={flashcards} />
          </>
        )}
      </div>
    </Container>
  );
}
