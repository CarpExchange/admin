import React, { useState } from "react";
import ServiceError from "@/components/ServiceError";
import Spinner from "@/components/Spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import useFetchFiatWithdrawalsQuery from "@/hooks/queries/useFetchWithdrawalQuery";
import FiatWithdrawalActionModal from "./FiatWIthdrawalActionModal";
import moment from "moment";

const FiatWithdrawalTable = ({ query }: any) => {
  const [page, setPage] = useState<number>(1);

  const { data, isPending, isSuccess, isError } =
    useFetchFiatWithdrawalsQuery({ page });

  const { fiatWithdrawals } = data || {};

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

            {/* Header */}
            <div className="px-4 py-3 border-b">
              <h6 className="text-lg font-semibold text-primary">
                Page {page}
              </h6>
            </div>

            <Table>
              <TableHeader className="bg-gray-50 sticky top-0">
                <TableRow>
                  <TableHead className="w-[30px]">#</TableHead>

                  {/* MOBILE + DESKTOP */}
                  <TableHead className="font-semibold">
                    Amount
                  </TableHead>

                  {/* DESKTOP ONLY */}
                  <TableHead className="hidden md:table-cell font-semibold">
                    Rate
                  </TableHead>

                  <TableHead className="hidden md:table-cell font-semibold">
                    Created Date
                  </TableHead>

                  {/* MOBILE + DESKTOP */}
                  <TableHead className="text-center font-semibold">
                    Status
                  </TableHead>

                  <TableHead className="w-[60px]"></TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {fiatWithdrawals?.map((withdrawal: any, index: number) => (
                  <TableRow
                    key={withdrawal?.id}
                    className="hover:bg-gray-50 transition"
                  >
                    <TableCell>{index + 1}</TableCell>

                    {/* AMOUNT */}
                    <TableCell className="font-semibold text-secondary">
                      {withdrawal?.amount?.toLocaleString()} USDT
                    </TableCell>

                    {/* RATE - DESKTOP */}
                    <TableCell className="hidden md:table-cell">
                      ₦{withdrawal?.rate?.toLocaleString()}
                    </TableCell>

                    {/* DATE - DESKTOP */}
                    <TableCell className="hidden md:table-cell">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {moment(withdrawal?.CreatedAt).format("DD MMM YYYY")}
                        </span>
                        <span className="text-xs text-gray-500">
                          {moment(withdrawal?.CreatedAt).format("hh:mm a")}
                        </span>
                      </div>
                    </TableCell>

                    {/* STATUS */}
                    <TableCell className="text-center">
                      <StatusBadge
                        width={70}
                        statusType={withdrawal?.status?.toLowerCase()}
                      />
                    </TableCell>

                    {/* ACTION */}
                    <TableCell>
                      <FiatWithdrawalActionModal
                        page={page}
                        withdrawalDetail={withdrawal}
                      />
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
              className="flex items-center gap-1 px-3 py-1 border rounded-lg hover:bg-gray-100 disabled:opacity-40"
            >
              <ChevronLeft size={18} />
              Prev
            </button>

            <span className="text-sm font-medium">
              Page {page}
            </span>

            <button
              onClick={() => handlePageCount("forward")}
              className="flex items-center gap-1 px-3 py-1 border rounded-lg hover:bg-gray-100"
            >
              Next
              <ChevronRight size={18} />
            </button>

          </div>
        </>
      )}
    </>
  );
};

export default FiatWithdrawalTable;