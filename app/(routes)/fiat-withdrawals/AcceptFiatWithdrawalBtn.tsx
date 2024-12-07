import { AuthContext } from '@/components/AuthProvider';
import { Button } from '@/components/ui/button';
import React, { useContext, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { useToast } from '@/hooks/use-toast';
import { withUpdateFiatWithdrawalActionMutation } from '@/hooks/mutations/UpdateFiatWithdrawalActionMutation';

const AcceptFiatWithdrawalBtn = ({
  uid,
  withdrawal_id,
  paid = true,
  status = 'accepted',
  mutationResult,
}: any) => {
  const {
    state: { user_info },
  } = useContext(AuthContext);
  const id = user_info?.uid;

  const { toast } = useToast();

  useEffect(() => {
    if (mutationResult?.data?.status === 'success') {
      toast({
        description: 'Withdrawal accepted!!!',
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
        paid,
        status,
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
      className="bg-[#28A745] hover:bg-[#218838]"
    >
      {mutationResult?.isPending ? (
        <Spinner color="#FFF" />
      ) : (
        'Accept Fiat Withdrawal'
      )}
    </Button>
  );
};

export default withUpdateFiatWithdrawalActionMutation(AcceptFiatWithdrawalBtn);
