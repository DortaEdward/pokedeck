export async function getCards() {
  const res = await fetch("https://api.pokemontcg.io/v2/cards?q=set.id:sv2");
  const json = await res.json();
  return json;
}

type Input = {
  name: string | null;
  set:string | null;
}

export async function searchCards(input:string) {
  const url = `https://api.pokemontcg.io/v2/cards?q=name:"${input}"`
  console.log(url)
  const res = await fetch(url);
  const json = await res.json();
  return json;
}

// https://api.pokemontcg.io/v2/cards?q=name:""&set.id:sv2
