import { Box } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useTrainsMainContext } from '../../context/Trains/TrainsMainContext';

function TrainsSubDatePopup() {
  const { date, handleDateChange, handleDateClose } = useTrainsMainContext();

  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        position: 'absolute',
        width: '100%',
        top: '3.5rem',
        left: '0',
        zIndex: 10,
        backgroundColor: 'white',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '10px',
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="Select date"
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

export default TrainsSubDatePopup;
