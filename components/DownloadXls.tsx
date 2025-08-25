import React from 'react'
import useFetchCustomersQuery from '@/hooks/queries/useFetchCustomers';
import * as XLSX from 'xlsx';
import { ArrowDownCircleIcon } from 'lucide-react';

const DownloadXls = () => {
    const { data } = useFetchCustomersQuery();

    const downloadExcel = (data: any) => {

        // ✅ pick only the fields you want
        const filteredData = data.map((customer: any) => ({
            ID: customer.id,
            First_Name: customer.first_name,
            Last_Name: customer.last_name,
            Email: customer.email,
            Phone: customer.phone_number,
            Verification:
                customer.bvn_is_verified || customer.nin_is_verified
                    ? "Verified"
                    : "Unverified",
            "Created At": new Date(customer.created_at).toLocaleDateString(),
        }));
        // console.log(filteredData.Verification_BVN)

        // Create a new workbook and add the filtered data as a worksheet
        const worksheet = XLSX.utils.json_to_sheet(filteredData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        XLSX.writeFile(workbook, "Kript-Unverified-Users.xlsx");
        // XLSX.writeFile(workbook, "Kript-Unverified-Users.csv")
    };

    return (
        <div>
            <button
                onClick={() => downloadExcel(data?.allCustomers || [])}
                className="bg-[#003399] hover:bg-[#002080] text-white px-4 py-2 rounded-lg shadow transition"
            >
                <p className='hover:animate-bounce'>Download Users Data <ArrowDownCircleIcon className="inline-block ml-2 " /></p>
            </button>
        </div>
    )
}

export default DownloadXls
