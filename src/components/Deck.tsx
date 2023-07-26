import { useEffect, useState } from "react";

const Deck = ({ clearDeck, createDeck, deck, removeCard }: any) => {
  const [decks, setDecks] = useState(null);
  useEffect(() => {
    (async () => {
      try {
        const resDecks = await window.bridge.getDecks();
        setDecks(resDecks);
      } catch (err) {
        console.log(`ERROR Getting Decks: ${err} `);
      }
    })();
  }, []);

  return (
    <div className="w-2/3 p-2 bg-slate-900 flex flex-col items-center gap-1">
      <div className="bg-slate-800 w-full rounded-t overflow-hidden h-[9%] flex flex-wrap gap-2">
        <select name="decks">
          <option value="">Select Deck</option>
          {/* {decks &&
            decks.map((deck: any, idx: number) => {
              return (
                <option value={deck.name} key={idx}>
                  {deck.name}
                </option>
              );
            })} */}
        </select>
        <p onClick={clearDeck}>clear deck</p>
        <p>set as default</p>
        <p>new deck</p>
        <p>rename deck</p>
        <p>delete deck</p>
        <p onClick={createDeck}>save deck</p>
        <p>exit</p>
      </div>

      <div
        id="deck"
        className="h-[90%] bg-red-400 grid grid-cols-10 grid-rows-6 place-content-center w-full gap-1"
      >
        {deck.length > 0 &&
          deck.map((card: any, i: number) => {
            return (
              <img
                src={card.image}
                className="w-[80px] h-[106px] bg-neutral-700"
                key={`${card.id}-${i}`}
                onClick={() => removeCard(card)}
              />
            );
          })}
        {decks ? JSON.stringify(decks) : "no deck"}
      </div>
    </div>
  );
};

export default Deck;
