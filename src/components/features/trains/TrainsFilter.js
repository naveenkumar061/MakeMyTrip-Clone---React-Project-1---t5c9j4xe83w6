import { IoMdClose } from 'react-icons/io';
import { useTrainsMainContext } from '../../context/Trains/TrainsMainContext';
import { trainsQuickLt } from '../../assets/data/TrainsQuickLt';
import TrainsQuickFL from './TrainsQuickFL';
import { trainsTicketTL } from '../../assets/data/TrainsTicketTL';
import TrainsTTL from './TrainsTTL';
import { trainsJCFL } from '../../assets/data/TrainsJCFL';
import TrainsJCFLt from './TrainsJCFLt';

function TrainsFilter({ trainsList }) {
  const { filter, onAddFilter } = useTrainsMainContext();

  function handleRemoveItem(item) {
    onAddFilter(item, false);
  }
  function handleRemoveAllFilters() {
    filter.map((item) => onAddFilter(item, false));
  }

  return (
    <div className="border-gray h-fit w-full md:w-[28vw] border bg-white px-8 py-4 shadow-[2px_2px_10px_#d3d3d3]">
      {filter.length > 0 && (
        <>
          <div className="flex justify-between">
            <h3 className="text-lg font-medium">Applied Filters</h3>
            <p
              className="cursor-pointer text-blue-500 hover:text-red-500"
              onClick={handleRemoveAllFilters}
            >
              Clear All
            </p>
          </div>
          <div className="inline p-2">
            {filter.map((item, index) => (
              <div
                className="mb-4 flex items-center justify-between rounded-md bg-blue-200 p-2 text-sm"
                key={index}
              >
                <p>{item}</p>
                <IoMdClose
                  className="cursor-pointer text-lg text-blue-500 hover:text-red-500"
                  onClick={() => handleRemoveItem(item)}
                />
              </div>
            ))}
          </div>
        </>
      )}
      <h1 className="pb-4 text-xl font-semibold">Select Filters</h1>
      <div className="pb-4">
        <h1 className="pb-2 text-lg font-semibold">Quick Filters</h1>
        <div>
          {trainsQuickLt.map((item, index) => (
            <TrainsQuickFL key={index} item={item} trainsList={trainsList} />
          ))}
        </div>
      </div>
      <div>
        <h1 className="pb-2 text-lg font-semibold">Train Types</h1>
        <div>
          {trainsTicketTL.map((item, index) => (
            <TrainsTTL key={index} item={item} trainsList={trainsList} />
          ))}
        </div>
      </div>
      <div>
        <h1 className="pb-2 text-lg font-semibold">Journey Class Filters</h1>
        <div>
          {trainsJCFL.map((item, index) => (
            <TrainsJCFLt key={index} item={item} trainsList={trainsList} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default TrainsFilter;
