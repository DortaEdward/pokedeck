import { MdSort, MdSearch } from "react-icons/md";
import Loading from "./Loading";

const Search = ({
  handleSubmit,
  setInput,
  setOpen,
  isLoading,
  data,
  handleAddToDeck,
  setActiveCard,
}: any) => {
  return (
    <div className="w-1/6 p-1 bg-slate-800 overflow-auto h-full relative">
      <form
        onClick={(e) => handleSubmit(e)}
        className="h-[12%] flex flex-col gap-2 items-center justify-center sticky"
      >
        <input
          type="text"
          placeholder="Search Name"
          className="w-11/12 rounded px-2 py-1 outline-none"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-teal-800 hover:bg-teal-950 py-1 px-3 rounded flex gap-1 items-center"
            onClick={() => setOpen(true)}
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
        <Loading />
      ) : (
        <>
          {data.data ? (
            <div className="grid grid-cols-3 grid-flow-row h-[88%] overflow-auto scrollbar-hide py-1">
              {data.data.map((card: any, i: number) => {
                return (
                  <div
                    onClick={() =>
                      handleAddToDeck({ ...card, image: card.images.large })
                    }
                    key={`${card.id}-${i}-${i}`}
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
  );
};

export default Search;
