// Importing third-party libraries
import { Box } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

// Importing context
import { useFlightsMainContext } from '../../../../context/Flights/FlightsMainContext';

// FlightsDatePopup component
function FlightsDatePopup() {
  // Destructuring context values
  const { date, handleDateChange, handleDateClose } = useFlightsMainContext();

  return (
    <Box
      // Stop propagation to prevent closing when clicking inside the box
      onClick={(e) => e.stopPropagation()}
      sx={{
        position: 'absolute',
        width: '100%',
        left: '0',
        zIndex: 10, // Ensure it appears above other elements
        backgroundColor: 'white',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '10px',
        // Styles for min-width 640px
        '@media (min-width: 640px)': {
          left: '50%',
          width: '30%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        },
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select date"
          value={date} // Current selected date
          onChange={handleDateChange} // Handler for date change
          onAccept={handleDateClose} // Handler when date is accepted
          disablePast // Disable past dates
          sx={{ width: '100%' }}
        />
      </LocalizationProvider>
    </Box>
  );
}

export default FlightsDatePopup;
