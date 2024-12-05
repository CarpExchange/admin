import ServiceError from '@/components/ServiceError';
import Spinner from '@/components/Spinner';
import { withFetchCustomersQuery } from '@/hooks/queries/useFetchCustomers';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { searchFunction } from '@/hooks/useSearchFunction';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import StatusBadge from '@/components/StatusBadge';
import { EllipsisVertical } from 'lucide-react';
import useFetchFiatDepositsQuery from '@/hooks/queries/useFetchFiatDepositsQuery';

const FiatDepositsTable = ({query}: any) => {
  const [page, setPage] = useState<number>(1);
  const { data, isPending, isSuccess, isError } = useFetchFiatDepositsQuery({
    page,
  });

  const { fiatDeposits, refetch } = data;
  console.log(fiatDeposits);

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
                {fiatDeposits?.map((deposit: any) => (
                  <TableRow
                    key={deposit?.id}
                    onClick={() => {
                      router.push(`/customers/${deposit?.id}`);
                    }}
                    className="cursor-pointer border-t border-[#EAECF0]"
                  >
                    <TableCell>
                      {deposit?.name}
                    </TableCell>
                    <TableCell>{deposit?.bank}</TableCell>
                    <TableCell className="font-medium text-secondary italic pl-3">
                      {deposit?.phone_number}
                    </TableCell>
                    <TableCell>
                      <StatusBadge
                        width={79}
                        statusType={verificationStatus(deposit)}
                      />
                    </TableCell>
                    <TableCell
                      className="w-[46px]"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      <Popover>
                        <PopoverTrigger>
                          <div className="flex items-center justify-center">
                            <EllipsisVertical color="#475467" size={24} />
                          </div>
                        </PopoverTrigger>
                        <PopoverContent className="!translate-x-[-50px] !translate-y-[5px] bg-white border-none w-[220px]">
                          <div className="flex flex-col justify-center items-center gap-1">
                            <button
                              className="py-[10px] text-[14px] px-[15px] hover:bg-blue-200"
                              // onClick={(e: any) => handleSubmit(e)}
                            >
                              Mark as Verified
                            </button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="bg-white flex items-center justify-end space-x-3 p-3 rounded-lg">
            <p>
              1 - {customers?.length} of {allCustomers?.length}
            </p>
            <div className="flex items-center space-x-5">
              <ChevronLeft color={'#4C52594D'} />
              <ChevronRight color={'#4C5259'} />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default FiatDepositsTable;
