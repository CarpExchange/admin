import { AuthContext } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import { withUpdateFiatDepositActionMutation } from '@/hooks/mutations/UpdateFiatDepositActionMutation';
import React, { useContext, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { useToast } from '@/hooks/use-toast';

const RejectFiatDepositBtn = ({ uid, deposit_id, refetch, mutationResult }: any) => {
  const {
    state: { user_info },
  } = useContext(AuthContext);
  const id = user_info?.uid;

  const { toast } = useToast()

  useEffect(() => {
    if (mutationResult?.data?.status === 'success') {
      refetch()
      toast({
        description: 'Deposit rejected!!!',
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
        deposit_id,
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
        'Reject Fiat Deposit'
      )}
    </Button>
  );
};

export default withUpdateFiatDepositActionMutation(RejectFiatDepositBtn);
