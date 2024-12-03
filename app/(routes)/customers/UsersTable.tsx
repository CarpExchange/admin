import ServiceError from "@/components/ServiceError";
import Spinner from "@/components/Spinner";
import { withFetchCustomersQuery } from "@/hooks/queries/useFetchCustomers";
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
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import StatusBadge from "@/components/StatusBadge";
import { EllipsisVertical } from "lucide-react";

const UsersTable = ({ allCustomers, query, statusType }: any) => {
  const router = useRouter();

  const [customers, setAllCustomers] = useState([]);

  useEffect(() => {
    let filteredCustomers = allCustomers;

    if (statusType === 'verified') {
      filteredCustomers = allCustomers?.filter(
        (customer: any) => customer.nin_is_verified || customer.bvn_is_verified
      );
    } else if (statusType === 'unverified') {
      filteredCustomers = allCustomers?.filter(
        (customer: any) => !customer.nin_is_verified && !customer.bvn_is_verified
      );
    } else if (statusType !== 'all') {
      filteredCustomers = [];
    }

    if (query) {
      filteredCustomers = searchFunction(filteredCustomers, query, [
        'phone_number',
        'first_name',
        'email',
        'last_name',
      ]);
    }

    setAllCustomers(filteredCustomers || []);
  }, [allCustomers, statusType, query]);

  if (!customers || customers.length === 0) {
    return (
      <div>
        <p className="capitalize"> {statusType} users not found!</p>
      </div>
    );
  }

  const verificationStatus = (customer: any) => {
    if (customer.nin_is_verified || customer.bvn_is_verified) {
      return "verified";
    } else {
      return "unverified";
    }
  }

  return (
    <>
      <div className="h-[55vh] overflow-auto">
        <Table className="bg-white rounded-lg p-1">
          <TableHeader className="bg-[#F9FAFB]">
            <TableRow>
              <TableHead className="text-left font-semibold text-secondary w-[200px]">
                Customer
              </TableHead>
              <TableHead className="text-left font-semibold text-secondary w-[180px]">
                Email
              </TableHead>
              <TableHead className="text-left font-semibold text-secondary w-[140px]">
                Phone Number
              </TableHead>
              <TableHead className="text-center font-semibold text-secondary w-[130px]">
                Staus
              </TableHead>
              <TableHead className="w-[46px] border-b border-table-bottom"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers?.map((customer: any) => (
              <TableRow
                key={customer?.id}
                onClick={() => {
                  router.push(`/customers/${customer?.id}`);
                }}
                className="cursor-pointer border-t border-[#EAECF0]"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-[40px] h-[40px] rounded-full bg-gray-500 flex justify-center items-center">
                      <Image
                        src={customer?.profile_picture?.image_url ? `${customer?.profile_picture?.image_url}` : '/assets/avatar.png'}
                        width={36}
                        height={36}
                        className="rounded-full h-[40px] w-[40px]"
                        alt={customer?.first_name}
                      />
                    </div>
                    <div>
                      <p className="font-medium text-secondary">
                        {customer?.first_name} {customer?.last_name}
                      </p>
                      <span className="italic text-[14px]">
                        <span>Role</span> &bull;{' '}
                        <span className="text-primary">{customer?.role}</span>
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>{customer?.email}</TableCell>
                <TableCell className="font-medium text-secondary italic pl-3">
                  {customer?.phone_number}
                </TableCell>
                <TableCell>
                  <StatusBadge width={79} statusType={verificationStatus(customer)} />
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
        <p>1 - {customers?.length} of {allCustomers?.length}</p>
        <div className="flex items-center space-x-5">
          <ChevronLeft color={'#4C52594D'} />
          <ChevronRight color={'#4C5259'} />
        </div>
      </div>
    </>
  );
};

export default withFetchCustomersQuery(UsersTable, {
  components: { ServiceError: ServiceError, Loading: Spinner },
});
