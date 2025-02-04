import { withUpdateVerificationStatusMutation } from '@/hooks/mutations/UpdateVerificationStatusMutation';
import { useToast } from '@/hooks/use-toast';
import { useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react';


const ManualNINVerification = ({
  id,
  email,
  verification_type,
  mutationResult,
}: any) => {
  const { toast } = useToast();

  const queryClient = useQueryClient();

  useEffect(() => {
    if (mutationResult?.data?.status === 'success') {
      queryClient.invalidateQueries({ queryKey: ['allCustomers'] });
      toast({
        description: `User verified by ${verification_type.toUpperCase()}!`,
        variant: 'success',
      });
    }
  }, [mutationResult, queryClient, toast, verification_type]);

  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const formData = {
        id,
        email,
        verification_type,
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
    <button
      className="py-[10px] text-[14px] px-[15px] hover:bg-blue-200"
      onClick={(e: any) => handleSubmit(e)}
    >
      {mutationResult?.isPending ? (
        'Verifying...'
      ) : (
        'Mark as Verified: NIN'
      )}
    </button>
  );
};

export default withUpdateVerificationStatusMutation(ManualNINVerification);
