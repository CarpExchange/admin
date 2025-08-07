import React, { useContext, useEffect } from 'react';
import { withBlacklistUserMutation } from '@/hooks/mutations/BlacklistUserMutation';
import { AuthContext } from '../AuthProvider';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { UseMutationResult } from '@tanstack/react-query';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from '../ui/dialog';
import { LoaderCircle } from 'lucide-react';
import Image from 'next/image';
import { Button } from '../ui/button';

type BlacklistUserBtnProps = {
  status: boolean;
  userId: string;
  mutationResult: UseMutationResult<any, Error, any, unknown>;
};

const BlacklistUserBtn = (props: BlacklistUserBtnProps) => {
  const { status, userId, mutationResult } = props;
  const router = useRouter();
  const {
    state: { user_info },
  } = useContext(AuthContext);
  const id = user_info?.uid;

  const { toast } = useToast();

  useEffect(() => {
    if (mutationResult?.data?.status === 'success') {
      toast({
        description: `User ${status ? 'unblacklisted' : 'blacklisted'} successfully`,
        variant: 'success',
      });
      router.refresh();
    }
  }, [mutationResult, status, toast, router]);

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const formData = {
        id,
        uid: userId,
        blacklist: !status,
      };
      await mutationResult.mutateAsync(formData);
    } catch (error: any) {
      toast({
        description: 'Error occurred',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-red-100 py-[10px] px-[33px] hover:opacity-[0.8] hover:bg-red-100 text-white rounded-md">
          {status ? 'Unblacklist user' : 'Blacklist user'}
        </Button>
      </DialogTrigger>
      <DialogContent size="md">
        <DialogHeader>
          <div className="mx-auto w-[48px] h-[48px] flex justify-center items-center rounded-[28px] border-[8px] border-red-300 bg-red-200">
            <Image
              src="/assets/alert-circle-error.svg"
              width={24}
              height={24}
              className="mx-auto"
              alt="kript_alert_circle"
            />
          </div>
        </DialogHeader>

        <div>
          <h3 className="text-center font-semibold text-black-300 text-[18px] leading-[28px]">
            {status ? 'Unblacklist User' : 'Blacklist User'}
          </h3>

          <p className="text-black-300 text-sm leading-[23px] mt-3">
            Are you sure you want to {status ? 'unblacklist' : 'blacklist'} this
            user? If yes, the user will be{' '}
            {status
              ? `unable to access their account and
            will be marked as blacklisted in the system.`
              : 'able to access their account without constraints.'}
          </p>

          <div className="flex gap-3 mt-8 w-full">
            <DialogClose asChild>
              <Button className="bg-transparent border border-gray-600 text-black-300 px-4 py-2 rounded-md w-1/2">
                Cancel
              </Button>
            </DialogClose>

            <Button
              onClick={(e) => handleSubmit(e)}
              disabled={mutationResult.isPending}
              className="bg-red-100 border border-red-100 hover:opacity-[0.8] hover:bg-red-100 text-white px-4 py-2 rounded-md w-1/2"
            >
              {mutationResult.isPending ? (
                <LoaderCircle size={20} color="#FFF" />
              ) : (
                `Yes, ${status ? 'unblacklist' : 'blacklist'} user`
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default withBlacklistUserMutation(BlacklistUserBtn);
