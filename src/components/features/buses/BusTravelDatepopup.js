import { Box } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { useBusesMainContext } from '../../context/Buses/BusesMainContext';

function BusTravelDatepopup() {
  const { date, handleDateChange, handleDateClose } = useBusesMainContext();

  return (
    <Box
      onClick={(e) => e.stopPropagation()}
      sx={{
        position: 'absolute',
        width: '100%',
        left: '0',
        zIndex: 10,
        backgroundColor: 'white',
        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        padding: '10px',
        '@media (min-width: 768px)': {
          left: '65.95%',
          width: '35%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
        },
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

export default BusTravelDatepopup;
