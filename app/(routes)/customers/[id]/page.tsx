'use client';
import ServiceError from '@/components/ServiceError';
import Spinner from '@/components/Spinner';
import { withFetchAUserQuery } from '@/hooks/queries/useFetchSingleUser';
import { ArrowLeft, Copy } from 'lucide-react';
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import StatusBadge from '@/components/StatusBadge';
import copy from 'copy-to-clipboard';
import { useToast } from '@/hooks/use-toast';
import moment from 'moment';
import BlacklistUserBtn from '@/components/users/BlacklistUserBtn';

const CustomerDetails = ({ singleUserDetails }: any) => {
  const { toast } = useToast();
  const { security_data } = singleUserDetails;

  const handleCopy = (title: string, value: string) => {
    copy(`${value}`);
    toast({
      title: `${title} copied successfully`,
      variant: 'success',
    });
  };

  const verificationStatus = (customer: any) => {
    if (customer.nin_is_verified || customer.bvn_is_verified) {
      return 'verified';
    } else {
      return 'unverified';
    }
  };

  return (
    <div className="h-full max-h-full pt-6 px-4 md:px-0">

      {/* BACK BUTTON */}
      <div className="w-full border-b border-b-primary pb-4">
        <Link
          href="/customers"
          className="flex flex-row gap-4 items-center w-fit"
        >
          <div className="w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center">
            <ArrowLeft color="#039" size={24} />
          </div>

          <span className="text-primary font-semibold">
            Go back
          </span>
        </Link>

        <div className="mt-4">
          <h2 className="font-semibold text-2xl">User details</h2>
          <p className="text-secondary">
            Manage and monitor user details
          </p>
        </div>
      </div>


      {/* USER HEADER */}
      <div className="bg-white rounded-lg border border-gray-100 p-6 mt-6 flex items-center justify-between">

        <div className="flex items-center gap-4">

          <Image
            src={
              singleUserDetails?.profile_picture?.image_url ??
              '/assets/avatar.png'
            }
            alt="profile"
            width={64}
            height={64}
            className="rounded-full object-cover"
          />

          <div className="flex flex-col">

            <h3 className="text-lg font-semibold">
              {singleUserDetails?.first_name} {singleUserDetails?.last_name}
            </h3>

            <p className="text-sm text-gray-500">
              {singleUserDetails?.email}
            </p>

            <div className="flex items-center gap-2 mt-1">
              <StatusBadge
                statusType={verificationStatus(singleUserDetails)}
              />

              <span className="text-xs text-gray-400">
                Created {moment(singleUserDetails?.created_at).fromNow()}
              </span>
            </div>

          </div>
        </div>

        <div className="flex gap-3">

          <button className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50">
            View Transactions
          </button>

          <button className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50">
            View Deposits
          </button>

          <button className="px-4 py-2 border rounded-md text-sm hover:bg-gray-50">
            View Withdrawals
          </button>

        </div>

      </div>


      <div className="flex flex-col md:flex-row gap-6 mt-6">

        {/* MAIN CONTENT */}
        <div className="md:w-3/4 grid md:grid-cols-2 gap-6">

          {/* KYC CARD */}
          <div className="bg-white rounded-lg border p-5">

            <h4 className="font-semibold mb-4">
              KYC Information
            </h4>

            {singleUserDetails?.kyc ? (

              <div className="grid grid-cols-2 gap-4 text-sm">

                <p>
                  <b>First Name:</b>{' '}
                  {singleUserDetails?.kyc?.first_name ?? 'NA'}
                </p>

                <p>
                  <b>Last Name:</b>{' '}
                  {singleUserDetails?.kyc?.last_name ?? 'NA'}
                </p>

                <p>
                  <b>DOB:</b>{' '}
                  {singleUserDetails?.kyc?.date_of_birth ?? 'NA'}
                </p>

                <p>
                  <b>Gender:</b>{' '}
                  {singleUserDetails?.kyc?.gender ?? 'NA'}
                </p>

                <p>
                  <b>BVN:</b>{' '}
                  {singleUserDetails?.kyc?.bvn ?? 'NA'}
                </p>

                <p>
                  <b>NIN:</b>{' '}
                  {singleUserDetails?.kyc?.nin ?? 'NA'}
                </p>

                <p>
                  <b>BVN Confidence:</b>{' '}
                  {singleUserDetails?.kyc?.bvn_confidence_level
                    ? `${singleUserDetails?.kyc?.bvn_confidence_level.toFixed(2)}%`
                    : 'NA'}
                </p>

                <p>
                  <b>NIN Confidence:</b>{' '}
                  {singleUserDetails?.kyc?.nin_confidence_level
                    ? `${singleUserDetails?.kyc?.nin_confidence_level.toFixed(2)}%`
                    : 'NA'}
                </p>

              </div>

            ) : (
              <p>KYC details unavailable</p>
            )}

          </div>


          {/* WALLET CARD */}
          <div className="bg-white rounded-lg border p-5">

            <h4 className="font-semibold mb-4">
              Wallet Details
            </h4>

            <div className="flex flex-col gap-3 text-sm">

              <p>
                <b>Wallet ID:</b>{' '}
                {singleUserDetails?.wallet?.wallet_uid ?? 'NA'}
              </p>

              <p>
                <b>Address:</b>{' '}
                {singleUserDetails?.wallet?.address ?? 'NA'}
              </p>

              <p>
                <b>Network:</b>{' '}
                {singleUserDetails?.wallet?.network ?? 'NA'}
              </p>

              <p>
                <b>Currency:</b>{' '}
                {singleUserDetails?.wallet?.currency ?? 'NA'}
              </p>

            </div>

          </div>


          {/* BANKING */}
          <div className="bg-white rounded-lg border p-5">

            <h4 className="font-semibold mb-4">
              Withdrawal Account
            </h4>

            <div className="flex flex-col gap-3 text-sm">

              <p>
                <b>Account Name:</b>{' '}
                {singleUserDetails?.withdrawal_account?.account_name ?? 'NA'}
              </p>

              <p>
                <b>Account Number:</b>{' '}
                {singleUserDetails?.withdrawal_account?.account_number ?? 'NA'}
              </p>

              <p>
                <b>Bank Name:</b>{' '}
                {singleUserDetails?.withdrawal_account?.bank_name ?? 'NA'}
              </p>

              <p>
                <b>Bank Code:</b>{' '}
                {singleUserDetails?.withdrawal_account?.bank_code ?? 'NA'}
              </p>

            </div>

          </div>


          {/* DEPOSIT ACCOUNT */}
          <div className="bg-white rounded-lg border p-5">

            <h4 className="font-semibold mb-4">
              Deposit Account
            </h4>

            <div className="flex flex-col gap-3 text-sm">

              <p>
                <b>Account Name:</b>{' '}
                {singleUserDetails?.deposit_account?.account_name ?? 'NA'}
              </p>

              <p>
                <b>Account Number:</b>{' '}
                {singleUserDetails?.deposit_account?.account_number ?? 'NA'}
              </p>

              <p>
                <b>Bank Name:</b>{' '}
                {singleUserDetails?.deposit_account?.bank_name ?? 'NA'}
              </p>

              <p>
                <b>Account Type:</b>{' '}
                {singleUserDetails?.deposit_account?.account_type ?? 'NA'}
              </p>

            </div>

          </div>


          {/* SECURITY */}
          <div className="bg-white rounded-lg border p-5 md:col-span-2">

            <h4 className="font-semibold mb-4">
              Security Information
            </h4>

            <div className="grid md:grid-cols-2 gap-4 text-sm">

              <p>
                <b>Last Login:</b>{' '}
                {moment(security_data?.last_login_time).format(
                  'MMMM Do YYYY, h:mm:ss a'
                )}
              </p>

              <p>
                <b>Login IP:</b>{' '}
                {security_data?.last_login_ip ?? 'NA'}
              </p>

              <p>
                <b>Password Reset Requested:</b>{' '}
                {security_data?.initiate_reset_password ? 'Yes' : 'No'}
              </p>

              <p>
                <b>Pin Reset Requested:</b>{' '}
                {security_data?.initiate_reset_pin ? 'Yes' : 'No'}
              </p>

            </div>

            <div className="mt-6">

              <h5 className="mb-2">
                {security_data?.black_listed
                  ? 'User is blacklisted'
                  : 'User is not blacklisted'}
              </h5>

              <BlacklistUserBtn
              // @ts-ignore
                status={security_data?.black_listed}
                userId={singleUserDetails?.id}
              />

            </div>

          </div>

        </div>


        {/* RIGHT SIDEBAR */}
        <div className="md:w-1/4 flex flex-col gap-6">

          {/* USER META */}
          <div className="bg-white rounded-lg border p-4 flex flex-col gap-3">

            <p><b>User ID:</b> {singleUserDetails?.id}</p>
            <p><b>Username:</b> {singleUserDetails?.username}</p>
            <p><b>Phone:</b> {singleUserDetails?.phone_number}</p>
            <p><b>Role:</b> {singleUserDetails?.role}</p>
            <p><b>Preferred Asset:</b> {singleUserDetails?.asset}</p>

            <p>
              <b>Account Created:</b>{' '}
              {moment(singleUserDetails?.created_at).format(
                'MMMM Do YYYY'
              )}
            </p>

          </div>


          {/* ADMIN ACTIONS */}
          <div className="bg-white rounded-lg border p-4">

            <h4 className="font-semibold mb-4">
              Admin Actions
            </h4>

            <div className="flex flex-col gap-3">

              <button className="w-full py-2 border rounded-md text-sm hover:bg-gray-50">
                Reset Password
              </button>

              <button className="w-full py-2 border rounded-md text-sm hover:bg-gray-50">
                Reset PIN
              </button>

              <button className="w-full py-2 border rounded-md text-sm hover:bg-gray-50">
                View Login History
              </button>

              <button className="w-full py-2 border rounded-md text-red-600 hover:bg-red-50">
                Suspend Account
              </button>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default withFetchAUserQuery(CustomerDetails, {
  components: { ServiceError: ServiceError, Loading: Spinner },
});