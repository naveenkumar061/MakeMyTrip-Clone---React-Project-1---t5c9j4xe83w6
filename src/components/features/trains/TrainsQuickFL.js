import { useTrainsMainContext } from '../../context/Trains/TrainsMainContext';

function TrainsQuickFL({ item, trainsList }) {
  const { filter, onAddFilter } = useTrainsMainContext();

  function handleSelected(e) {
    const { value, checked } = e.target;
    onAddFilter(value, checked);
  }

  function handleDivClick(filterName) {
    const isFilterPresent = filter.includes(filterName);
    onAddFilter(filterName, !isFilterPresent);
  }

  function getTrainCount() {
    if (item.split('-')[1] === 'CC')
      return trainsList?.filter((train) =>
        train.coaches.find(
          (coach, index) => coach.coachType === item.split('-')[1]
        )
      ).length;
    if (item === 'Departure after 6PM')
      return trainsList?.filter((train) => train.departureTime >= '18:00')
        .length;
    if (item === 'Arrival before 12PM')
      return trainsList?.filter((train) => train.arrivalTime <= '12:00').length;
  }

  const trainCount = getTrainCount();

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

export default TrainsQuickFL;
