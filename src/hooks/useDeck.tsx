import { useState } from "react";
import type { CardType } from "../types/card";
type UseDeckParams = {
  deckSize: number;
  maxCardDuplicates: number;
};

export type UserDeckResult = {
  deck: CardType[];
  addToDeck: (card: CardType) => void;
  removeCard: (card: CardType) => void;
  clearDeck: () => void;
};

function useDeck({
  deckSize = 60,
  maxCardDuplicates = 4,
}: UseDeckParams): UserDeckResult {
  const [deck, setDeck] = useState<CardType[]>([]);

  function addToDeck(card: CardType) {
    if (deck.length >= deckSize) return;

    const cardCount = deck.filter((c: CardType) => c.id === card.id).length;
    const isEnergy = card.supertype === "Energy";
    
    if (cardCount >= maxCardDuplicates && !isEnergy) return;
    setDeck((prev) => [...prev, card]);
  }

  function removeCard(card: CardType) {
    const cardIdx = deck.indexOf(card);
    if (cardIdx < 0) return;
    setDeck((prev) => prev.filter((_, i) => i !== cardIdx));
  }

  function clearDeck(){
    setDeck([]);
  }

  return { deck, addToDeck, removeCard, clearDeck };
}

export default useDeck;
