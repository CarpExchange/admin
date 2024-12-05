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
import Link from "next/link";

const FiatWithdrawalTable = ({ query }: any) => {
  const [page, setPage] = useState<number>(1);
  const { data, isPending, isSuccess, isError } = useFetchFiatWithdrawalsQuery({
    page,
  });

  const { fiatWithdrawals, refetch } = data;
  console.log(fiatWithdrawals);

  const router = useRouter();

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
                {fiatWithdrawals?.map((withdrawal: any, index: any) => (
                  <TableRow
                    key={withdrawal?.id}
                    onClick={() => {
                      router.push(
                        `/fiat-withdrawals/${withdrawal?.name
                          ?.replace(" ", "-")
                          ?.toLowerCase()}`
                      );
                    }}
                    className="cursor-pointer border-t border-[#EAECF0]"
                  >
                    <TableCell className="w-[20px]">{index + 1}.</TableCell>

                    <TableCell className="font-medium text-secondary">
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
                      <Link
                        key={withdrawal?.id}
                        href={{
                          pathname: `/fiat-withdrawals/${withdrawal?.name
                            ?.replace(" ", "-")
                            ?.toLowerCase()}`,
                          query: { id: withdrawal?.id },
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
              <ChevronLeft color={"#4C52594D"} />
              <ChevronRight color={"#4C5259"} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FiatWithdrawalTable;
