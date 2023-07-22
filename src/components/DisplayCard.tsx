import Card from "./Card";
import { BiBug } from 'react-icons/bi';
import { MdOutlineSettings} from 'react-icons/md';
const DisplayCard = ({activeCard}: any) => {
  return(
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
      <div className="text-sm flex gap-1 items-center text-red-500 cursor-pointer">
        Report Bug <BiBug size={20} />
      </div>
      <p className="text-sm flex gap-1 items-center">
        Settings <MdOutlineSettings size={20} />
      </p>
    </div>
  </div>
  )
}

export default DisplayCard;