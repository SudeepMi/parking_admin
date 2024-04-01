import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

import { privateApi } from "../api";
import Loading from "../components/Loading";
import UserProfile from "../components/Profile";
import ErrorComponent from "../components/ErrorComponent";

const Customer = () => {
  const { id } = useParams();

  const {
    data: customer,
    isLoading,
    isError,
    error,
  } = useQuery(["customer", id], async () => {
    const res = await privateApi.get(`/users/${id}`);
    return res.data.user;
  });

  if (isLoading) return <Loading />;

  if (isError) {
    return <ErrorComponent label="Customer Profile" error={error} />;
  }

  return <UserProfile user={customer} />;
};

export default Customer;
