type SelectType = {
  name: string;
  selectId: string;
  options: string[];
}

function SelectEl({ name, selectId, options }: SelectType) {
  return (
    <select name={name} id={selectId}>
      <option value="">None</option>
      {
        options.map(option => {
          return (
            <option key={option} value={option}>{option}</option>
          )
        })
      }
    </select>
  )
}

export default SelectEl;