/* eslint-disable react/prop-types */
import { Bike, Car } from "lucide-react";
import moment from "moment";

import EditStatus from "./modal/EditStatus";

const UserProfile = ({ user }) => {
  const formatDateTime = (dateTime) => {
    return moment(dateTime).format("Y-M-D, h:mm A");
  };

  const iconMap = {
    car: <Car className="h-10 w-10" />,
    bike: <Bike className="h-10 w-10" />,
  };

  return (
    <div className="p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-4">{user.name}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {user.vehicles.length > 0 ? (
          user.vehicles.map((vehicle) => (
            <div
              key={vehicle?._id}
              className="rounded-lg shadow-md border border-pink-400 hover:border-pink-600 cursor-pointer transition-colors p-4"
            >
              <h4 className="text-lg font-semibold mb-2">{iconMap[vehicle?.vehicleType] ?? iconMap["car"]}</h4>
              <p className="text-gray-200">Model: {vehicle?.model ?? "LIS"}</p>
              <p className="text-gray-200">Liscense Number: {vehicle?.licensePlate}</p>
              <p className="text-gray-200">Registration: {formatDateTime(vehicle?.createdAt)}</p>
            </div>
          ))
        ) : (
          <p>No vehicles found.</p>
        )}
      </div>

      <h3 className="text-xl font-semibold my-4">Reservations</h3>
      {user.reservations.length > 0 ? (
        <table className="table-auto">
          <thead className="text-lg">
            <tr>
              <th className="px-4 py-2 border">Reservation ID</th>
              <th className="px-4 py-2 border">Parking Place</th>
              <th className="px-4 py-2 border">Vehicle</th>
              <th className="px-4 py-2 border">Start Time</th>
              <th className="px-4 py-2 border">End Time</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {user.reservations.map((reservation) => (
              <tr key={reservation._id} className="text-sm">
                <td className="border px-4 py-2">{reservation._id}</td>
                <td className="border px-4 py-2">{reservation.parkingSpot.name}</td>
                <td className="border px-4 py-2">
                  {reservation?.vehicle?.model} ({reservation?.vehicle?.licensePlate ?? "LIS"})
                </td>
                <td className="border px-4 py-2">{formatDateTime(reservation.startTime)}</td>
                <td className="border px-4 py-2">{formatDateTime(reservation.endTime)}</td>
                <td
                  className={`flex items-center justify-between h-full border px-4 py-2 ${
                    reservation.status === "Pending"
                      ? "text-yellow-500"
                      : reservation.status === "Confirmed"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {reservation.status}
                  <EditStatus status={reservation.status} id={reservation._id} />
                </td>
                <td className="border px-4 py-2">Rs.{Math.round(reservation.totalCost)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No reservations found.</p>
      )}
    </div>
  );
};

export default UserProfile;
