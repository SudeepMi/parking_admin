import Moment from "moment";
import { useQuery } from "@tanstack/react-query";
import { privateApi } from "../api";
import Loading from "../components/Loading";
import ErrorComponent from "../components/ErrorComponent";
import PaymentModal from "../components/modal/PaymentModal";
import StopParkingModal from "../components/modal/StopParkingModal";

const Parkings = () => {
  const {
    data: parkings,
    isLoading,
    isError,
    error,
  } = useQuery(["parkings"], async () => {
    const res = await privateApi.get("/parkings");
    return res.data.parkings;
  });

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <div>
        <ErrorComponent label="Dashboard" error={error} />
      </div>
    );
  }

  return (
    <div className="container mx-auto my-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {parkings.map((parking) => (
        <div key={parking._id} className="bg-zinc-800 rounded-lg overflow-hidden shadow-md h-full flex flex-col">
          {parking.status === "Payment Pending" ? (
            <div className="w-full py-2 text-center bg-yellow-600">Payment Pending</div>
          ) : parking.status === "Exited" ? (
            <div className="w-full py-2 text-center bg-red-600">Exited from parking</div>
          ) : (
            <div className="w-full py-2 text-center bg-green-600">Parking</div>
          )}

          <div className="p-4 flex-grow">
            <h2 className="font-semibold">Reservation Id: {parking.reservation}</h2>
            <p className="flex items-center mt-2">
              enter: {parking.enteredTime ? Moment(parking.enteredTime).format("Y-M-D, h:mm a") : "N/A"}
            </p>

            {parking.status !== "Parked" && (
              <>
                <p>exit: {parking.exitedTime ? Moment(parking.exitedTime).format("Y-M-D, h:mm a") : "N/A"}</p>
                <p>Total Amount: ${parking.totalAmount.toFixed(2)}</p>
                {/* <p>Payment status: {parking?.payment?.paymentStatus}</p> */}
                {parking?.payment?.paymentStatus !== "Successful" ? (
                  <div>
                    {parking?.payment?.remainingAmount && (
                      <>
                        <p>Payment status: {parking?.payment?.paymentStatus}</p>
                        <p>Remaining Payment: ${parking.payment.remainingAmount.toFixed(2)}</p>
                      </>
                    )}
                  </div>
                ) : (
                  <p className="text-green-400">Payment {parking.payment.paymentStatus}</p>
                )}
              </>
            )}
          </div>

          <div className="">
            {parking.status === "Payment Pending" ? (
              <PaymentModal id={parking._id} totalAmount={parking.totalAmount.toFixed(2)} />
            ) : parking.status === "Exited" ? (
              <div className="w-full px-4 text-gray-400 my-4 cursor-pointer rounded-full">
                <p className="border border-purple-500 hover:border-purple-700 transition-all text-white text-center py-2 rounded-md">
                  Delete Parking
                </p>
              </div>
            ) : (
              <StopParkingModal id={parking._id} />
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Parkings;
