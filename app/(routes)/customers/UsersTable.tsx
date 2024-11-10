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

const UsersTable = ({ allCustomers, query, statusType }: any) => {
  console.log(allCustomers);
  console.log(typeof statusType);
  const router = useRouter();

  const [customers, setAllCustomers] = useState([]);

  useEffect(() => {
    if (allCustomers?.length > 0) {
      if (statusType === "all") {
        console.log('dont play')
        setAllCustomers(allCustomers);
      } else if (statusType === "verified") {
        console.log('dont play two')
        const filterVerified = allCustomers?.filter(
          (customer: any) => customer.nin_is_verified || customer.bvn_is_verified
        );
        setAllCustomers(filterVerified);
      } else if (statusType === "unverified") {
        console.log('dont play three')
        const filterUnverified = allCustomers?.filter(
          (customer: any) => !customer.nin_is_verified && !customer.bvn_is_verified
        );
        setAllCustomers(filterUnverified);
      } else {
        setAllCustomers([]);
      }
    }
  }, [allCustomers]);

  console.log(customers, "customers");

  const handleSearch = (word: string) => {
    const filteredCustomer = searchFunction(customers ?? [], word, [
      "item.name",
      "customer.first_name",
      "customer.last_name",
    ]);
    if (filteredCustomer !== undefined) {
      setAllCustomers(filteredCustomer);
    } else {
      setAllCustomers([]);
    }
  };

  useEffect(() => {
    if (query) {
      handleSearch(query);
    } else {
      setAllCustomers(customers);
    }
  }, [query]);

  if (!customers || customers.length === 0) {
    return (
      <div>
        <p>No {statusType} users found!</p>
      </div>
    );
  }

  return (
    <>
      <div className="h-[55vh] overflow-auto">
        <Table className="bg-white rounded-lg p-1 table-fixed">
          <TableHeader className="bg-[#F9FAFB]">
            <TableRow>
              <TableHead className="text-left font-semibold text-secondary w-[277px]">
                Customer
              </TableHead>
              <TableHead className="text-left font-semibold text-secondary w-[217px]">
                Email
              </TableHead>
              <TableHead className="text-left font-semibold text-secondary w-[150px]">
                Phone Number
              </TableHead>
              <TableHead className="text-center font-semibold text-secondary w-[140px]">
                Staus
              </TableHead>
              <TableHead className="w-[140px] text-center font-semibold text-secondary">
                Date
              </TableHead>
              <TableHead className="w-[46px] border-b border-table-bottom"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers?.map((customer) => (
              <TableRow
                key={customer?.id}
                onClick={() => {
                  router.push(`/customers/${customer?.id}`);
                }}
                className="cursor-pointer border-t border-[#EAECF0]"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-[36px] h-[36px] rounded-full bg-gray-500 flex justify-center items-center">
                      <Image src={customer?.profile_picture?.image_url} width={36} height={36} alt={customer?.first_name} />
                    </div>
                    <div>
                      <p className="font-medium text-secondary">
                        {customer?.first_name} {customer?.last_name}
                      </p>
                      <span className="italic text-[14px]">
                        <span>Role</span> &bull;{" "}
                        <span className="text-primary">
                          {customer?.role}
                        </span>
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {customer?.email}
                </TableCell>
                <TableCell className="font-bold text-secondary italic pl-3">
                  {customer?.phone_number}
                </TableCell>
                <TableCell>
                  <StatusBadge width={79} statusType={"active"} />
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
                  <PopoverContent className="!translate-x-[-60px] !translate-y-[5px]">
                    <div className="flex flex-col justify-center items-center gap-1">
                      <DisableButton
                      // @ts-ignore
                        technicianId={technician.id}
                        currentState={technician.availability}
                      />
                      <SuspendButton
                      // @ts-ignore
                        technicianId={technician.id}
                        currentState={technician.is_active}
                      />
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
        <p>1 - 10 of 100</p>
        <div className="flex items-center space-x-5">
          <ChevronLeft color={"#4C52594D"} />
          <ChevronRight color={"#4C5259"} />
        </div>
      </div>
    </>
  );
};

export default withFetchCustomersQuery(UsersTable, {
  components: { ServiceError: ServiceError, Loading: Spinner },
});
