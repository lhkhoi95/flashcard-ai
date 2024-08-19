import { getCollection } from "@/app/lib/firebase";
import React from "react";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Practice from "@/app/components/flashcards/Practice";

export default async function Page({ params }) {
  const user = await currentUser();
  const id = decodeURIComponent(params.id);
  const flashcards = await getCollection(
    user?.primaryEmailAddress.emailAddress,
    id
  );

  if (!flashcards.exists()) {
    redirect("/flashcards/sets");
  }

  const data = flashcards.data().flashcards;

  return <Practice title={id} flashcards={data} />;
}
