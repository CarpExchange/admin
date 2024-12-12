import { AuthContext } from '@/components/AuthProvider';
import { NotificationContext } from '@/components/NotificationProvider';
import { Button } from '@/components/ui/button';
import { withUpdateFiatDepositActionMutation } from '@/hooks/mutations/UpdateFiatDepositActionMutation';
import React, { useContext, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { useToast } from '@/hooks/use-toast';

const AcceptFiatDepositBtn = ({
  uid,
  deposit_id,
  paid = true,
  status = 'accepted',
  refetch,
  mutationResult,
}: any) => {
  const {
    state: { user_info },
  } = useContext(AuthContext);
  const id = user_info?.uid;

  const { toast } = useToast();

  useEffect(() => {
    if (mutationResult?.data?.status === 'success') {
      refetch()
      toast({
        description: 'Deposit accepted!!!',
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
        paid,
        status,
      };
      await mutationResult.mutateAsync(formData);
    } catch (error: any) {
      toast({
        description: error?.data?.message || 'Error occured',
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
        'Accept Fiat Deposit'
      )}
    </Button>
  );
};

export default withUpdateFiatDepositActionMutation(AcceptFiatDepositBtn);
