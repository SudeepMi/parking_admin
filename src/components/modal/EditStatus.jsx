import { Dialog, Transition } from "@headlessui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Fragment, useState } from "react";
import { FiMoreVertical } from "react-icons/fi";

import { privateApi } from "../../api";

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
const EditStatus = ({ status, id }) => {
  const queryClient = useQueryClient();
  const statusOptions = ["Pending", "Confirmed", "Cancelled"];
  const [selectedStatus, setSelectedStatus] = useState(status);
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => setIsOpen(false);
  const openModal = () => setIsOpen(true);

  const handleStatusChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedStatus(selectedValue);
  };

  const { isError, error, mutate } = useMutation({
    mutationFn: () => {
      return privateApi.put(`/reservations/${id}/status`, { status: selectedStatus });
    },
    onSuccess: () => {
      closeModal();
      queryClient.invalidateQueries("reservations");
    },
    onError: (err) => {
      console.log("error while log in", err);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate();
  };

  return (
    <>
      <div onClick={openModal} className="p-1 text-gray-400  cursor-pointer rounded-full ml-2">
        <FiMoreVertical className="w-4 h-4" />
      </div>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child as={Fragment} {...overlayTransitionConfig}>
            <div className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child as={Fragment} {...dialogTransitionConfig}>
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-zinc-900 text-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 ">
                    Are you sure you want to delete this vehicle?
                  </Dialog.Title>

                  <form action="" className="mt-10">
                    <select
                      id="countries"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={selectedStatus}
                      onChange={handleStatusChange}
                    >
                      {statusOptions.map((option) => (
                        <option className="text-base" key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </form>

                  {isError && <p className="text-red-500">{error.response.data.message}</p>}

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
                      className="w-full bg-rose-600 py-2 rounded-md hover:bg-rose-700 transition-all ease-in-out"
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

export default EditStatus;
