/* eslint-disable react/prop-types */

import { Bike, Car, DollarSign } from "lucide-react";
import { FcDoNotMix, FcServices } from "react-icons/fc";

import parkingImage from "/parking.webp";
import { privateApi } from "../api";
import Loading from "./Loading";

import { useMutation, useQueryClient } from "@tanstack/react-query";

const ParkingSpotInfo = ({ spot }) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    async () => {
      await privateApi.put(`/spots/${spot._id}/avaliability`);
    },
    {
      onError: (error) => {
        console.log("error while updating", error.response.data);
        // Rollback the state in case of an error
        queryClient.invalidateQueries(["spot", spot._id]);
      },
      onSuccess: () => {
        // Invalidate the query to trigger a refetch
        queryClient.invalidateQueries(["spot", spot._id]);
      },
    }
  );

  const isAvailable = spot.available;

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate();
  };

  if (isLoading) {
    return <Loading />;
  }

  const deleteParkingSpot = (id) => {
    privateApi.delete("/spots/"+id).then(()=>{
      location.replace("/spots")
    })

  }

  return (
    <div className="flex flex-col gap-4 my-6">
      {isAvailable ? (
        <div className="sm:flex items-center justify-between gap-4 bg-green-600 px-4 py-2 rounded-sm">
          <div className="flex items-center">
            <FcServices className="h-10 w-10" />
            <p className="text-2xl">Available</p>
          </div>
          <button onClick={handleSubmit} className="py-1 px-4 bg-red-600 hover:bg-red-700 rounded-sm">
            Mark as unavailable
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between gap-4 bg-red-600 px-4 py-2 rounded-sm">
          <div className="flex items-center">
            <FcDoNotMix className="h-10 w-10" />
            <p className="text-2xl">Unavailable</p>
          </div>
          <button onClick={handleSubmit} className="py-1 px-4 bg-green-600 rounded-sm">
            Mark as available
          </button>
        </div>
      )}
      {spot.imageUrls.length >= 1 ? (
        <img src={spot.imageUrls[0]} alt="Parking Spot" className="w-half h-96" />
      ) : (
        <img src={parkingImage} alt="ok" className="w-50 max-h-96" />
      )}

      <div className="grid sm:grid-cols-2 sm:gap-10">
        <div className="">
          <h2 className="text-4xl font-semibold">{spot.name}</h2>
          <div className="text-lg text-gray-300">{spot.description}</div>
          <div className="text-base text-gray-400">{spot.location}</div>
        </div>

        <div className="border border-orange-700 hover:border-orange-400 cursor-pointer transition-colors py-6 rounded">
          <div className="flex items-center px-8 justify-between">
            <div className="flex items-center gap-4">
              <p className="text-2xl font-semibold">Total Revenue</p>
            </div>
              <h2 className="font-4xl text-2xl">Rs.</h2>
            <p className="text-4xl pr-2">{spot?.revenue.toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-10 my-10">
        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl">Total Capacity</h2>
          <div className="grid grid-cols-2 gap-10">
            <div className="border border-lime-700 hover:border-lime-400 cursor-pointer transition-colors py-6 rounded">
              <div className="flex items-center px-4 justify-between">
                <Bike className="h-10 w-10" />
                <p className="text-4xl">{spot.capacity.bike}</p>
              </div>
            </div>
            <div className="border border-lime-700 hover:border-lime-400 cursor-pointer transition-colors py-6 rounded">
              <div className="flex items-center px-4 justify-between">
                <Car className="h-10 w-10" />
                <p className="text-4xl">{spot.capacity.car}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <h2 className="text-2xl">Total Reservations</h2>
          <div className="grid grid-cols-2 gap-10">
            <div className="border border-green-400 hover:border-green-700 cursor-pointer transition-colors py-6 rounded">
              <div className="flex items-center px-4 justify-between">
                <Bike className="h-10 w-10" />
                <p className="text-4xl">{spot.reservations?.bike.length ?? 0}</p>
              </div>
            </div>
            <div className="border border-green-400 hover:border-green-700 cursor-pointer transition-colors py-6 rounded">
              <div className="flex items-center px-4 justify-between">
                <Car className="h-10 w-10" />
                <p className="text-4xl">{spot.reservations?.car.length ?? 0}</p>
              </div>
              
            </div>
          </div>
        </div>
        <div className="w-full px-4 text-gray-400 my-4 cursor-pointer rounded-full ">
                <p className="border border-purple-500 hover:border-purple-700 transition-all text-white text-center py-2 rounded-md" onClick={()=>deleteParkingSpot(spot._id)}>
                  Delete Parking
                </p>
              </div>
      </div>
    </div>
  );
};

export default ParkingSpotInfo;
