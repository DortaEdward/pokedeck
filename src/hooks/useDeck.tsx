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
    if (cardCount >= maxCardDuplicates) return;

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

/*
  - [x] add cards to deck
    - [x] if multiple of 4 dont add more
    - [x] max deck size 60
  - 
  - [] save deck
  - [] sort deck
      - pokemon -> trainer -> energy

  - [x] remove from deck
*/
