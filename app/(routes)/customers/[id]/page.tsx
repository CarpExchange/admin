"use client"
import ServiceError from "@/components/ServiceError";
import Spinner from "@/components/Spinner";
import { withFetchAUserQuery } from "@/hooks/queries/useFetchSingleUser";
import React from "react";

const CustomerDetails = ({ singleUserDetails }: any) => {
  console.log(singleUserDetails, "singleUserDetails");
  return <div>CustomerDetails</div>;
};

export default withFetchAUserQuery(CustomerDetails, {
  components: { ServiceError: ServiceError, Loading: Spinner },
});
