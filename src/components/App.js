import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'react-hot-toast';

import Flights from './pages/Flights';
import Hotels from './pages/Hotels';
import Trains from './pages/Trains';
import Buses from './pages/Buses';
import Trips from './pages/Trips';
import Login from './pages/Login';
import PageNotFound from './pages/PageNotFound';
import { ToggleProvider } from './context/togglebar/ToggleContext';
import { OffersProvider } from './context/offers/OffersContext';
import { FlightIndividualProvider } from './context/Flights/FlightsIndividualContext';
import { FlightsMainProvider } from './context/Flights/FlightsMainContext';
import { HotelsIndividualProvider } from './context/Resort/HotelsIndividualContext';
import { HotelsMainProvider } from './context/Resort/HotelsMainContext';
import SubLayout from './layouts/SubLayout';
import FlightsSubTerminal from './features/flights/flightssubterminal/FlightsSubTerminal';
import HotelsSubTerminal from './features/hotels/hotelssubterminal/HotelsSubTerminal';
import AppLayout from './layouts/AppLayout';
import ProtectedRoute from './features/auth/ProtectedRoute';
import YetToCome from './utils/YetToCome';
import HotelIndividual from './features/hotels/hotelsincity/HotelIndividual';
import { TrainsMainProvider } from './context/Trains/TrainsMainContext';
import TrainsSubTerminal from './features/trains/TrainsSubTerminal';
import ComingSoon from './pages/ComingSoon';
import TrainBook from './pages/TrainBook';
import HotelBook from './pages/HotelBook';
import FlightBook from './pages/FlightBook';

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <ToggleProvider>
      <QueryClientProvider client={queryClient}>
        <OffersProvider>
          <FlightIndividualProvider>
            <FlightsMainProvider>
              <HotelsIndividualProvider>
                <HotelsMainProvider>
                  <TrainsMainProvider>
                    <BrowserRouter>
                      <ReactQueryDevtools initialIsOpen={false} />
                      <Routes>
                        <Route element={<SubLayout />}>
                          <Route
                            path="/flights/search"
                            element={<FlightsSubTerminal />}
                          />
                          <Route
                            path="/hotels/search"
                            element={<HotelsSubTerminal />}
                          />
                          <Route
                            path="/flights/results/flightBooking"
                            element={
                              <ProtectedRoute>
                                <FlightBook />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/hotels/results/details"
                            element={<HotelIndividual />}
                          />
                          <Route
                            path="/hotels/results/details/hotelBooking"
                            element={
                              <ProtectedRoute>
                                <HotelBook />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/railways/search"
                            element={<TrainsSubTerminal />}
                          />
                          <Route
                            path="/railways/results/booking"
                            element={
                              <ProtectedRoute>
                                <TrainBook />
                              </ProtectedRoute>
                            }
                          />
                          <Route
                            path="/trips"
                            element={
                              <ProtectedRoute>
                                <Trips />
                              </ProtectedRoute>
                            }
                          />
                        </Route>
                        <Route element={<AppLayout />}>
                          <Route
                            path="/"
                            element={<Navigate to="/flights" replace />}
                          />
                          <Route path="/flights" element={<Flights />} />
                          <Route path="/hotels" element={<Hotels />} />
                          <Route path="/railways" element={<Trains />} />
                          <Route path="/bus-tickets" element={<Buses />} />
                          <Route path="/homestays" element={<ComingSoon />} />
                          <Route
                            path="/holidays-india"
                            element={<ComingSoon />}
                          />
                          <Route path="/cabs" element={<ComingSoon />} />
                          <Route path="/forex" element={<ComingSoon />} />
                          <Route path="/insurance" element={<ComingSoon />} />
                          <Route path="*" element={<PageNotFound />} />
                        </Route>
                        <Route path="/login" element={<Login />} />
                        <Route path="/yettocome" element={<YetToCome />} />
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
                  </TrainsMainProvider>
                </HotelsMainProvider>
              </HotelsIndividualProvider>
            </FlightsMainProvider>
          </FlightIndividualProvider>
        </OffersProvider>
      </QueryClientProvider>
    </ToggleProvider>
  );
}

export default App;
