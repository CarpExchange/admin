import React, { useState } from "react";
import ServiceError from "@/components/ServiceError";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import { searchFunction } from "@/hooks/useSearchFunction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  EllipsisVertical,
} from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import useFetchFiatWithdrawalsQuery from "@/hooks/queries/useFetchWithdrawalQuery";
import FiatWithdrawalActionModal from "./FiatWIthdrawalActionModal";

const FiatWithdrawalTable = ({ query }: any) => {
  const [page, setPage] = useState<number>(1);
  const { data, isPending, isSuccess, isError } = useFetchFiatWithdrawalsQuery({
    page,
  });

  const { fiatWithdrawals, refetch } = data;
  // console.log(fiatWithdrawals);

  const router = useRouter();

  // const canGo = (type: 'forward' | 'backward') => {
  //   // if (!observationsData?.pageCount) return false;

  //   return type === 'forward' ? page < observationsData.pageCount : page > 1; // Backward only if page > 1
  // };

  const handlePageCount = (type: "forward" | "backward") => {
    // if (canGo(type)) {
    setPage(type === "forward" ? page + 1 : page - 1);
    // }
  };

  // const getPageDescription = (
  //   page: number,
  //   itemsPerPage: number,
  //   totalItems: number,
  // ): string => {
  //   const start = (page - 1) * itemsPerPage + 1; // Starting index for the current page
  //   const end = Math.min(page * itemsPerPage, totalItems); // Ending index for the current page
  //   return `${start}-${end}`;
  // };

  return (
    <>
      {isError && <ServiceError />}
      {isPending && <Spinner />}
      {isSuccess && (
        <>
          <div className="h-[55vh] overflow-auto">
          <h6 className="text-lg font-semibold text-primary my-2">Page {page}</h6>
            <Table className="bg-white rounded-lg p-1">
              <TableHeader className="bg-[#F9FAFB]">
                <TableRow>
                  <TableHead className="w-[20px] border-b border-table-bottom"></TableHead>
                  <TableHead className="text-left font-semibold text-secondary w-[140px]">
                    Amount of USDT
                  </TableHead>
                  <TableHead className="text-left font-semibold text-secondary w-[180px]">
                    Rate
                  </TableHead>
                  <TableHead className="text-center font-semibold text-secondary w-[130px]">
                    Status
                  </TableHead>
                  <TableHead className="w-[46px] border-b border-table-bottom"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {fiatWithdrawals?.map((withdrawal: any, index: any) => (
                  <TableRow
                    key={withdrawal?.id}
                    className="cursor-pointer border-t border-[#EAECF0]"
                  >
                    <TableCell className="w-[20px]">{index + 1}.</TableCell>

                    <TableCell className="font-semibold text-secondary ">
                      {withdrawal?.amount?.toLocaleString()}
                    </TableCell>
                    <TableCell>₦{withdrawal?.rate?.toLocaleString()}</TableCell>
                    <TableCell>
                      <div>
                        <StatusBadge
                          width={60}
                          statusType={withdrawal?.status?.toLowerCase()}
                        />
                      </div>
                    </TableCell>
                    <TableCell className="w-[46px]">
                      <FiatWithdrawalActionModal page={page} withdrawalDetail={withdrawal} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="bg-white flex items-center justify-end space-x-3 p-3 rounded-lg">
            {/* <p>
              1 - {customers?.length} of {allCustomers?.length}
            </p> */}
            <div className="flex items-center space-x-5">
              <div
                className="cursor-pointer"
                onClick={() => {
                  handlePageCount("backward");
                }}
              >
                <ChevronLeft color={"#4C5259"} />
              </div>

              <div
                className="cursor-pointer"
                onClick={() => {
                  handlePageCount("forward");
                }}
              >
                <ChevronRight color={"#4C5259"} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FiatWithdrawalTable;
