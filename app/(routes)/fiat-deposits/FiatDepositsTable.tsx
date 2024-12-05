import ServiceError from "@/components/ServiceError";
import Spinner from "@/components/Spinner";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { searchFunction } from "@/hooks/useSearchFunction";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, ChevronLeft, ChevronRight, EllipsisVertical } from "lucide-react";
import StatusBadge from "@/components/StatusBadge";
import useFetchFiatDepositsQuery from "@/hooks/queries/useFetchFiatDepositsQuery";
import Link from "next/link";

const FiatDepositsTable = ({ query }: any) => {
  const [page, setPage] = useState<number>(1);
  const { data, isPending, isSuccess, isError } = useFetchFiatDepositsQuery({
    page,
  });

  const router = useRouter();

  const { fiatDeposits, refetch } = data;
  console.log(fiatDeposits);

  const canGo = (type: 'forward' | 'backward') => {
    // if (!observationsData?.pageCount) return false;

    return type === 'forward' ? page < observationsData.pageCount : page > 1; // Backward only if page > 1
  };

  const handlePageCount = (type: 'forward' | 'backward') => {
    // if (canGo(type)) {
      setPage(type === 'forward' ? page + 1 : page - 1);
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
            <Table className="bg-white rounded-lg p-1">
              <TableHeader className="bg-[#F9FAFB]">
                <TableRow>
                  <TableHead className="w-[20px] border-b border-table-bottom"></TableHead>
                  <TableHead className="text-left font-semibold text-secondary w-[200px]">
                    Account Name
                  </TableHead>
                  <TableHead className="text-left font-semibold text-secondary w-[180px]">
                    Bank
                  </TableHead>
                  <TableHead className="text-left font-semibold text-secondary w-[140px]">
                    Amount
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
                {fiatDeposits?.map((deposit: any, index: any) => (
                  <TableRow
                    key={deposit?.id}
                    onClick={() => {
                      router.push(`/fiat-deposits/${deposit?.name?.replace(' ', '-')?.toLowerCase()}`);
                    }}
                    className="cursor-pointer border-t border-[#EAECF0]"
                  >
                    <TableCell className="w-[20px]">{index + 1}.</TableCell>
                    <TableCell>{deposit?.name}</TableCell>
                    <TableCell>{deposit?.bank}</TableCell>
                    <TableCell className="font-medium text-secondary pl-3">
                      ₦{deposit?.amount?.toLocaleString()}
                    </TableCell>
                    <TableCell>₦{deposit?.rate?.toLocaleString()}</TableCell>
                    <TableCell>
                      <StatusBadge width={60} statusType={deposit?.status} />
                    </TableCell>
                    <TableCell className="w-[46px]">
                      <Link
                        key={deposit?.id}
                        href={{
                          pathname: `/fiat-deposits/${deposit?.name
                            ?.replace(" ", "-")
                            ?.toLowerCase()}`,
                          query: { id: deposit?.id },
                        }}
                      >
                        <div className="flex items-center justify-center">
                          <ArrowRight color="#475467" size={24} />
                        </div>
                      </Link>
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
                  handlePageCount('backward');
                }}
              >
              <ChevronLeft color={"#4C5259"} />
              </div>

              <div
                className="cursor-pointer"
                onClick={() => {
                  handlePageCount('forward');
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

export default FiatDepositsTable;
