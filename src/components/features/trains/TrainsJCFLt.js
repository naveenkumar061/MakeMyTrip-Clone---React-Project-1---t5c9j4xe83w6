import { useTrainsMainContext } from '../../context/Trains/TrainsMainContext';

function TrainsJCFLt({ item, trainsList }) {
  const { filter, onAddFilter } = useTrainsMainContext();

  function handleSelected(e) {
    const { value, checked } = e.target;
    onAddFilter(value, checked);
  }

  function getTrainCount() {
    return trainsList?.filter((train) =>
      train.coaches.find(
        (coach, index) => coach.coachType === item.split('-')[1]
      )
    ).length;
  }

  const trainCount = getTrainCount();

  function handleDivClick(filterName) {
    const isFilterPresent = filter.includes(filterName);
    onAddFilter(filterName, !isFilterPresent);
  }

  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <input
          type="checkbox"
          value={item}
          onChange={handleSelected}
          checked={filter.includes(item)}
        />
        <div onClick={() => handleDivClick(item)}>{item}</div>
      </div>
      <div>({trainCount})</div>
    </div>
  );
}

export default TrainsJCFLt;
