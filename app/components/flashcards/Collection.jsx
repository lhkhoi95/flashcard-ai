"use client";
import React, { useState } from "react";
import { InputIcon } from "../Input";
import { Button } from "../ui/button";
import { Spark, Spinner } from "../Icons";
import { generateCollectionName } from "../../lib/http";
import { collectionExists, saveCollection } from "../../lib/firebase";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { VIEW_FLASHCARD_SETS_URL } from "@/app/lib/constants";

export default function CollectionGetter({ onCancel, flashcards }) {
  const router = useRouter();
  const [isFetching, setIsFetching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [name, setName] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress;

  async function handleGenerateCollectionName() {
    setIsFetching(true);
    const generatedName = await generateCollectionName(flashcards);
    setName(generatedName);
    setError(null);
    setIsFetching(false);
  }

  async function handleSave() {
    setIsSaving(true);
    setSuccess(false);
    setError(null);
    if (!name.trim()) {
      setError("Please enter a name");
      return;
    }
    const isExisting = await collectionExists(email, name.toLowerCase());
    if (isExisting) {
      setError("This name already exists.");
      setIsSaving(false);
      return;
    }

    // Save the collection
    const response = await saveCollection(
      email,
      name.toLowerCase(),
      flashcards
    );
    if (response.success) {
      setSuccess(true);
    }

    setIsSaving(false);
    onCancel();
    router.push(VIEW_FLASHCARD_SETS_URL);
  }

  return (
    <div className="flex flex-col gap-4 text-sm">
      <h1 className="text-left text-xl font-bold">Collection Name</h1>
      <div className="relative">
        <InputIcon
          placeholder="E.g Word Capitals"
          classes="p-2 pr-10"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={error}
        >
          <Button
            onClick={handleGenerateCollectionName}
            className="absolute right-2 top-1/2 mx-1 h-fit w-fit -translate-y-1/2 transform bg-inherit p-1 hover:bg-gray-100"
          >
            {!isFetching ? (
              <Spark classes="hover:brightness-150" />
            ) : (
              <Spinner classes="size-4" />
            )}
          </Button>
        </InputIcon>
      </div>
      <div className="flex w-full justify-end gap-2">
        <Button onClick={onCancel} variant="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} disabled={isFetching || isSaving}>
          Save
        </Button>
      </div>
      {/* {success && (
        <div className="text-center text-green-500">Collection saved!</div>
      )} */}
    </div>
  );
}
