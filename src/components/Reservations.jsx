import { useQuery } from "@tanstack/react-query";

import { privateApi } from "../api";
import TableRow from "./TableRow";
import Loading from "./Loading";
import ErrorComponent from "./ErrorComponent";
import PieChart from "./charts/PieChart";
import LineChart from "./charts/LineChart";
import RevenueChart from "./charts/RevenueChart";

const TableHeader = () => (
  <thead className="text-sm">
    <tr>
      <th className="px-4 py-2 border">Customer Name</th>
      <th className="px-4 py-2 border">Vehicle</th>
      <th className="px-4 py-2 border">Parking Place</th>
      <th className="px-4 py-2 border">Start Time</th>
      <th className="px-4 py-2 border">End Time</th>
      <th className="px-4 py-2 border">Status</th>
      <th className="px-4 py-2 border">Total Cost</th>
      <th className="px-4 py-2 border">Issue Parking</th>
    </tr>
  </thead>
);

const Reservations = () => {
  const {
    data: reservations,
    isLoading,
    isError,
    error,
  } = useQuery(["reservations"], async () => {
    const response = await privateApi.get("reservations");
    return response.data.reservations;
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorComponent label="Reservations" error={error} />;
  }

  return (
    <div>
      <div className="grid sm:grid-cols-2 place-items-center my-10 p-4 border border-purple-400 rounded-md">
        <PieChart reservations={reservations} />
        <LineChart reservations={reservations} />
      </div>
      <div className="flex items-center justify-center w-full my-10 p-4 border border-purple-400 rounded-md">
        <RevenueChart />
      </div>

      <h1 className="text-2xl font-bold mb-4">Reservations</h1>
      <div className="border border-gray-300 rounded-lg my-4 overflow-x-auto">
        <table className="min-w-full">
          <TableHeader />
          <tbody>
            {reservations.map((reservation, index) => (
              <TableRow key={reservation._id} reservation={reservation} index={index} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Reservations;
