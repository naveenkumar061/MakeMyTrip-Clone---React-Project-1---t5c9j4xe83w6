import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./VitalRoute/Login";
import Register from "./VitalRoute/Register";
import Flights from "./VitalRoute/Flights";
import Hotels from "./VitalRoute/Hotels";
import Trains from "./VitalRoute/Trains";
import Buses from "./VitalRoute/Buses";
import ComingSoon from "./UIManager/ComingSoon";
import PageNotFound from "./VitalRoute/PageNotFound";
import Trips from "./VitalRoute/Trips";
import Booking from "./VitalRoute/Booking";
import ProtectedRoute from "./UIManager/ProtectedRoute";
import AppDesign from "./UIManager/Designs/AppDesign";
import SubDesign from "./UIManager/Designs/SubDesign";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ReactQueryDevtools initialIsOpen={false} />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<AppDesign />}>
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
          <Route element={<SubDesign />}>
            {/* <Route path="/flights/search" element={<FlightsSubTerminal />} />
            <Route path="/hotels/search" element={<HotelsSubTerminal />} /> */}
          </Route>
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
    </QueryClientProvider>
  );
}

export default App;
