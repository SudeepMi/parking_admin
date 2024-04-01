import { useQuery } from "@tanstack/react-query";

import { publicApi } from "../api";
import Spot from "../components/Spot";
import Loading from "../components/Loading";
import ErrorComponent from "../components/ErrorComponent";

const ParkingSpots = () => {
  const {
    data: spots,
    error,
    isLoading,
    isError,
  } = useQuery(["spots"], async () => {
    const response = await publicApi.get("spots");
    return response.data.spots;
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <ErrorComponent label="Parking Places" error={error} />;
  }

  return (
    <section className="my-10">
      <div className="grid md:grid-cols-4 gap-4">
        {spots.map((spot) => (
          <Spot key={spot._id} spot={spot} />
        ))}
      </div>
    </section>
  );
};

export default ParkingSpots;
