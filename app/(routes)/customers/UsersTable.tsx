import ServiceError from '@/components/ServiceError'
import Spinner from '@/components/Spinner'
import { withFetchCustomersQuery } from '@/hooks/queries/useFetchCustomers'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { searchFunction } from '@/hooks/useSearchFunction'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const UsersTable = ({ allCustomers, query, statusType }: any) => {
  const router = useRouter()

  const [customers, setAllCustomers] = useState([])

  useEffect(() => {
    if (statusType === 'all') {
      setAllCustomers(allCustomers)
    } else if (statusType === 'verified') {
      const filterVerified = allCustomers?.filter((customer: any) => customer.status === 'verified');
      setAllCustomers(filterVerified)
    } else if (statusType === 'unverified') {
      const filterUnverified = allCustomers?.filter((customer: any) => customer.status === 'unverified')
      setAllCustomers(filterUnverified)
    }
  }, [allCustomers])

  const handleSearch = (word: string) => {
    const filteredCustomer = searchFunction(customers ?? [], word, [
      'item.name',
      'customer.first_name',
      'customer.last_name',
    ]); 
    if (filteredCustomer !== undefined) {
      setAllCustomers(filteredCustomer);
    } else {
      setAllCustomers([]);
    }
  }

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
        <p>
          No {statusType} users found!
        </p>
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
                Item Category
              </TableHead>
              <TableHead className="text-left font-semibold text-secondary w-[217px]">
                Customer
              </TableHead>
              <TableHead className="text-left font-semibold text-secondary w-[150px]">
                Subscription
              </TableHead>
              <TableHead className="text-center font-semibold text-secondary w-[140px]">
                Status
              </TableHead>
              <TableHead className="w-[140px] text-center font-semibold text-secondary">
                Date
              </TableHead>
              <TableHead className="w-[46px] border-b border-table-bottom"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {customers.map((appliance) => (
              <TableRow
                key={appliance.id}
                onClick={() => {
                  router.push(`/customers/${appliance.id}`);
                }}
                className="cursor-pointer border-t border-[#EAECF0]"
              >
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-[36px] h-[36px] rounded-full bg-gray-500 flex justify-center items-center">
                      {iconToMap[appliance?.item?.category]}
                    </div>
                    <div>
                      <p className="font-medium text-secondary">
                        {appliance.item?.name}
                      </p>
                      <span className="italic text-[14px]">
                        <span>Cat</span> &bull;{' '}
                        <span className="text-primary">
                          {appliance?.item?.category}
                        </span>
                      </span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  {appliance.customer
                    ? `${appliance.customer.first_name} ${appliance.customer.last_name}`
                    : ''}
                </TableCell>
                <TableCell className="font-bold text-secondary italic pl-3">
                  {appliance.subscription.is_active
                    ? 'Subscribed'
                    : 'Not Subscribed'}
                </TableCell>
                <TableCell>
                  <StatusBadge width={79} statusType={'active'} />
                </TableCell>
                <TableCell className="text-left flex flex-col items-center justify-center">
                  <p className="text-secondary font-medium">
                    {appliance.subscription.start_date ?? 'No start date set.'}
                  </p>
                  {/* <p>{appliance.action}</p> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="bg-white flex items-center justify-end space-x-3 p-3 rounded-lg">
        <p>1 - 10 of 100</p>
        <div className="flex items-center space-x-5">
          <ChevronLeft color={'#4C52594D'} />
          <ChevronRight color={'#4C5259'} />
        </div>
      </div>
    </>
  )
}

export default withFetchCustomersQuery(UsersTable, {
  components: { ServiceError: ServiceError, Loading: Spinner }
})