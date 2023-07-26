/* eslint-disable @typescript-eslint/ban-ts-comment */
import { useQuery } from "react-query";
import { useState, useEffect } from "react";
import { MdSort, MdOutlineSettings, MdSearch } from "react-icons/md";
import { BiBug } from "react-icons/bi";
import Card from "./Card";
import type { CardType } from "../types/card";
import FilterMenu from "./Filter";
import useDeck from "../hooks/useDeck";
import DisplayCard from "./DisplayCard";
import Deck from "./Deck";
import Search from "./Search";

function DeckBuilder({ isLoading, data, searchTerm, setSearchTerm }: any) {
  const [input, setInput] = useState("");
  const [name, setName] = useState("Newest Deck");
  const [decks, setDecks] = useState(null);
  const [startUp, setStartUp] = useState<boolean>(false);

  const [open, setOpen] = useState<boolean>(false);
  const [activeCard, setActiveCard] = useState<CardType | undefined>();
  const { deck, addToDeck, removeCard, clearDeck } = useDeck({
    deckSize: 60,
    maxCardDuplicates: 4,
  });

  useEffect(() => {
    (async () => {
      try {
        // @ts-ignore
        const resDecks = await window.bridge.getDecks();
        setDecks(resDecks);
      } catch (err) {
        console.log(`ERROR Getting Decks: ${err} `);
      }
    })();
  }, []);

  function handleAddToDeck(card: CardType) {
    const formatedCard = {
      id: card.id,
      name: card.name,
      supertype: card.supertype,
      subtypes: card.subtypes,
      hp: card.hp,
      types: card.types,
      attacks: card.attacks,
      weaknesses: card.weaknesses,
      retreatCost: card.retreatCost,
      set: card.set,
      image: card.image,
      rules: card.rules,
      resistances: card.resistances,
      abilities: card.abilities,
    };
    addToDeck(formatedCard);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (input.length > 0) setSearchTerm(input);
  }

  function createDeck() {
    if (deck.length < 0 || deck.length > 60) return;
    if (name.length <= 0 && !deck) return;
    // @ts-ignore
    window.bridge.saveData({
      name,
      deck: deck,
    });
  }

  return (
    <div className="h-screen bg-slate-800 flex relative">
      {open ? <FilterMenu setOpen={setOpen} /> : <></>}
      <DisplayCard activeCard={activeCard} />
      <Deck
        clearDeck={clearDeck}
        createDeck={createDeck}
        deck={deck}
        removeCard={removeCard}
      />
      <Search
        handleSubmit={handleSubmit}
        setInput={setInput}
        setOpen={setOpen}
        isLoading={isLoading}
        data={data}
        handleAddToDeck={handleAddToDeck}
        setActiveCard={setActiveCard}
      />
    </div>
  );
}

export default DeckBuilder;
