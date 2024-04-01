import { useQuery } from "@tanstack/react-query";

import Reservations from "./Reservations";
import { privateApi } from "../api";
import Loading from "./Loading";
import ErrorComponent from "./ErrorComponent";

const Dashboard = () => {
  const {
    data: totalSpots,
    isLoading: isLoadingSpots,
    isError: isErrorSpots,
    error: errorSpots,
  } = useQuery(["totalSpots"], async () => {
    const res = await privateApi.get("/spots/p/total");
    return res.data.total;
  });

  const {
    data: totalVehicles,
    isLoading: isLoadingVehicles,
    isError: isErrorVehicles,
    error: errorVehicles,
  } = useQuery(["totalVehicles"], async () => {
    const res = await privateApi.get("/vehicles/total");
    return res.data.total;
  });

  const {
    data: totalReservations,
    isLoading: isLoadingReservations,
    isError: isErrorReservations,
    error: errorReservations,
  } = useQuery(["totalReservations"], async () => {
    const res = await privateApi.get("/reservations/total");
    return res.data.total;
  });

  const {
    data: totalCustomers,
    isLoading: isLoadingCustomers,
    isError: isErrorCustomers,
    error: errorCustomers,
  } = useQuery(["totalCustomers"], async () => {
    const res = await privateApi.get("/users/total");
    return res.data.total;
  });

  if (isLoadingSpots || isLoadingVehicles || isLoadingReservations || isLoadingCustomers) {
    return <Loading />;
  }

  if (isErrorSpots || isErrorVehicles || isErrorReservations || isErrorCustomers) {
    return (
      <div>
        <ErrorComponent label="Dashboard" error={errorSpots || errorVehicles || errorReservations || errorCustomers} />
      </div>
    );
  }

  return (
    <div className="my-10">
      <div className="grid sm:grid-cols-4 gap-10 my-4">
        <div className="w-full rounded-lg border border-purple-300 hover:shadow-md hover:border-purple-500 cursor-pointer transition-colors p-4">
          <h1 className="text-xl">Total Parking Spots</h1>
          <div className="text-2xl">{totalSpots}</div>
        </div>
        <div className="w-full rounded-lg border border-purple-300 hover:shadow-md hover:border-purple-500 cursor-pointer transition-colors p-4">
          <h1 className="text-xl">Total Vehicles</h1>
          <div className="text-2xl">{totalVehicles}</div>
        </div>
        <div className="w-full rounded-lg border border-purple-300 hover:shadow-md hover:border-purple-500 cursor-pointer transition-colors p-4">
          <h1 className="text-xl">Total Reservations</h1>
          <div className="text-2xl">{totalReservations}</div>
        </div>
        <div className="w-full rounded-lg border border-purple-300 hover:shadow-md hover:border-purple-500 cursor-pointer transition-colors p-4">
          <h1 className="text-xl">Total Customers</h1>
          <div className="text-2xl">{totalCustomers}</div>
        </div>
      </div>

      <Reservations />
    </div>
  );
};

export default Dashboard;
