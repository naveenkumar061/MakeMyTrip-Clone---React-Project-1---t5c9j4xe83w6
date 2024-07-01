import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import AppLayout from "./ui/AppLayout";

import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import Trains from "./pages/Trains";
import Buses from "./pages/Buses";
import Trips from "./pages/Trips";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Booking from "./pages/Booking";
import PageNotFound from "./pages/PageNotFound";

import ComingSoon from "./ui/ComingSoon";
import YetToCome from "./ui/YetToCome";
import ProtectedRoute from "./ui/ProtectedRoute";
import { ToggleProvider } from "./context/ToggleContext";
import { FilterProvider } from "./context/FilterContext";
import { FlightsMainProvider } from "./context/Flights/FlightsMainContext";
import { FlightIndividualProvider } from "./context/Flights/FlightsIndividualContext";
import SubLayout from "./ui/SubLayout";
import FlightsSubTerminal from "./details/flights/flightssubterminal/FlightsSubTerminal";
import { HotelsMainProvider } from "./context/Hotels/HotelsMainContext";
import { HotelsIndividualProvider } from "./context/Hotels/HotelsIndividualContext";
import HotelsSubTerminal from "./details/hotels/hotelssubterminal/HotelsSubTerminal";

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
        <FilterProvider>
          <FlightIndividualProvider>
            <FlightsMainProvider>
              <HotelsIndividualProvider>
                <HotelsMainProvider>
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
                      <Route path="/register" element={<Register />} />
                      <Route path="/yettocome" element={<YetToCome />} />
                    </Routes>
                  </BrowserRouter>
                  <Toaster
                    position="top-center"
                    gutter={12}
                    containerStyle={{ margin: "8px" }}
                    toastOptions={{
                      success: { duration: 3000 },
                      error: { duration: 5000 },
                      style: {
                        fontSize: "text-base",
                        maxWidth: "500px",
                        padding: "16px 24px",
                        backgroundColor: "rgb(249 250 251)",
                        color: "rgb(55 65 81)",
                      },
                    }}
                  />
                </HotelsMainProvider>
              </HotelsIndividualProvider>
            </FlightsMainProvider>
          </FlightIndividualProvider>
        </FilterProvider>
      </QueryClientProvider>
    </ToggleProvider>
  );
}

export default App;
