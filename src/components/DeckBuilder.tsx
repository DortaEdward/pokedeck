import { useQuery, useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import { MdSort, MdOutlineSettings, MdSearch } from "react-icons/md";
import { BiBug } from "react-icons/bi";
import { getCards, searchCards } from "../utils/apiCalls";
// import { deck } from '../utils/data';
import Card from "./Card";
import type { CardType, Deck } from "../types/card";
import FilterMenu from "./Filter";
import useDeck from "../hooks/useDeck";

function DeckBuilder() {
  const [input, setInput] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, data } = useQuery(["searchCards", searchTerm], () =>
    searchCards(searchTerm)
  );

  const [open, setOpen] = useState<boolean>(false);
  const [activeCard, setActiveCard] = useState<CardType | undefined>();
  const { deck, addToDeck, removeCard } = useDeck({ deckSize: 60, maxCardDuplicates: 4 });

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

  function handleSubmit(e: any) {
    e.preventDefault();
    if (input.length > 0) setSearchTerm(input);
  }

  return (
    <div className="h-screen bg-slate-800 flex relative">
      {open ? <FilterMenu /> : <></>}
      <div className="w-1/6 bg-slate-">
        <div className="h-[94%] pt-4 px-2">
          {activeCard && (
            <Card
              id={activeCard.id}
              name={activeCard.name}
              supertype={activeCard.supertype}
              hp={activeCard.hp}
              types={activeCard.types}
              attacks={activeCard.attacks}
              weaknesses={activeCard.weaknesses}
              retreatCost={activeCard.retreatCost}
              set={activeCard.set}
              image={activeCard.image}
              rules={activeCard.rules}
              subtypes={activeCard.subtypes}
              resistances={activeCard.resistances}
              abilities={activeCard.abilities}
            />
          )}
        </div>
        <div className="bg-slate-700 h-[6%] flex items-center justify-center gap-3">
          <p className="text-sm flex gap-1 items-center text-red-500">
            Report Bug <BiBug size={20} />
          </p>
          <p className="text-sm flex gap-1 items-center">
            Settings <MdOutlineSettings size={20} />
          </p>
        </div>
      </div>

      <div className="w-2/3 p-2 bg-slate-900 flex flex-col items-center gap-1">
        <div className="bg-slate-800 w-full rounded-t overflow-hidden h-[9%] flex flex-wrap gap-2">
          <select name="decks">
            <option value="">Select Deck</option>
          </select>
          <p>clear deck</p>
          <p>set as default</p>
          <p>new deck</p>
          <p>rename deck</p>
          <p>delete deck</p>
          <p>save deck</p>
          <p>exit</p>
        </div>

        <div
          id="deck"
          className="h-[90%] bg-red-400 grid grid-cols-10 grid-rows-6 place-content-center w-full gap-1"
        >
          {deck.length > 0 &&
            deck.map((card) => {
              return (
                <img
                  src={card.image}
                  className="w-[80px] h-[106px] bg-neutral-700"
                  key={card.id}
                  onClick={() => removeCard(card)}
                />
              );
            })}
        </div>
      </div>
      <div className="w-1/6 p-1 bg-slate-800 overflow-auto h-full relative">
        <form
          onClick={(e) => handleSubmit(e)}
          className="h-[12%] flex flex-col gap-2 items-center justify-center sticky"
        >
          <input
            type="text"
            placeholder="Search Name"
            className="w-11/12 rounded px-2 py-1 outline-none"
            onChange={(e: any) => setInput(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              type="button"
              className="bg-teal-800 hover:bg-teal-950 py-1 px-3 rounded flex gap-1 items-center"
            >
              Filters <MdSort size={20} />
            </button>
            <button
              type="submit"
              className="bg-teal-800 hover:bg-teal-950 py-1 px-3 rounded flex gap-1 items-center"
            >
              Search <MdSearch size={20} />
            </button>
          </div>
        </form>
        {isLoading ? (
          <>Is Loading</>
        ) : (
          <>
            {data.data ? (
              <div className="grid grid-cols-3 grid-flow-row h-[88%] overflow-auto scrollbar-hide py-1">
                {data.data.map((card: any) => {
                  return (
                    <div
                      onClick={() =>
                        handleAddToDeck({ ...card, image: card.images.large })
                      }
                      key={card.id}
                      onMouseEnter={() =>
                        setActiveCard({
                          id: card.id,
                          name: card.name,
                          supertype: card.supertype,
                          hp: card.hp,
                          types: card.types,
                          attacks: card.attacks,
                          weaknesses: card.weaknesses,
                          retreatCost: card.retreatCost,
                          set: card.set.id,
                          image: card.images.large,
                          rules: card.rules,
                          subtypes: card.subtypes,
                          resistances: card.resistances,
                          abilities: card.abilities,
                        })
                      }
                    >
                      <img
                        className="h-[5.85rem]"
                        src={card.images.large}
                        alt={`Image of ${card.id}`}
                      />
                    </div>
                  );
                })}
              </div>
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default DeckBuilder;
