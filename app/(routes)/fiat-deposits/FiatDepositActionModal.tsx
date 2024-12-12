import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useContext, useEffect, useState } from "react";
import { ArrowRight, Copy } from "lucide-react";
import copy from "copy-to-clipboard";
import AcceptFiatDepositBtn from "./AcceptFiatDepositBtn";
import RejectFiatDepositBtn from "./RejectFiatDepositBtn";
import useFetchFiatDepositsQuery from "@/hooks/queries/useFetchFiatDepositsQuery";
import moment from "moment";
import StatusBadge from "@/components/StatusBadge";

const FiatDepositActionModal = ({ depositDetail, page }: any) => {
  // console.log(depositDetail);
  const [showCopy, setShowCopy] = useState(false);

  const handleCopyRecipientEmail = (title: string, value: string) => {
    copy(`${value}`);
    setShowCopy(true);
  };

  useEffect(() => {
    if (showCopy) {
      const notificationTimeout = setTimeout(() => {
        setShowCopy(false);
      }, 3000);
      return () => clearTimeout(notificationTimeout);
    }
  }, [showCopy]);

  const {
    data: { refetch },
  } = useFetchFiatDepositsQuery({
    page,
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer flex items-center justify-center">
          <ArrowRight color="#475467" size={24} />
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Fiat Deposit Details</DialogTitle>
          <p className="mt-2">
            Manage and update <b>{depositDetail?.name}</b> deposit.
          </p>
        </DialogHeader>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <div className="w-full md:w-1/2">
                <p>
                  <b>Name:</b> {depositDetail?.name}
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <p>
                  <b>Bank:</b> {depositDetail?.bank}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 items-center">
              <div className="w-full md:w-1/2">
                <p>
                  <b>Amount Deposited:</b> ₦
                  {depositDetail?.amount?.toLocaleString()}
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <p>
                  <b>USDT Rate:</b> ₦{depositDetail?.rate?.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 items-center">
              <div className="w-full md:w-1/2">
                <p>
                  <b>USDT to be Received:</b>{' '}
                  {(depositDetail?.amount / depositDetail?.rate)?.toFixed(2)}
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <p>
                  <b>Username:</b> {depositDetail?.username}
                </p>
              </div>
            </div>

            <div className="w-full">
              <p>
                <b>Recipient Kript mail:</b>{' '}
                {/* <span className="flex flex-row items-center gap-1.5"> */}
                <span className="text-sm">{depositDetail?.recipient}</span>
                <span
                  className="inline-block ml-1"
                  onClick={() =>
                    handleCopyRecipientEmail('Email', depositDetail?.recipient)
                  }
                >
                  <Copy color="#039" size={20} />
                </span>
                {showCopy && <span className="text-primary ml-1">Copied!</span>}
                {/* </span> */}
              </p>
            </div>

            <div className="flex flex-row gap-2">
              <p>
                <b>Status:</b>
              </p>{' '}
              <div>
                <StatusBadge
                  statusType={depositDetail?.status.toLowerCase()}
                />
              </div>
            </div>

            <div className="w-full">
              <p>
                <b>Created_at:</b>{' '}
                <span className="text-sm">
                  {moment(depositDetail?.CreatedAt).format(
                    'MMMM Do YYYY, h:mm:ss a'
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6">
          {depositDetail?.status !== 'accepted' &&
            depositDetail?.status !== 'successful' &&
            depositDetail?.status !== 'rejected' && (
              <div className="flex flex-row gap-6 mt-6">
                <AcceptFiatDepositBtn
                  uid={depositDetail?.uid}
                  deposit_id={depositDetail?.id}
                  refetch={refetch}
                />

                <RejectFiatDepositBtn
                  uid={depositDetail?.uid}
                  deposit_id={depositDetail?.id}
                  refetch={refetch}
                />
              </div>
            )}

          {depositDetail?.status?.toLowerCase() === 'accepted' ||
            (depositDetail?.status?.toLowerCase() === 'successful' && (
              <p className="mt-4">
                <b>Coin deposited:</b>{' '}
                {moment(depositDetail?.UpdatedAt).format(
                  'MMMM Do YYYY, h:mm:ss a'
                )}
              </p>
            ))}

          {depositDetail?.status === 'rejected' && (
            <p className="mt-4">
              <b>Rejected:</b>{' '}
              {moment(depositDetail?.UpdatedAt).format(
                'MMMM Do YYYY, h:mm:ss a'
              )}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FiatDepositActionModal;
