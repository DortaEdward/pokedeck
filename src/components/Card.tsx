import type { CardType } from "../types/card"

const Card = ({
  id, name,
  supertype, hp,
  types, attacks,
  weaknesses, retreatCost,
  set, image,
  subtypes, rules,
  resistances, abilities
}: CardType) => {
  return (
    <div className="flex flex-col items-center gap-2">
      <img src={image} />
      <div className="w-full bg-slate-900 p-1 rounded h-[370px] overflow-x-hidden overflow-y-auto scrollbar-hide">
        <p className="text-lg">{name}</p>
        <p className="text-sm font-bold">Set: {set}</p>
        {
          supertype === "Pokémon"
            ? <PokemonDisplay abilities={abilities} resistances={resistances} retreatCost={retreatCost} hp={hp} types={types} attacks={attacks} weaknesses={weaknesses} />
            : <TrainerDisplay rules={rules} />
        }
      </div>
    </div>
  )
}

const PokemonDisplay = ({ abilities, hp, types, attacks, weaknesses, resistances, retreatCost }: any) => {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-1">
        <p>{hp} HP</p>
        <img src={types && `${types[0]}.png`} alt="" />
      </div>
      <div>

        {
          abilities &&
          abilities.map((ability: any) => {
            return (
              <div className=" border-y-2 py-1">
                <p className="text-red-800">{ability.name}</p>
                <p className="text-sm">{ability.text}</p>
              </div>
            )
          })
        }
      </div>

      {
        attacks &&
        attacks.map((attack: any) => {
          return (
            <div>
              <div className="flex flex-col gap-1 text-sm">
                <div className="flex gap-2">
                  <p>
                    {attack.name}
                  </p>
                  <p>
                    {attack.damage}
                  </p>
                </div>
                <p className="flex gap-[0.15rem]">
                  {attack.cost.map((cost: any) => { return (<img className="w-[12px] h-[12px]" src={`${cost}.png`} />) })}
                </p>
              </div>
              <p className="text-sm">{attack.text}</p>
            </div>
          )
        })
      }
      <div className="my-1 flex gap-2">
        <div>
          <p className="text-sm">Weakness</p>
          {
            weaknesses && weaknesses.map((weakness: any) => {
              return (
                <div className="flex gap-1 items-center"><img className="w-[12px] h-[12px]" src={`${weakness.type}.png`} /> <p className="text-sm">{weakness.value}</p></div>
              )
            })
          }
        </div>
        <div>
          <p className="text-sm">Resistance</p>
          <div>
            {
              resistances && resistances.map((resistance: any) => {
                return (
                  <div className="flex gap-1 items-center">
                    <img className="w-[12px] h-[12px]" src={`${resistance.type}.png`} />
                    <p className="text-sm">{resistance.value}</p>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <p className="text-sm">Retreat Cost</p>
        {
          retreatCost && retreatCost.map((retreat: any) => {
            return (
              <div className="flex gap-1 items-center">
                <img className="w-[12px] h-[12px]" src={`${retreat}.png`} />
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

const TrainerDisplay = ({ rules }: any) => {
  return (
    <div className="flex flex-col gap-1">
      {
        rules &&
        rules.map((rule: string) => {
          return (
            <p className="text-sm">{rule}</p>
          )
        })
      }
    </div>
  )
}

export default Card;