import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Fragment, useState } from "react";

import { privateApi } from "../../api";
import { TiTick } from "react-icons/ti";
import Loading from "../Loading";
import ErrorComponent from "../ErrorComponent";

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
const ParkingModal = ({ id }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const { isLoading, isError, error, mutate } = useMutation({
    mutationFn: () => {
      return privateApi.post(`/parkings`, { reservation: id });
    },
    onSuccess: () => {
      closeModal();
      navigate("/parkings");
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
      <div onClick={openModal} className="p-1 text-gray-400  cursor-pointer rounded-full ml-2">
        <TiTick className="h-6 text-green-600 w-full" />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child as={Fragment} {...overlayTransitionConfig}>
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} {...dialogTransitionConfig}>
                <Dialog.Panel className="w-full text-center max-w-md transform overflow-hidden rounded-2xl bg-zinc-900 text-white p-6 align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 ">
                    Are you sure you want to start parking?
                  </Dialog.Title>
                  <div className="flex items-center justify-between pt-10 gap-10">
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
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ParkingModal;
