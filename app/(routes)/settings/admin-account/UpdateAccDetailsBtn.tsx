import { withUpdateAdminAccountDetailMutation } from '@/hooks/mutations/UpdateAdminAccDetails';
import React, { useContext, useEffect } from 'react'
import { NotificationContext } from '@/components/NotificationProvider';
import { useRouter } from 'next/navigation';

const UpdateAccDetailsBtn = ({ mutationResult, formData }: any) => {
    const { dispatch: setNotificationPopUp } = useContext(NotificationContext);
    const router = useRouter();

    useEffect(() => {
      if (mutationResult?.data?.status === 'success') {
        setNotificationPopUp({
          type: 'UPDATE_MESSAGE',
          payload: {
            status: true,
            message: 'Admin account updated successfully',
            type: 'success',
          },
        });
        router.push('/settings');
      }
    }, [mutationResult]);

    const onSubmit = async (e: any) => {
      try {
        e.preventDefault();
        await mutationResult.mutateAsync(formData);
      } catch (error) {
        // console.log(error, 'error');
        setNotificationPopUp({
          type: 'UPDATE_MESSAGE',
          payload: {
            status: true,
            message: 'Error occured during update',
            type: 'error',
          },
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