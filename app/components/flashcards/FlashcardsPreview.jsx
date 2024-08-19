"use client";
import React from "react";
import { Button } from "../ui/button";
import CollectionGetter from "./Collection";
import Modal from "../Modal";
import FlashcardsGrid from "./FlashcardsGrid";

export default function FlashcardsPreview({ flashcards }) {
  const [showModal, setShowModal] = React.useState(false);
  const handleSave = () => {
    setShowModal(true);
  };

  return (
    <div className="pb-16">
      {showModal && (
        <Modal>
          <CollectionGetter
            onCancel={() => setShowModal(false)}
            flashcards={flashcards}
          ></CollectionGetter>
        </Modal>
      )}
      <h2 className="my-4 text-2xl font-bold">Flashcards Preview</h2>
      <div className="text-center">
        <FlashcardsGrid flashcards={flashcards} />
        <Button onClick={handleSave} className="mt-8">
          Save
        </Button>
      </div>
    </div>
  );
}
