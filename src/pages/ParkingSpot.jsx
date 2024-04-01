import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import { privateApi } from "../api";

import Loading from "../components/Loading";
import ParkingSpotInfo from "../components/ParkinsSpotInfo";
import ErrorComponent from "../components/ErrorComponent";

const ParkingSpot = () => {
  const { id } = useParams();

  const {
    data: spot,
    isLoading,
    isError,
    error,
  } = useQuery(["spot", id], async () => {
    const response = await privateApi.get(`/spots/${id}`);
    return response.data.spot;
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorComponent label="Reservations" error={error} />;
  }
  return <ParkingSpotInfo spot={spot} />;
};

export default ParkingSpot;
