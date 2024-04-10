/* eslint-disable react/prop-types */
import moment from "moment";
import { Link } from "react-router-dom";
import { Bike, Car } from "lucide-react";

import EditStatus from "./modal/EditStatus";
import ParkingModal from "./modal/ParkingModal";

const TableRow = ({ reservation }) => {
  const formattedStartTime = moment(reservation.startTime).format("DD MMM, HH:mm A");
  const formattedEndTime = moment(reservation.endTime).format("DD MMM, HH:mm A");

  const iconMap = {
    car: <Car className="h-4 w-4" />,
    bike: <Bike className="h-4 w-4" />,
  };

  return (
  
    <tr className="text-base">
      <td className="border px-4 py-2 text-blue-600 hover:underline">
        <Link to={`/customers/${reservation.customer._id}`}>{reservation?.customer?.name}</Link>
      </td>
      <td className="flex items-center justify-between border px-4 py-2">
        {iconMap[reservation?.vehicle?.vehicleType] ?? iconMap["car"]} {reservation?.vehicle?.licensePlate ?? "LIS"}
      </td>
      <td className="border px-4 py-2">{reservation?.parkingSpot?.name}</td>
      <td className="border px-4 py-2">{formattedStartTime}</td>
      <td className="border px-4 py-2">{formattedEndTime}</td>
      <td
        className={`flex items-center justify-between border px-4 py-2 ${
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

      <td className="border px-4 py-2">Rs-{reservation.totalCost.toFixed(2)}</td>
      <td className="border px-4 py-2">
        <ParkingModal id={reservation._id} />
      </td>
    </tr>
  );
};

export default TableRow;
