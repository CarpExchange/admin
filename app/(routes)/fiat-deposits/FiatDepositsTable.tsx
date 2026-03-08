import ServiceError from "@/components/ServiceError";
import Spinner from "@/components/Spinner";
import React, { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import useFetchFiatDepositsQuery from "@/hooks/queries/useFetchFiatDepositsQuery";
import FiatDepositActionModal from "./FiatDepositActionModal";
import moment from "moment";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const FiatDepositsTable = ({ query }: any) => {
  const [page, setPage] = useState<number>(1);

  const { data, isPending, isSuccess, isError } =
    useFetchFiatDepositsQuery({ page });

  const { fiatDeposits } = data || {};

  const handlePageCount = (type: "forward" | "backward") => {
    if (type === "forward") {
      setPage((prev) => prev + 1);
    }

    if (type === "backward" && page > 1) {
      setPage((prev) => prev - 1);
    }
  };

  return (
    <>
      {isError && <ServiceError />}
      {isPending && <Spinner />}

      {isSuccess && (
        <>
          <div className="overflow-x-auto rounded-xl border bg-white">

            <div className="px-4 py-3 border-b">
              <h6 className="text-lg font-semibold text-primary">
                Page {page}
              </h6>
            </div>

            <Table>
              <TableHeader className="bg-gray-50 sticky top-0">
                <TableRow>
                  <TableHead className="w-[30px]">#</TableHead>

                  <TableHead className="font-semibold">
                    Name
                  </TableHead>

                  <TableHead className="font-semibold">
                    Amount
                  </TableHead>

                  {/* Hidden on mobile */}
                  <TableHead className="hidden md:table-cell font-semibold">
                    Bank
                  </TableHead>

                  <TableHead className="hidden md:table-cell font-semibold">
                    Rate
                  </TableHead>

                  <TableHead className="hidden md:table-cell font-semibold">
                    Created Date
                  </TableHead>

                  <TableHead className="text-center font-semibold">
                    Status
                  </TableHead>

                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {fiatDeposits?.map((deposit: any, index: number) => (
                  <TableRow
                    key={deposit?.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <TableCell>{index + 1}</TableCell>

                    {/* NAME */}
                    <TableCell className="font-medium">
                      {deposit?.name}
                    </TableCell>

                    {/* AMOUNT */}
                    <TableCell className="font-medium text-secondary">
                      ₦{deposit?.amount?.toLocaleString()}
                    </TableCell>

                    {/* DESKTOP ONLY */}
                    <TableCell className="hidden md:table-cell">
                      {deposit?.bank}
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      ₦{deposit?.rate?.toLocaleString()}
                    </TableCell>

                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {moment(deposit?.CreatedAt).format("DD MMM YYYY")}
                        </span>
                        <span className="text-xs text-gray-500">
                          {moment(deposit?.CreatedAt).format("hh:mm a")}
                        </span>
                      </div>
                    </TableCell>

                    {/* STATUS */}
                    <TableCell className="text-center">
                      <StatusBadge
                        width={70}
                        statusType={deposit?.status}
                      />
                    </TableCell>

                    {/* ACTION */}
                    <TableCell>
                      <FiatDepositActionModal depositDetail={deposit} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex justify-end items-center mt-4 gap-4">

            <button
              onClick={() => handlePageCount("backward")}
              disabled={page === 1}
              className="p-2 rounded-lg border hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronLeft size={20} />
            </button>

            <span className="font-medium text-sm">
              Page {page}
            </span>

            <button
              onClick={() => handlePageCount("forward")}
              className="p-2 rounded-lg border hover:bg-gray-100"
            >
              <ChevronRight size={20} />
            </button>

          </div>
        </>
      )}
    </>
  );
};

export default FiatDepositsTable;