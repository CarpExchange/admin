import ServiceError from '@/components/ServiceError';
import Spinner from '@/components/Spinner';
import { withFetchCustomersQuery } from '@/hooks/queries/useFetchCustomers';
import { useRouter } from 'next/navigation';
import React, { useContext, useMemo } from 'react';
import { searchInDataset } from '@/hooks/useSearchFunction';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronLeft, ChevronRight, EllipsisVertical } from 'lucide-react';
import Image from 'next/image';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import StatusBadge from '@/components/StatusBadge';
import ManualBVNVerification from './ManualBVNVerification';
import ManualNINVerification from './ManualNINVerification';
import { AuthContext } from '@/components/AuthProvider';
import moment from 'moment';

const UsersTable = ({ allCustomers, query, statusType }: any) => {
  const router = useRouter();

  const {
    state: { user_info },
  } = useContext(AuthContext);

  const uid = user_info?.uid;

  const filteredCustomers = useMemo(() => {
    if (query) {
      return searchInDataset(allCustomers ?? [], query, [
        'phone_number',
        'first_name',
        'email',
        'last_name',
      ]);
    }

    if (statusType === 'verified') {
      return allCustomers?.filter(
        (c: any) => c.nin_is_verified || c.bvn_is_verified
      );
    }

    if (statusType === 'unverified') {
      return allCustomers?.filter(
        (c: any) => !c.nin_is_verified && !c.bvn_is_verified
      );
    }

    return allCustomers;
  }, [allCustomers, query, statusType]);

  const verificationStatus = (customer: any) =>
    customer.nin_is_verified || customer.bvn_is_verified
      ? 'verified'
      : 'unverified';

  if (!filteredCustomers?.length) {
    return (
      <div className="bg-white border border-gray-200 rounded-xl p-10 text-center">
        <p className="text-sm text-gray-500">
          No {statusType} users found.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm flex flex-col">
      {/* Table */}
      <div className="h-[60vh] overflow-auto">
        <Table className="table-auto">
          <TableHeader className="bg-gray-50 sticky top-0 z-10 border-b border-gray-100">
            <TableRow>
              <TableHead className="uppercase text-[11px] tracking-wider text-gray-500 font-semibold py-4">
                Customer
              </TableHead>
              <TableHead className="uppercase text-[11px] tracking-wider text-gray-500 font-semibold">
                Email
              </TableHead>
              <TableHead className="uppercase text-[11px] tracking-wider text-gray-500 font-semibold">
                Phone
              </TableHead>
              <TableHead className="uppercase text-[11px] tracking-wider text-gray-500 font-semibold text-center">
                Status
              </TableHead>
              <TableHead className="uppercase text-[11px] tracking-wider text-gray-500 font-semibold">
                Created
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>

          <TableBody className="divide-y divide-gray-100">
            {filteredCustomers.map((customer: any) => (
              <TableRow
                key={customer.id}
                onClick={() => router.push(`/customers/${customer.id}`)}
                className="hover:bg-gray-50 transition cursor-pointer"
              >
                {/* Customer */}
                <TableCell className="py-4">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10">
                      <Image
                        src={
                          customer?.profile_picture?.image_url ||
                          '/assets/avatar.png'
                        }
                        width={40}
                        height={40}
                        className="rounded-full object-cover border border-gray-200"
                        alt={customer?.first_name}
                      />
                    </div>

                    <div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {customer.first_name} {customer.last_name}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {customer.role}
                      </p>

                      {customer?.security_data?.black_listed && (
                        <p className="text-xs text-red-500 mt-1">
                          Blacklisted
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>

                {/* Email */}
                <TableCell className="text-sm text-gray-700">
                  {customer.email}
                </TableCell>

                {/* Phone */}
                <TableCell className="text-sm text-gray-600">
                  {customer.phone_number}
                </TableCell>

                {/* Status */}
                <TableCell className="text-center">
                  <StatusBadge
                    width={85}
                    statusType={verificationStatus(customer)}
                  />
                </TableCell>

                {/* Created */}
                <TableCell className="text-sm text-gray-600">
                  <div>
                    {moment(customer.created_at).format('D MMM YYYY')}
                  </div>
                  <div className="text-xs text-gray-400">
                    {moment(customer.created_at).format('hh:mm a')}
                  </div>
                </TableCell>

                {/* Actions */}
                <TableCell
                  onClick={(e) => e.stopPropagation()}
                  className="text-right pr-4"
                >
                  {!customer.bvn_is_verified &&
                    !customer.nin_is_verified && (
                      <Popover>
                        <PopoverTrigger>
                          <EllipsisVertical
                            size={18}
                            className="text-gray-500 hover:text-gray-700"
                          />
                        </PopoverTrigger>
                        <PopoverContent className="w-[220px] p-3 border border-gray-200 shadow-md rounded-lg">
                          <div className="flex flex-col gap-2">
                            <ManualBVNVerification
                            id={uid}
                            email={customer.email}
                            verification_type="bvn" 
                            status={'true'}                            />
                            <ManualNINVerification
                            id={uid}
                            email={customer.email}
                            verification_type="nin" 
                            status={'true'}                            />
                          </div>
                        </PopoverContent>
                      </Popover>
                    )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Footer */}
      <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between text-sm text-gray-500">
        <span>
          Showing {filteredCustomers.length} of {filteredCustomers.length} users
        </span>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-md hover:bg-gray-100">
            <ChevronLeft size={18} />
          </button>
          <button className="p-2 rounded-md hover:bg-gray-100">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default withFetchCustomersQuery(UsersTable, {
  components: { ServiceError, Loading: Spinner },
});