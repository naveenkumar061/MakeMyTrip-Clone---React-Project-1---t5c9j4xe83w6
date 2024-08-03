import { useEffect, useState } from 'react';
import { useHotelsMainContext } from '../../../context/Resort/HotelsMainContext';

function HotelsSort() {
  const { setSort } = useHotelsMainContext();

  const [name, setName] = useState(true);
  const [highRating, setHighRating] = useState(false);
  const [highPrice, setHighPrice] = useState(false);
  const [lowPrice, setLowPrice] = useState(false);

  useEffect(() => {
    setName(true);
    setHighRating(false);
    setHighPrice(false);
    setLowPrice(false);
    setSort('popular');
  }, [setSort]);

  function handlePopular() {
    setName(true);
    setHighRating(false);
    setHighPrice(false);
    setLowPrice(false);
    setSort('popular');
  }

  function handleHighRating() {
    setName(false);
    setHighRating(true);
    setHighPrice(false);
    setLowPrice(false);
    setSort('highest rating');
  }

  function handleHighPrice() {
    setName(false);
    setHighRating(false);
    setHighPrice(true);
    setLowPrice(false);
    setSort('highest price');
  }

  function handleLowPrice() {
    setName(false);
    setHighRating(false);
    setHighPrice(false);
    setLowPrice(true);
    setSort('lowest price');
  }

  return (
    <div className="sticky top-16 z-[2] mb-8 flex h-fit items-center flex-wrap justify-around border border-b border-cyan-400 bg-cyan-100 px-20">
      <h1 className="font-semibold uppercase">Sort By:</h1>
      <h1
        className={`${
          name
            ? 'border-b-[3px] border-blue-500 py-[0.65rem] text-center font-bold text-blue-500'
            : 'font-semibold text-gray-600'
        } cursor-pointer`}
        onClick={handlePopular}
      >
        Popular
      </h1>
      <h1
        className={`${
          highRating
            ? 'border-b-[3px] border-blue-500 py-[0.65rem] text-center font-bold text-blue-500'
            : 'font-semibold text-gray-600'
        } cursor-pointer`}
        onClick={handleHighRating}
      >
        User Rating{' '}
        <span
          className={`${
            highRating
              ? 'text-center font-normal text-blue-500'
              : 'font-normal text-zinc-400'
          }`}
        >
          (Highest First)
        </span>
      </h1>
      <h1
        className={`${
          highPrice
            ? 'border-b-[3px] border-blue-500 py-[0.65rem] text-center font-bold text-blue-500'
            : 'font-semibold text-gray-600'
        } cursor-pointer`}
        onClick={handleHighPrice}
      >
        Price{' '}
        <span
          className={`${
            highPrice
              ? 'text-center font-normal text-blue-500'
              : 'font-normal text-zinc-400'
          }`}
        >
          (Highest First)
        </span>
      </h1>
      <h1
        className={`${
          lowPrice
            ? 'border-b-[3px] border-blue-500 py-[0.65rem] text-center font-bold text-blue-500'
            : 'font-semibold text-gray-600'
        } cursor-pointer`}
        onClick={handleLowPrice}
      >
        Price{' '}
        <span
          className={`${
            lowPrice
              ? 'text-center font-normal text-blue-500'
              : 'font-normal text-zinc-400'
          }`}
        >
          (Lowest First)
        </span>
      </h1>
    </div>
  );
}

export default HotelsSort;
