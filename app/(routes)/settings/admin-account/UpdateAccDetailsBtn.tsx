import { withUpdateAdminAccountDetailMutation } from '@/hooks/mutations/UpdateAdminAccDetails';
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';

const UpdateAccDetailsBtn = ({ mutationResult, formData }: any) => {
    const { toast } = useToast()
    const router = useRouter();

    useEffect(() => {
      if (mutationResult?.data?.status === 'success') {
        toast({
          description: 'Admin account updated successfully',
          variant: 'success',

        })
        
        router.push('/settings');
      }
    }, [mutationResult]);

    const onSubmit = async (e: any) => {
      try {
        e.preventDefault();
        await mutationResult.mutateAsync(formData);
      } catch (error: any) {
        // console.log(error, 'error');
        toast({
          description: error?.data?.message || "Error occured during update",
          variant: "destructive",
        });
      }
    };
  return (
    <button
      type="submit"
      onClick={(e) => onSubmit(e)}
      className="bg-primary text-white py-4 px-4 rounded-md"
    >
      Update Account Details
    </button>
  );
}

export default withUpdateAdminAccountDetailMutation(UpdateAccDetailsBtn)