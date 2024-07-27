import { useOffersContext } from '../../context/offers/OffersContext';

function OFilters({ options, onChange }) {
  const { clickedValue, handleClick } = useOffersContext();
  return (
    <div className="flex flex-col md:flex-row gap-2 border-b p-1">
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => {
            handleClick(option.type);
            onChange();
          }}
          disabled={option.type === clickedValue}
          className={
            option.type === clickedValue ? 'border-b-2 border-blue-500 p-1' : ''
          }
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default OFilters;
