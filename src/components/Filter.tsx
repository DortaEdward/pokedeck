type Props = {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const FilterMenu = ({ setOpen }: Props) => {
  return (
    <div className="absolute min-w-screen z-10 w-full min-h-screen bg-slate-950/90 top-0 left-0">
      <button onClick={() => setOpen(false)}>X</button>
      <div className="w-3/4 h-3/4 bg-slate-800 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        Filters
      </div>
    </div>
  );
};

export default FilterMenu;
