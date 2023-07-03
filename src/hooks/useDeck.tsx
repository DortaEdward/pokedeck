import { useState } from "react";
import type { CardType } from "../types/card";
type Props = {
  deckSize: number;
  maxCardDuplicates: number;
};

export type UserDeckResult = {
  deck: CardType[];
  addToDeck: (card: CardType) => void;
  removeCard: (card: CardType) => void;
};

function useDeck({
  deckSize = 60,
  maxCardDuplicates = 4,
}: Props): UserDeckResult {
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
    setDeck((prev) => prev.filter((_,i) => i !== cardIdx));
  }

  return { deck, addToDeck, removeCard };
}

export default useDeck;

/*
  - [] add cards to deck
    - [] if multiple of 4 dont add more
    - [] max deck size 60
    
  - [] save deck
  - [] sort deck
    - pokemon -> trainer -> energy

  - [] remove from deck
*/
