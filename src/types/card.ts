export type CardType = {
  id: string | undefined,
  name: string | undefined,
  supertype: string | undefined,
  subtypes: string[] | undefined,
  hp: string | undefined,
  types: string[] | undefined,
  attacks: {
    name: string;
    cost: string[] | undefined,
    damage: string | undefined,
    text: string
  }[] | undefined,
  weaknesses: {
    type: string | undefined,
    value: string | undefined,
  }[] | undefined,
  retreatCost: string[] | undefined,
  set: string | undefined,
  image: string | undefined,
  rules: string[] | undefined,
  resistances: string[] | undefined,
  abilities: string[] | undefined
}

export type DeckType = CardType[];