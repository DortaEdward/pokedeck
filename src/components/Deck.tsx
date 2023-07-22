const Deck = ({clearDeck,createDeck,deck,removeCard}:any) => {
  return (
    <div className="w-2/3 p-2 bg-slate-900 flex flex-col items-center gap-1">
      <div className="bg-slate-800 w-full rounded-t overflow-hidden h-[9%] flex flex-wrap gap-2">
        <select name="decks">
          <option value="">Select Deck</option>
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
          deck.map((card:any, i:number) => {
            return (
              <img
                src={card.image}
                className="w-[80px] h-[106px] bg-neutral-700"
                key={`${card.id}-${i}`}
                onClick={() => removeCard(card)}
              />
            );
          })}
      </div>
    </div>
  );
};

export default Deck;