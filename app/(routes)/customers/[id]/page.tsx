"use client";
import ServiceError from "@/components/ServiceError";
import Spinner from "@/components/Spinner";
import { withFetchAUserQuery } from "@/hooks/queries/useFetchSingleUser";
import { ArrowLeft } from "lucide-react";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import StatusBadge from "@/components/StatusBadge";

const CustomerDetails = ({ singleUserDetails }: any) => {
  console.log(singleUserDetails, "singleUserDetails");
  return (
    <div className="bg-gray-100 h-full max-h-full pt-[24px] pb-[48px] px-[20px]">
      <Link
        href="/customers"
        className="flex flex-row gap-4 items-center w-fit mb-6"
      >
        <div className="w-[32px] h-[32px] rounded-[23px] bg-blue-200 flex items-center justify-center">
          <ArrowLeft color="#039" size={24} />
        </div>
        <span className="text-primary font-figtree font-semibold">Go back</span>
      </Link>
      <div className="flex flex-col gap-[28px]">
        <div className="flex flex-col gap-1 font-figtree text-secondary">
          <h2 className="font-semibold text-2xl ">User details</h2>
          <p className="text-secondary">Manage and monitor user details</p>
        </div>

        <div className="mt-6 bg-white rounded-[8px] py-2">
          <div className="flex flex-row gap-2">
            <div>
              <Image
                src={
                  singleUserDetails?.profile_picture?.image_url ??
                  "/assets/avatar.png"
                }
                alt={`${singleUserDetails?.first_name} image`}
                className="w-[120px] h-[120px] rounded-full object-cover"
                width={120}
                height={120}
              />
            </div>

            <div className="flex flex-col gap-2 ">
              <h5 className="font-figtree font-bold leading-[22px] text-black-200">
                <b>Name: </b>
                {singleUserDetails?.first_name} {singleUserDetails?.last_name}
              </h5>
              <h6 className="font-figtree leading-[22px] text-black-200">
                <b>Email: </b>
                {singleUserDetails?.email}
              </h6>
              <div className="flex justify-between gap-5 items-center">
                <p className="font-figtree font-medium leading-[22px] text-black-200">
                  <b>Phone Number: </b>
                  {singleUserDetails.phone ?? "NA"}
                </p>

                <span>
                  <StatusBadge
                    statusType={singleUserDetails?.status?.toLowerCase()}
                    width={79}
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withFetchAUserQuery(CustomerDetails, {
  components: { ServiceError: ServiceError, Loading: Spinner },
});
