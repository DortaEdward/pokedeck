import { useEffect, useState } from "react";
import StartUp from "./components/StartUp.tsx";
import DeckBuilder from "./components/DeckBuilder.tsx";
import { useQuery } from "react-query";
import { searchCards } from "./utils/apiCalls";

function App() {
  const [startUp, setStartUp] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState("");
  const { isLoading, data } = useQuery(["searchCards", searchTerm], () =>
    searchCards(searchTerm)
  );

  useEffect(() => {
    if (startUp) {
      setStartUp((prev) => !prev);
    }
  }, [isLoading, startUp]);

  if (isLoading && startUp) return <StartUp />;

  return (
    <DeckBuilder
      isLoading={isLoading}
      data={data}
      searchTerm={searchTerm}
      setSearchTerm={setSearchTerm}
    />
  );
}

export default App;
