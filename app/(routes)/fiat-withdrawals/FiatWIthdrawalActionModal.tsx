import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useEffect, useState } from "react";
import { ArrowRight, Copy } from "lucide-react";
import copy from "copy-to-clipboard";
import AcceptFiatWithdrawalBtn from "./AcceptFiatWithdrawalBtn";
import RejectFiatWithdrawalBtn from "./RejectFiatWithdrawalBtn";
import useFetchAUserQuery from "@/hooks/queries/useFetchSingleUser";
import StatusBadge from "@/components/StatusBadge";
import moment from "moment";
import useFetchFiatWithdrawalsQuery from "@/hooks/queries/useFetchWithdrawalQuery";

const FiatWithdrawalActionModal = ({ withdrawalDetail, page }: any) => {
  console.log(withdrawalDetail);
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

  const { data: { refetch } } = useFetchFiatWithdrawalsQuery({
    page,
  });

  const { data, isPending, isSuccess, isError } = useFetchAUserQuery({
    userId: withdrawalDetail?.uid,
  });

  const { singleUserDetails } = data;
  console.log(singleUserDetails, "singleUserDetails");
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="cursor-pointer flex items-center justify-center">
          <ArrowRight color="#475467" size={24} />
        </div>
      </DialogTrigger>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Fiat Withdrawal Details</DialogTitle>
          <p>
            Manage and update{" "}
            <b>
              {singleUserDetails?.first_name} {singleUserDetails?.last_name}
            </b>{" "}
            deposit.
          </p>
        </DialogHeader>

        <div className="mt-6 flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            <div className="flex flex-col md:flex-row gap-3 items-center">
              <div className="w-full md:w-1/2">
                <p>
                  <b>Name:</b> {singleUserDetails?.first_name}{" "}
                  {singleUserDetails?.last_name}
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <p>
                  <b>Username:</b> {singleUserDetails?.username}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 items-center">
              <div className="w-full md:w-1/2">
                <p>
                  <b>Amount Deposited:</b>{" "}
                  {withdrawalDetail?.amount?.toLocaleString()}
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <p>
                  <b>NGN Rate:</b> ₦{withdrawalDetail?.rate?.toLocaleString()}
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-3 items-center">
              <div className="w-full md:w-1/2">
                <p>
                  <b>NGN to be Received:</b> ₦
                  {(
                    withdrawalDetail?.amount * withdrawalDetail?.rate
                  )?.toLocaleString()}
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <div className="flex flex-row gap-2">
                  <p>
                    <b>Status:</b>
                  </p>{" "}
                  <StatusBadge
                    statusType={withdrawalDetail?.status.toLowerCase()}
                  />
                </div>
              </div>
            </div>

            <div className="w-full">
              <p>
                <b>Withdrawal account details</b>{" "}
                {/* <span className="flex flex-row items-center gap-1.5"> */}
                {singleUserDetails?.withdrawal_account ? (
                  <div className="flex flex-col gap-1.5 mt-3">
                    <p>
                      <b>Account Name:</b>{" "}
                      {singleUserDetails?.withdrawal_account?.account_name}
                    </p>
                    <p>
                      <b>Bank Name:</b>{" "}
                      {singleUserDetails?.withdrawal_account?.bank_name}
                    </p>
                    <div className="flex flex-row gap-1.5 items-center">
                      <p>
                        <b>Account Number:</b>{" "}
                        {singleUserDetails?.withdrawal_account?.account_number}
                      </p>
                      <Copy
                        size={16}
                        className="cursor-pointer"
                        onClick={() =>
                          handleCopyRecipientEmail(
                            "Withdrawal Account Number",
                            singleUserDetails?.withdrawal_account
                              ?.account_number
                          )
                        }
                      />
                      {showCopy ? (
                        <div className="text-xs text-green-500">Copied!</div>
                      ) : null}
                    </div>
                  </div>
                ) : null}
              </p>
            </div>
          </div>

          {withdrawalDetail?.status !== "accepted" &&
          withdrawalDetail?.status !== "rejected" ? (
            <div className="flex flex-row gap-6 mt-6">
              <AcceptFiatWithdrawalBtn
                uid={withdrawalDetail?.uid}
                withdrawal_id={withdrawalDetail?.id}
                refetch={refetch}
              />

              <RejectFiatWithdrawalBtn
                uid={withdrawalDetail?.uid}
                withdrawal_id={withdrawalDetail?.id}
                refetch={refetch}
              />
            </div>
          ) : null}

          {withdrawalDetail?.status === "accepted" && (
            <p>
              <b>Paid:</b>{" "}
              {moment(withdrawalDetail?.UpdatedAt).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </p>
          )}

          {withdrawalDetail?.status === "rejected" && (
            <p>
              <b>Rejected:</b>{" "}
              {moment(withdrawalDetail?.UpdatedAt).format(
                "MMMM Do YYYY, h:mm:ss a"
              )}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FiatWithdrawalActionModal;
