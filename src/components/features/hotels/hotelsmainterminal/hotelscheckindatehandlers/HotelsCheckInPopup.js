import { Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useHotelsMainContext } from '../../../../context/Resort/HotelsMainContext';

function HotelsCheckInPopup() {
  const { dateCheckIn, handleCheckInDateChange, handleCheckInDateClose } =
    useHotelsMainContext();
  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        position: 'absolute',
        bottom: 0,
        left: '35%',
        zIndex: 10, // Ensure it appears above other elements
        backgroundColor: 'white',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '10px',
      }}
    >
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DatePicker
          label="select date"
          value={dateCheckIn}
          onChange={handleCheckInDateChange}
          onAccept={handleCheckInDateClose}
          disablePast
        />
      </LocalizationProvider>
    </Box>
  );
}

export default HotelsCheckInPopup;
