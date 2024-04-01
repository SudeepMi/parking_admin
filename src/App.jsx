import { useContext } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import { TokensContext } from "./hooks/useTokens";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Parking from "./pages/Parking";
import SpotForm from "./pages/SpotForm";
import Parkings from "./pages/Parkings";
import Reservation from "./pages/Customer";
import ParkingSpot from "./pages/ParkingSpot";
import ParkingSpots from "./pages/ParkingSpots";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        element={
          <RequireAuth>
            <Layout />
          </RequireAuth>
        }
      >
        <Route index element={<Home />} />
        <Route path="/spots" element={<ParkingSpots />} />
        <Route path="/parkings" element={<Parkings />} />
        <Route path="/parkings/id" element={<Parking />} />
        <Route path="/create-spot" element={<SpotForm />} />
        <Route path="/customers/:id" element={<Reservation />} />
        <Route path="/spots/:id" element={<ParkingSpot />} />
      </Route>
    </Routes>
  );
}
// eslint-disable-next-line react/prop-types
function RequireAuth({ children }) {
  const { accessToken } = useContext(TokensContext);

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

function Layout() {
  return (
    <div className="bg-zinc-900 w-full min-h-screen flex flex-col text-white">
      <Navbar />
      <main className="flex-1 w-11/12 mx-auto mt-16">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
