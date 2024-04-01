import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { DollarSign } from "lucide-react";

import Loading from "../Loading";
import ErrorComponent from "../ErrorComponent";
import { privateAxios } from "../../../../parking_ui/src/api";

const dialogTransitionConfig = {
  enter: "ease-out duration-300",
  enterFrom: "opacity-0 scale-95",
  enterTo: "opacity-100 scale-100",
  leave: "ease-in duration-200",
  leaveFrom: "opacity-100 scale-100",
  leaveTo: "opacity-0 scale-95",
};

const overlayTransitionConfig = {
  enter: "ease-out duration-300",
  enterFrom: "opacity-0",
  enterTo: "opacity-100",
  leave: "ease-in duration-200",
  leaveFrom: "opacity-100",
  leaveTo: "opacity-0",
};

// eslint-disable-next-line react/prop-types
const PaymentModal = ({ id, totalAmount }) => {
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(""); // Form state for the input field
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const { isLoading, isError, error, mutate } = useMutation({
    mutationFn: () => {
      return privateAxios.post(`/payments`, { parkingId: id, amount, paymentMethod: "Physical" });
    },
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries("parkings");
    },
    onError: (err) => {
      console.log("error while log in", err);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate();
  };

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
    <>
      <div onClick={openModal} className="w-full px-4  text-gray-400 my-4 cursor-pointer rounded-full">
        <p className="border border-purple-500 hover:border-purple-700 transition-all text-white text-center py-2 rounded-md">
          Pay Amount
        </p>
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child as={Fragment} {...overlayTransitionConfig}>
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} {...dialogTransitionConfig}>
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-900 text-white p-6 align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="flex items-center text-lg font-medium leading-6 ">
                    <DollarSign className="h-6 w-6" />
                    Are you sure you want to continue payment ?
                  </Dialog.Title>
                  <div className="grid pt-10 gap-4">
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        className="w-full bg-zinc-800 py-2 px-3 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-zinc-400"
                      />
                      <p className="my-2 text-left">Your total bill is of ${totalAmount}</p>
                    </form>

                    <div className="flex items-center justify-between gap-4">
                      <button
                        type="button"
                        className="w-full bg-zinc-700 py-2 rounded-md hover:bg-zinc-800 transition-all ease-in-out"
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="w-full bg-green-600 py-2 rounded-md hover:bg-green-700 transition-all ease-in-out"
                        onClick={handleSubmit}
                      >
                        Continue
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PaymentModal;
