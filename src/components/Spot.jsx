/* eslint-disable react/prop-types */

import { Bike, Car } from "lucide-react";
import ParkingImage from "/parking.webp";
import { Link } from "react-router-dom";

const Spot = ({ spot }) => {
  return (
    <Link to={`/spots/${spot._id}`}>
      <div className="rounded-lg shadow-md pb-2 bg-[#242424]">
        {spot.imageUrls.length >= 1 ? (
          <img src={spot?.imageUrls[0]} className="aspect-video rounded-lg" />
        ) : (
          <img src={ParkingImage} className="aspect-video rounded-lg" />
        )}
        <div className="p-2">
          <div className="flex items-center justify-between">
            <h2 className="text-gray-300">{spot.name}</h2>
            {spot.available ? (
              <p className="bg-green-500 px-2 rounded-full">Available</p>
            ) : (
              <p className="text-red-500">Unavailable</p>
            )}
          </div>
          <p className="text-gray-500 text-xs">{spot.location}</p>

          <div className="flex items-center justify-between">
            <p className="">{spot.spotType}</p>
            <p className="">Rs.{spot.pricePerHour} per hour</p>
          </div>

          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Bike className="h-4 w-4" /> {spot.capacity.bike}
            </div>
            <div className="flex items-center gap-2">
              <Car className="h-4 w-4" /> {spot.capacity.car}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Spot;
