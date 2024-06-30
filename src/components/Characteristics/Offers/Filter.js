// Context import
import { useOffersInsightContext } from "../../WebDevGuru/Offers/OffersInsightContext";

// Filter component definition
function Filter({ options, onChange }) {
  // Destructure clickedValue and handleClick from the custom hook useFilterOptions
  const { clickedValue, handleClick } = useOffersInsightContext();

  return (
    <div className="flex gap-2 border-b p-1 max-650:flex-col">
      {/* Map over the options array to render buttons for each filter option */}
      {options.map((option, index) => (
        <button
          key={index} // Unique key for each button element
          onClick={() => {
            handleClick(option.type); // Call handleClick with the option type
            onChange(); // Call the onChange function passed as a prop
          }}
          disabled={option.type === clickedValue} // Disable the button if the option type matches the clicked value
          className={
            option.type === clickedValue ? "border-b-2 border-blue-500 p-1" : "" // Apply specific styles if the option type matches the clicked value
          }
        >
          {option.label} {/* Display the option label */}
        </button>
      ))}
    </div>
  );
}

export default Filter;
