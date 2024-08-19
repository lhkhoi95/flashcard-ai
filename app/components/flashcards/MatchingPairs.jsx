"use client";
import React, { useState, useEffect } from "react";
import { Card } from "../ui/card";
import Modal from "../Modal";
import { Button } from "../ui/button";

export default function MatchingPairs({ flashcards }) {
  const [frontCards, setFrontCards] = useState([]);
  const [backCards, setBackCards] = useState([]);
  const [selectedFront, setSelectedFront] = useState(null);
  const [selectedBack, setSelectedBack] = useState(null);
  const [matchedPairs, setMatchedPairs] = useState([]);
  const [showModel, setShowModel] = useState(false);

  useEffect(() => {
    const shuffledFront = flashcards
      .map((card) => ({ ...card, id: Math.random() }))
      .sort(() => Math.random() - 0.5);
    const shuffledBack = flashcards
      .map((card) => ({ ...card, id: Math.random() }))
      .sort(() => Math.random() - 0.5);

    setFrontCards(shuffledFront);
    setBackCards(shuffledBack);
  }, [flashcards]);

  useEffect(() => {
    if (selectedFront && selectedBack) {
      if (selectedFront.front === selectedBack.front) {
        setMatchedPairs([...matchedPairs, selectedFront.id, selectedBack.id]);
        setSelectedFront(null);
        setSelectedBack(null);
      } else {
        setTimeout(() => {
          setSelectedFront(null);
          setSelectedBack(null);
        }, 1000);
      }
    }
  }, [selectedFront, selectedBack]);

  useEffect(() => {
    if (matchedPairs.length === flashcards.length * 2) {
      setShowModel(true);
    }
  }, [matchedPairs]);

  const handleFrontClick = (card) => {
    if (!selectedFront && !matchedPairs.includes(card.id)) {
      setSelectedFront(card);
    }
  };

  const handleBackClick = (card) => {
    if (!selectedBack && !matchedPairs.includes(card.id)) {
      setSelectedBack(card);
    }
  };

  const handlePlayAgain = () => {
    setMatchedPairs([]);
    const shuffledFront = flashcards
      .map((card) => ({ ...card, id: Math.random() }))
      .sort(() => Math.random() - 0.5);
    const shuffledBack = flashcards
      .map((card) => ({ ...card, id: Math.random() }))
      .sort(() => Math.random() - 0.5);

    setFrontCards(shuffledFront);
    setBackCards(shuffledBack);
    setShowModel(false);
  };

  return (
    <div className="grid grid-cols-2 gap-4 rounded-lg bg-gradient-to-r from-purple-400 to-pink-500 p-4 shadow-lg">
      {showModel && (
        <Modal>
          <div className="p-4">
            <h1 className="text-2xl font-bold">Congratulations 🎉!</h1>
            <p className="mt-4 text-gray-500">You have matched all the pairs</p>
            <div className="mt-4 flex justify-end gap-2">
              <Button onClick={() => setShowModel(false)}>Close</Button>
              <Button onClick={handlePlayAgain}>Play Again</Button>
            </div>
          </div>
        </Modal>
      )}
      <div className="space-y-2">
        {frontCards.map((card) => (
          <Card
            key={card.id}
            className={`p-4 flex text-center items-center justify-center cursor-pointer transition-all duration-300 ${
              selectedFront?.id === card.id ? "ring-4 ring-yellow-400" : ""
            } ${
              matchedPairs.includes(card.id)
                ? "opacity-50 bg-green-200"
                : "hover:bg-gray-100"
            }`}
            onClick={() => handleFrontClick(card)}
          >
            <span className="text-lg font-bold">{card.front}</span>
          </Card>
        ))}
      </div>
      <div className="space-y-2">
        {backCards.map((card) => (
          <Card
            key={card.id}
            className={`p-4 text-center flex items-center justify-center cursor-pointer transition-all duration-300 ${
              selectedBack?.id === card.id ? "ring-4 ring-yellow-400" : ""
            } ${
              matchedPairs.includes(card.id)
                ? "opacity-50 bg-green-200"
                : "bg-blue-200 hover:bg-blue-300"
            }`}
            onClick={() => handleBackClick(card)}
          >
            <span className="text-lg font-bold">{card.back}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}
