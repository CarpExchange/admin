import { AuthContext } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import React, { useContext, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { useToast } from '@/hooks/use-toast';
import { withUpdateFiatWithdrawalActionMutation } from '@/hooks/mutations/UpdateFiatWithdrawalActionMutation';

const RejectFiatWithdrawalBtn = ({ uid, withdrawal_id, refetch, mutationResult }: any) => {
  const {
    state: { user_info },
  } = useContext(AuthContext);
  const id = user_info?.uid;

  const { toast } = useToast();

  useEffect(() => {
    if (mutationResult?.data?.status === 'success') {
      refetch();
      toast({
        description: 'Withdrawal rejected!!!',
        variant: 'success',
      });
    }
  }, [mutationResult]);

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const formData = {
        id,
        uid,
        withdrawal_id,
        paid: false,
        status: 'rejected',
      };
      await mutationResult.mutateAsync(formData);
    } catch (error: any) {
      toast({
        description: 'Error occured',
        variant: 'destructive',
      });
    }
  };
  return (
    <Button
      onClick={(e) => handleSubmit(e)}
      className="bg-[#DC3545] hover:bg-[#c82333]"
    >
      {mutationResult.isPending ? (
        <Spinner color="#fff" />
      ) : (
        'Reject Fiat Withdrawal'
      )}
    </Button>
  );
};

export default withUpdateFiatWithdrawalActionMutation(RejectFiatWithdrawalBtn);
