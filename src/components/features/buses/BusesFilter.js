import { useBusesMainContext } from '../../context/Buses/BusesMainContext';
import Bus from '../../assets/images/bus.png';

function BusesFilter({ from, to }) {
  const { filter, onAddFilter } = useBusesMainContext();

  function containsPick(array) {
    return array.some(
      (element) => typeof element === 'string' && element.includes('Pick')
    );
  }

  function containsDrop(array) {
    return array.some(
      (element) => typeof element === 'string' && element.includes('Drop')
    );
  }

  function handleDivClick(filterName) {
    const isFilterPresent = filter.includes(filterName);
    if (filterName === 'AC' && filter.includes('Non AC')) {
      onAddFilter('Non AC', false);
    }
    if (filterName === 'Non AC' && filter.includes('AC')) {
      onAddFilter('AC', false);
    }
    if (filterName === 'Sleeper' && filter.includes('Seater')) {
      onAddFilter('Seater', false);
    }
    if (filterName === 'Seater' && filter.includes('Sleeper')) {
      onAddFilter('Sleeper', false);
    }
    onAddFilter(filterName, !isFilterPresent);
  }

  function handleRemoveAllFilters() {
    filter.map((item) => onAddFilter(item, false));
  }

  function handleClearPick() {
    const newFilters = filter.filter((item) => !item.includes('Pick'));
    filter.forEach((item) => {
      if (item.includes('Pick')) {
        onAddFilter(item, false);
      }
    });
    newFilters.forEach((item) => onAddFilter(item, true));
  }

  function handleClearDrop() {
    const newFilters = filter.filter((item) => !item.includes('Drop'));
    filter.forEach((item) => {
      if (item.includes('Drop')) {
        onAddFilter(item, false);
      }
    });
    newFilters.forEach((item) => onAddFilter(item, true));
  }

  return (
    <div className="flex-col flex pl-[20px] pr-[2vw] w-fit z-[2] text-[#4a4a4a]">
      <div className="w-full md:w-[320px] z-[2] bg-white">
        <div className="border-b border-[#d8d8d8] h-[44px] py-3 px-4 flex justify-between">
          <p className="font-bold text-lg">Filters</p>
          <p
            className={`${
              filter?.length > 0
                ? 'text-[rgb(0,140,255)] cursor-pointer'
                : 'text-[rgba(0,0,0,0.3)] pointer-events-none'
            } font-semibold flex justify-center items-center`}
            onClick={handleRemoveAllFilters}
          >
            CLEAR ALL
          </p>
        </div>
        <div>
          <ul>
            <li className="pt-4 px-4">
              <div className="flex items-center justify-between mb-3">
                <div className="cursor-default font-semibold">AC</div>
              </div>
              <div>
                <div className="flex">
                  <div
                    className={`border rounded-md flex justify-center items-center w-[138px] h-[32px] cursor-pointer mr-3 hover:text-[#008cff] hover:border-[#008cff] hover:bg-[#eaf5ff] ${
                      filter.includes('AC')
                        ? 'text-[#008cff] border-[#008cff] bg-[#eaf5ff]'
                        : 'border-[#d8d8d8]'
                    }`}
                    onClick={() => handleDivClick('AC')}
                  >
                    <span
                      className={`bg-no-repeat bg-[length:350px_500px] ${
                        filter.includes('AC')
                          ? 'bg-[position:-315px_-92px] w-[17px] h-[17px]'
                          : 'bg-[position:-40px_-15px] w-[15px] h-[17px]'
                      } mr-[11px]`}
                      style={{
                        backgroundImage: `url(${Bus})`,
                      }}
                    ></span>
                    <span className="text-sm">AC</span>
                  </div>
                  <div
                    className={`border rounded-md flex justify-center items-center w-[138px] h-[32px] cursor-pointer mr-3 hover:text-[#008cff] hover:border-[#008cff] hover:bg-[#eaf5ff] ${
                      filter.includes('Non AC')
                        ? 'text-[#008cff] border-[#008cff] bg-[#eaf5ff]'
                        : 'border-[#d8d8d8]'
                    }`}
                    onClick={() => handleDivClick('Non AC')}
                  >
                    <span
                      className={`bg-no-repeat bg-[length:350px_500px] mr-[11px] ${
                        filter.includes('Non AC')
                          ? 'bg-[position:-298px_-231px] w-[17px] h-[17px]'
                          : 'bg-[position:-278px_-231px] w-[17px] h-[17px]'
                      }`}
                      style={{
                        backgroundImage: `url(${Bus})`,
                      }}
                    ></span>
                    <span className="text-sm">Non AC</span>
                  </div>
                </div>
              </div>
            </li>
            <div className="w-auto border-b border-[rgb(231,231,231)] mt-4"></div>
            <li className="pt-4 px-4">
              <div className="flex mb-4 items-center justify-between">
                <div className="cursor-pointer font-semibold">
                  Pick up time - {from.split(',')[0]}
                </div>
                <div
                  className={`${
                    containsPick(filter)
                      ? 'text-[rgb(0,140,255)] cursor-pointer'
                      : 'text-[rgba(0,0,0,0.3)] pointer-events-none'
                  } font-semibold flex justify-center items-center`}
                  onClick={handleClearPick}
                >
                  CLEAR
                </div>
              </div>
              <div className="flex flex-wrap">
                <div
                  className={`border rounded-2xl flex flex-col justify-center items-center w-[130px] h-[65px] cursor-pointer mt-[2px] mr-[8px] mb-[9px] ml-[2px] float-left left-3 top-0 hover:text-[#008cff] hover:border-[#008cff] hover:bg-[#eaf5ff] ${
                    filter.includes('Pick Up 6 11')
                      ? 'text-[#008cff] border-[#008cff] bg-[#eaf5ff]'
                      : 'border-[#d8d8d8]'
                  }`}
                  onClick={() => handleDivClick('Pick Up 6 11')}
                >
                  <span
                    className={`bg-no-repeat bg-[length:350px_500px] mr-[11px] ${
                      filter.includes('Pick Up 6 11')
                        ? 'bg-[position:-222px_-145px] w-[20px] h-[18px]'
                        : 'bg-[position:-127px_-13px] w-[21px] h-[19px]'
                    }`}
                    style={{
                      backgroundImage: `url(${Bus})`,
                    }}
                  ></span>
                  <span className="text-sm">6 AM to 11 AM</span>
                </div>
                <div
                  className={`border rounded-2xl flex flex-col justify-center items-center w-[130px] h-[65px] cursor-pointer mt-[2px] mr-[8px] mb-[9px] ml-[2px] float-left left-3 top-0 hover:text-[#008cff] hover:border-[#008cff] hover:bg-[#eaf5ff] ${
                    filter.includes('Pick Up 11 18')
                      ? 'text-[#008cff] border-[#008cff] bg-[#eaf5ff]'
                      : 'border-[#d8d8d8]'
                  }`}
                  onClick={() => handleDivClick('Pick Up 11 18')}
                >
                  <span
                    className={`bg-no-repeat bg-[length:350px_500px] mr-[11px] ${
                      filter.includes('Pick Up 11 18')
                        ? 'bg-[position:-256px_-141px] w-[20px] h-[20px]'
                        : 'bg-[position:-159px_-13px] w-[21px] h-[21px]'
                    }`}
                    style={{
                      backgroundImage: `url(${Bus})`,
                    }}
                  ></span>
                  <span className="text-sm">11 AM to 6 PM</span>
                </div>
                <div
                  className={`border rounded-2xl flex flex-col justify-center items-center w-[130px] h-[65px] cursor-pointer mt-[2px] mr-[8px] mb-[9px] ml-[2px] float-left left-3 top-0 hover:text-[#008cff] hover:border-[#008cff] hover:bg-[#eaf5ff] ${
                    filter.includes('Pick Up 18 23')
                      ? 'text-[#008cff] border-[#008cff] bg-[#eaf5ff]'
                      : 'border-[#d8d8d8]'
                  }`}
                  onClick={() => handleDivClick('Pick Up 18 23')}
                >
                  <span
                    className={`bg-no-repeat bg-[length:350px_500px] mr-[11px] ${
                      filter.includes('Pick Up 18 23')
                        ? 'bg-[position:-284px_-139px] w-[20px] h-[18px]'
                        : 'bg-[position:-191px_-16px] w-[17px] h-[16px]'
                    }`}
                    style={{
                      backgroundImage: `url(${Bus})`,
                    }}
                  ></span>
                  <span className="text-sm">6 PM to 11 PM</span>
                </div>
                <div
                  className={`border rounded-2xl flex flex-col justify-center items-center w-[130px] h-[65px] cursor-pointer mt-[2px] mr-[8px] mb-[9px] ml-[2px] float-left left-3 top-0 hover:text-[#008cff] hover:border-[#008cff] hover:bg-[#eaf5ff] ${
                    filter.includes('Pick Up 23 6')
                      ? 'text-[#008cff] border-[#008cff] bg-[#eaf5ff]'
                      : 'border-[#d8d8d8]'
                  }`}
                  onClick={() => handleDivClick('Pick Up 23 6')}
                >
                  <span
                    className={`bg-no-repeat bg-[length:350px_500px] mr-[11px] ${
                      filter.includes('Pick Up 23 6')
                        ? 'bg-[position:-223px_-180px] w-[16px] h-[18px]'
                        : 'bg-[position:-222px_-14px] w-[16px] h-[18px]'
                    }`}
                    style={{
                      backgroundImage: `url(${Bus})`,
                    }}
                  ></span>
                  <span className="text-sm">11 PM to 6 AM</span>
                </div>
              </div>
            </li>
            <div className="w-auto border-b border-[rgb(231,231,231)] mt-4"></div>
            <li className="pt-4 px-4">
              <div className="flex mb-4 items-center justify-between">
                <div className="cursor-pointer font-semibold">
                  Drop time - {to.split(',')[0]}
                </div>
                <div
                  className={`${
                    containsDrop(filter)
                      ? 'text-[rgb(0,140,255)] cursor-pointer'
                      : 'text-[rgba(0,0,0,0.3)] pointer-events-none'
                  } font-semibold flex justify-center items-center`}
                  onClick={handleClearDrop}
                >
                  CLEAR
                </div>
              </div>
              <div className="flex flex-wrap">
                <div
                  className={`border rounded-2xl flex flex-col justify-center items-center w-[130px] h-[65px] cursor-pointer mt-[2px] mr-[8px] mb-[9px] ml-[2px] float-left left-3 top-0 hover:text-[#008cff] hover:border-[#008cff] hover:bg-[#eaf5ff] ${
                    filter.includes('Drop 6 11')
                      ? 'text-[#008cff] border-[#008cff] bg-[#eaf5ff]'
                      : 'border-[#d8d8d8]'
                  }`}
                  onClick={() => handleDivClick('Drop 6 11')}
                >
                  <span
                    className={`bg-no-repeat bg-[length:350px_500px] mr-[11px] ${
                      filter.includes('Drop 6 11')
                        ? 'bg-[position:-222px_-145px] w-[20px] h-[18px]'
                        : 'bg-[position:-127px_-13px] w-[21px] h-[19px]'
                    }`}
                    style={{
                      backgroundImage: `url(${Bus})`,
                    }}
                  ></span>
                  <span className="text-sm">6 AM to 11 AM</span>
                </div>
                <div
                  className={`border rounded-2xl flex flex-col justify-center items-center w-[130px] h-[65px] cursor-pointer mt-[2px] mr-[8px] mb-[9px] ml-[2px] float-left left-3 top-0 hover:text-[#008cff] hover:border-[#008cff] hover:bg-[#eaf5ff] ${
                    filter.includes('Drop 11 18')
                      ? 'text-[#008cff] border-[#008cff] bg-[#eaf5ff]'
                      : 'border-[#d8d8d8]'
                  }`}
                  onClick={() => handleDivClick('Drop 11 18')}
                >
                  <span
                    className={`bg-no-repeat bg-[length:350px_500px] mr-[11px] ${
                      filter.includes('Drop 11 18')
                        ? 'bg-[position:-256px_-141px] w-[20px] h-[20px]'
                        : 'bg-[position:-159px_-13px] w-[21px] h-[21px]'
                    }`}
                    style={{
                      backgroundImage: `url(${Bus})`,
                    }}
                  ></span>
                  <span className="text-sm">11 AM to 6 PM</span>
                </div>
                <div
                  className={`border rounded-2xl flex flex-col justify-center items-center w-[130px] h-[65px] cursor-pointer mt-[2px] mr-[8px] mb-[9px] ml-[2px] float-left left-3 top-0 hover:text-[#008cff] hover:border-[#008cff] hover:bg-[#eaf5ff] ${
                    filter.includes('Drop 18 23')
                      ? 'text-[#008cff] border-[#008cff] bg-[#eaf5ff]'
                      : 'border-[#d8d8d8]'
                  }`}
                  onClick={() => handleDivClick('Drop 18 23')}
                >
                  <span
                    className={`bg-no-repeat bg-[length:350px_500px] mr-[11px] ${
                      filter.includes('Drop 18 23')
                        ? 'bg-[position:-284px_-139px] w-[20px] h-[18px]'
                        : 'bg-[position:-191px_-16px] w-[17px] h-[16px]'
                    }`}
                    style={{
                      backgroundImage: `url(${Bus})`,
                    }}
                  ></span>
                  <span className="text-sm">6 PM to 11 PM</span>
                </div>
                <div
                  className={`border rounded-2xl flex flex-col justify-center items-center w-[130px] h-[65px] cursor-pointer mt-[2px] mr-[8px] mb-[9px] ml-[2px] float-left left-3 top-0 hover:text-[#008cff] hover:border-[#008cff] hover:bg-[#eaf5ff] ${
                    filter.includes('Drop 23 6')
                      ? 'text-[#008cff] border-[#008cff] bg-[#eaf5ff]'
                      : 'border-[#d8d8d8]'
                  }`}
                  onClick={() => handleDivClick('Drop 23 6')}
                >
                  <span
                    className={`bg-no-repeat bg-[length:350px_500px] mr-[11px] ${
                      filter.includes('Drop 23 6')
                        ? 'bg-[position:-223px_-180px] w-[16px] h-[18px]'
                        : 'bg-[position:-222px_-14px] w-[16px] h-[18px]'
                    }`}
                    style={{
                      backgroundImage: `url(${Bus})`,
                    }}
                  ></span>
                  <span className="text-sm">11 PM to 6 AM</span>
                </div>
              </div>
            </li>
            <div className="w-auto border-b border-[rgb(231,231,231)] mt-4"></div>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default BusesFilter;
