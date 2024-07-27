import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';
import PageNotFound from './pages/PageNotFound';
import AppLayout from './layouts/AppLayout';
import Flights from './pages/Flights';
import Hotels from './pages/Hotels';
import Trains from './pages/Trains';
import Buses from './pages/Buses';
import ComingSoon from './pages/ComingSoon';
import Trips from './pages/Trips';
import Booking from './pages/Booking';
import ProtectedRoute from './features/auth/ProtectedRoute';
import Login from './pages/Login';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={<Navigate to="/flights" replace />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/railways" element={<Trains />} />
            <Route path="/bus-tickets" element={<Buses />} />
            <Route path="/homestays" element={<ComingSoon />} />
            <Route path="/holidays-india" element={<ComingSoon />} />
            <Route path="/cabs" element={<ComingSoon />} />
            <Route path="/forex" element={<ComingSoon />} />
            <Route path="/insurance" element={<ComingSoon />} />
            <Route path="*" element={<PageNotFound />} />
            <Route
              path="/trips"
              element={
                <ProtectedRoute>
                  <Trips />
                </ProtectedRoute>
              }
            />
            <Route
              path="/booking"
              element={
                <ProtectedRoute>
                  <Booking />
                </ProtectedRoute>
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: '8px' }}
        toastOptions={{
          success: { duration: 3000 },
          error: { duration: 5000 },
          style: {
            fontSize: 'text-base',
            maxWidth: '500px',
            padding: '16px 24px',
            backgroundColor: 'rgb(249 250 251)',
            color: 'rgb(55 65 81)',
          },
        }}
      />
    </QueryClientProvider>
  );
}

export default App;
