import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useFlightsMainContext } from '../../../../context/Flights/FlightsMainContext';

function FlightsSubDatePopup() {
  const { date, handleDateChange, handleDateClose } = useFlightsMainContext();
  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        padding: '10px',
        position: 'absolute',
        backgroundColor: 'white',
        zIndex: 10,
        width: '100%',
        left: 0,
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="select date"
          value={date}
          onChange={handleDateChange}
          onAccept={handleDateClose}
          disablePast
          sx={{ width: '100%' }}
        />
      </LocalizationProvider>
    </Box>
  );
}

export default FlightsSubDatePopup;
