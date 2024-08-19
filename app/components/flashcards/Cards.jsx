import React from "react";
import { Button } from "../ui/button";
import {
  CREATE_FLASHCARDS_URL,
  VIEW_FLASHCARD_SETS_URL,
} from "../../lib/constants";
import Link from "next/link";
import { titleCase } from "../../lib/helpers";
import { currentUser } from "@clerk/nextjs/server";
import { getFlashcardSets } from "../../lib/firebase";
import { Eye, Plus } from "lucide-react";

export default async function CardSets() {
  const user = await currentUser();

  const email = user?.primaryEmailAddress?.emailAddress;
  const flashcardSets = await getFlashcardSets(email);

  if (flashcardSets.length === 0) {
    return (
      <div className="flex flex-col items-center text-lg text-gray-500">
        No flashcard sets found. Create one by clicking the button below.
        <Link
          className="mt-4 h-12 w-12 shadow-md hover:brightness-110"
          href={CREATE_FLASHCARDS_URL}
        >
          <Button className="h-full w-full">
            <Plus classes="size-8" />
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {flashcardSets.map((flashcardSet) => {
        const title = titleCase(flashcardSet.id);
        const questions = flashcardSet.flashcards.length;
        return (
          <Link
            key={flashcardSet.id}
            href={`${VIEW_FLASHCARD_SETS_URL}/${flashcardSet.id}`}
            className="flex w-full flex-col gap-4 rounded-md border-b-2 bg-gray-200 p-4 shadow-md hover:border-gray-600"
          >
            <div className="flex items-start justify-between gap-4 align-middle">
              {/* Title */}
              <h1 className="text-xl font-bold text-gray-600 md:text-2xl">
                {title}
              </h1>
            </div>

            {/* Question */}
            <div className="w-fit rounded-full bg-zinc-400 px-2 text-sm text-white">
              {questions} questions
            </div>
          </Link>
        );
      })}
    </div>
  );
}
