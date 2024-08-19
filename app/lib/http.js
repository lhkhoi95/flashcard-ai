import {
  GENERATE_COLLECTION_NAME_ROUTE,
  GET_FLASHCARDS_ROUTE,
} from "./constants";

export async function generateFlashcards(topic) {
  const res = await fetch(GET_FLASHCARDS_ROUTE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ topic }),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch flashcards");
  }
  return await res.json();
}

export async function generateCollectionName(flashcards) {
  const res = await fetch(GENERATE_COLLECTION_NAME_ROUTE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ flashcards }),
  });

  if (!res.ok) {
    throw new Error("Failed to generate collection name");
  }
  return await res.json();
}
