'use client';
import ServiceError from '@/components/ServiceError';
import Spinner from '@/components/Spinner';
import { withFetchAUserQuery } from '@/hooks/queries/useFetchSingleUser';
import { ArrowLeft, Copy } from 'lucide-react';
import React, { useContext } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import StatusBadge from '@/components/StatusBadge';
import copy from 'copy-to-clipboard';
import { NotificationContext } from '@/components/NotificationProvider';
import { useToast } from '@/hooks/use-toast';
import moment from 'moment';

const CustomerDetails = ({ singleUserDetails }: any) => {
  console.log(singleUserDetails, 'singleUserDetails');
  const { toast } = useToast();

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
    <div className="bg-gray-100 h-full max-h-full pt-[24px]">
      <div className="w-full px-[20px] border-b border-b-primary">
        <Link
          href="/customers"
          className="flex flex-row gap-4 items-center w-fit mb-6"
        >
          <div className="w-[32px] h-[32px] rounded-[23px] bg-blue-200 flex items-center justify-center">
            <ArrowLeft color="#039" size={24} />
          </div>
          <span className="text-primary font-figtree font-semibold">
            Go back
          </span>
        </Link>
      </div>

      <div className="flex flex-row">
        <div className="w-3/4 pb-[48px] pt-[20px] px-[20px]">
          <div className="flex flex-col gap-[28px]">
            <div className="flex flex-col gap-1 font-figtree text-secondary">
              <h2 className="font-semibold text-2xl ">User details</h2>
              <p className="text-secondary">Manage and monitor user details</p>
            </div>
          </div>
          <div className="mt-6 bg-white rounded-[8px] px-5 py-4">
            <div className="flex flex-col gap-8 ">
              <div className="w-full flex flex-row justify-between">
                <div className="w-full md:w-1/2 flex gap-2 items-center">
                  <h5 className="font-figtree leading-[22px] text-black-200">
                    <b>Status: </b>
                  </h5>

                  <span>
                    <StatusBadge
                      statusType={verificationStatus(singleUserDetails)}
                      width={79}
                    />
                  </span>
                </div>

                <div className="w-full md:w-1/2">
                  <h5 className="font-figtree  leading-[22px] text-black-200">
                    <b>Last login: </b>{' '}
                    {singleUserDetails?.security_data ? moment(
                      singleUserDetails?.security_data?.last_login_time
                    ).format('MMMM Do YYYY, h:mm:ss a') : 'NA'}
                  </h5>
                </div>
              </div>

              <div className="w-full flex flex-row justify-between">
                <div className="w-full md:w-1/2">
                  <h5 className="font-figtree leading-[22px] text-black-200">
                    <b>Verifiation Methods: </b>
                  </h5>
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2 items-center">
                      <p>BVN: </p>
                      <span>
                        <StatusBadge
                          statusType={
                            singleUserDetails?.bvn_is_verified
                              ? 'verified'
                              : 'unverified'
                          }
                        />
                      </span>
                    </div>
                    <div className="flex flex-row gap-2 items-center">
                      <p>NIN: </p>
                      <span>
                        <StatusBadge
                          statusType={
                            singleUserDetails?.nin_is_verified
                              ? 'verified'
                              : 'unverified'
                          }
                        />
                      </span>
                    </div>
                  </div>
                </div>

                <div className="w-full md:w-1/2">
                  <h5 className="font-figtree  leading-[22px] text-black-200">
                    <b>Transaction Pin: </b>{' '}
                    {singleUserDetails?.has_pin ? 'Yes' : 'Not yet added'}
                  </h5>
                </div>
              </div>

              <div>
                <h5 className="font-bold">Bank Account Details</h5>
                <div className="flex flex-col gap-3 mt-3">
                  <p className="text-sm">
                    <b>Account Name:</b>{' '}
                    {singleUserDetails?.withdrawal_account?.account_name ??
                      'NA'}
                  </p>
                  <p className="text-sm">
                    <b>Account Number:</b>{' '}
                    {singleUserDetails?.withdrawal_account?.account_number ??
                      'NA'}
                  </p>
                  <p className="text-sm">
                    <b>Bank Name:</b>{' '}
                    {singleUserDetails?.withdrawal_account?.bank_name ?? 'NA'}
                  </p>
                  <p className="text-sm">
                    <b>Bank Code:</b>{' '}
                    {singleUserDetails?.withdrawal_account?.bank_code ?? 'NA'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/4 border-l border-l-primary pt-[20px] pb-[48px] px-[10px]">
          <div className="flex flex-col gap-3">
            <div className="flex justify-center ">
              <div>
                <Image
                  src={
                    singleUserDetails?.profile_picture?.image_url ??
                    '/assets/avatar.png'
                  }
                  alt={`${singleUserDetails?.first_name} image`}
                  className="w-[100px] h-[100px] rounded-full object-cover"
                  width={100}
                  height={100}
                />
              </div>
            </div>
            <div>
              <p className="text-sm">User ID:</p>
              <div className="flex flex-row justify-between mt-1">
                <p className="text-sm">
                  <b>{singleUserDetails?.id ?? 'NA'}</b>
                </p>

                <div>
                  <Copy
                    size={16}
                    className="cursor-pointer"
                    onClick={() => handleCopy('User ID', singleUserDetails?.id)}
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm">Email address:</p>
              <div className="flex flex-row justify-between mt-1">
                <p className="text-sm">
                  <b>{singleUserDetails?.email ?? 'NA'}</b>
                </p>

                <div>
                  <Copy
                    size={16}
                    className="cursor-pointer"
                    onClick={() =>
                      handleCopy('Email', singleUserDetails?.email)
                    }
                  />
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm">Phone Number:</p>
              <div className="flex flex-row justify-between mt-1">
                <p className="text-sm">
                  <b>{singleUserDetails?.phone_number ?? 'NA'}</b>
                </p>

                <div>
                  <Copy
                    size={16}
                    className="cursor-pointer"
                    onClick={() =>
                      handleCopy(
                        'Phone Number',
                        singleUserDetails?.phone_number
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm">Wallet ID:</p>
              <div className="flex flex-row justify-between mt-1">
                <p className="text-sm">
                  <b>{singleUserDetails?.wallet?.wallet_uid ?? 'NA'}</b>
                </p>

                <div>
                  <Copy
                    size={16}
                    className="cursor-pointer"
                    onClick={() =>
                      handleCopy(
                        'Wallet ID',
                        singleUserDetails?.wallet?.wallet_uid
                      )
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm">Username:</p>
              <div className="flex flex-row justify-between mt-1">
                <p className="text-sm">
                  <b>{singleUserDetails?.username ?? 'NA'}</b>
                </p>

                <div>
                  <Copy
                    size={16}
                    className="cursor-pointer"
                    onClick={() =>
                      handleCopy('Username', singleUserDetails?.username)
                    }
                  />
                </div>
              </div>
            </div>
            <div>
              <p className="text-sm">Account Created:</p>
              <div className="mt-1">
                <p className="text-sm">
                  <b>
                    {moment(singleUserDetails?.created_at).format(
                      'MMMM Do YYYY, h:mm:ss a'
                    )}
                  </b>
                </p>
              </div>
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
