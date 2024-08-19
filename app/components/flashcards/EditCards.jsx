"use client";
import { useState } from "react";
import { Container } from "../ui/craft";
import { titleCase } from "@/app/lib/helpers";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
import { VIEW_FLASHCARD_SETS_URL } from "@/app/lib/constants";
import { deleteFlashcardSet, saveCollection } from "@/app/lib/firebase";
import { useUser } from "@clerk/nextjs";
import { Trash } from "lucide-react";
import { Textarea } from "../ui/textarea";

export default function EditCards({ title, flashcards }) {
  const router = useRouter();
  const { user } = useUser();
  const [isSaving, setIsSaving] = useState(false);
  const [flashcardSet, setFlashcardSet] = useState({
    id: titleCase(title),
    flashcards: flashcards,
  });

  async function handleSave() {
    setIsSaving(true);
    // Delete the old flashcard set
    await deleteFlashcardSet(user.primaryEmailAddress?.emailAddress, title);

    // Save the new flashcard set
    await saveCollection(
      user.primaryEmailAddress?.emailAddress,
      flashcardSet.id,
      flashcardSet.flashcards
    );
    setIsSaving(false);

    router.push(VIEW_FLASHCARD_SETS_URL);
  }

  function handleCancel() {
    const url = VIEW_FLASHCARD_SETS_URL + "/" + title;
    router.push(url);
  }

  function handleDelete(index) {
    const newFlashcards = [...flashcardSet.flashcards];
    newFlashcards.splice(index, 1);
    setFlashcardSet({ ...flashcardSet, flashcards: newFlashcards });
  }

  const flashcardsElements = flashcardSet.flashcards.map((flashcard, index) => (
    <Card key={index} className="p-4">
      <CardHeader className="flex flex-row items-center justify-between text-xl font-bold">
        <span>
          {index + 1}
          {". "}
        </span>
        <Button
          onClick={() => handleDelete(index)}
          variant="destructive"
          className="p-2"
        >
          <Trash />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="text-left text-lg">
            <Textarea
              className="w-full resize-none overflow-hidden rounded-lg border border-gray-700 p-2"
              value={flashcard.front}
              onChange={(e) => {
                const newFlashcards = [...flashcardSet.flashcards];
                newFlashcards[index].front = e.target.value;
                setFlashcardSet({
                  ...flashcardSet,
                  flashcards: newFlashcards,
                });
              }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
            <span className="text-sm font-bold">Front</span>
          </div>

          <div className="text-left text-lg">
            <Textarea
              className="w-full resize-y rounded-lg border border-gray-700 p-2"
              value={flashcard.back}
              onChange={(e) => {
                const newFlashcards = [...flashcardSet.flashcards];
                newFlashcards[index].back = e.target.value;
                setFlashcardSet({
                  ...flashcardSet,
                  flashcards: newFlashcards,
                });
              }}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = `${e.target.scrollHeight}px`;
              }}
            />
            <span className="text-sm font-bold">Back</span>
          </div>
        </div>
      </CardContent>
    </Card>
  ));

  return (
    <Container className="min-h-screen">
      <div className="mt-24">
        <div className="mb-4 flex w-full items-center justify-end gap-2 text-end">
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            Save
          </Button>
        </div>
        <div className="flex flex-col gap-4">
          {/* Title */}
          <div className="flex flex-wrap items-center justify-between">
            <h1 className="text-left text-3xl font-bold">
              <input
                className="w-full rounded-none border-b-4 border-gray-700 py-2"
                value={flashcardSet.id}
                onChange={(e) =>
                  setFlashcardSet({ ...flashcardSet, id: e.target.value })
                }
              />
              <div className="my-4 text-base">TITLE</div>
            </h1>
          </div>

          {/* Flashcards */}
          {flashcardsElements}

          {/* Add card button */}
          <Button
            className="mx-auto mt-8 border border-slate-400 px-6 py-5 text-xl font-normal hover:bg-slate-200"
            variant="secondary"
            onClick={() => {
              const newFlashcards = [...flashcardSet.flashcards];
              newFlashcards.push({ front: "", back: "" });
              setFlashcardSet({ ...flashcardSet, flashcards: newFlashcards });
            }}
          >
            Add new card
          </Button>
        </div>
        <div className="mt-12 flex w-full items-center justify-end gap-2 text-end">
          <Button onClick={handleCancel} variant="outline">
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={isSaving}>
            Save
          </Button>
        </div>
      </div>
    </Container>
  );
}
