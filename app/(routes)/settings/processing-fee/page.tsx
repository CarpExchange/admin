'use client';
import React, { useContext, useEffect } from 'react';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { AuthContext } from '@/components/AuthProvider';
import Link from 'next/link';
import { ArrowLeft, LoaderCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useProcessingFee } from '@/hooks/queries/FetchProcessingFee';
import { withUpdateProcessingFeeMutation } from '@/hooks/mutations/useUpdateProcessingFee';
import moment from 'moment';

const formSchema = z.object({
  fee: z.number({ required_error: 'Processing fee is required' })
  // .min(1, {
  //   message: 'Processing fee must be greater than 0',
  // }),
});

const ProcessingFeeComp = ({ mutationResult }: any) => {
  const router = useRouter();
  const {
    state: { user_info },
  } = useContext(AuthContext);
  const id = user_info?.uid;
  const { toast } = useToast();

  const { processingFee } = useProcessingFee(id);
  const fee = processingFee?.data?.fee ?? 'Fetching...';

  useEffect(() => {
    if (mutationResult?.data?.status === 'success') {
      toast({
        description: 'Processing Fee updated successfully',
        variant: 'success',
      });
      router.refresh();
    }
  }, [mutationResult, toast, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fee: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const formData = { id, fee: data.fee };
      // console.log(formData)
      await mutationResult.mutateAsync(formData);
    } catch (error: any) {
      // console.log(error, 'error');
      toast({
        description: error?.data?.message || 'Error occurred during update',
        variant: 'destructive',
      });
    }
  }
  return (
    <div className="bg-gray-100 h-full max-h-full pt-[24px] pb-[48px] px-[20px]">
      <Link
        href="/settings"
        className="flex flex-row gap-4 items-center w-fit mb-6"
      >
        <div className="w-[32px] h-[32px] rounded-[23px] bg-blue-200 flex items-center justify-center">
          <ArrowLeft color="#039" size={24} />
        </div>
        <span className="text-primary font-figtree font-semibold">Go back</span>
      </Link>
      <div className="flex flex-col gap-[28px]">
        <div className="flex flex-col gap-1 font-figtree text-secondary">
          <h2 className="font-semibold text-2xl ">Processing Fee</h2>
          <p className="text-secondary">
            Manage and update Kript processing fee.
          </p>
        </div>

        <div>
          <h3>
            Current processing fee: <span> ₦{fee.toLocaleString()}</span>
          </h3>
          <p>
            Last updated:{' '}
            {moment(processingFee?.data?.updated_at).format(
              'DD MMM YYYY, hh:mm a'
            ) ?? 'Fetching...'}
          </p>

          <div className="mt-10">
            <h2 className="text-2xl">Update Processing Fee</h2>

            <div>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="mt-2 w-3/5"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="fee"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Processing Fee</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter processing fee"
                                className="bg-transparent"
                                {...field}
                                value={field.value || 0}
                                onChange={(e) =>
                                  field.onChange(e.target.valueAsNumber)
                                }
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <button
                      type="submit"
                      className="bg-primary text-white py-4 px-4 rounded-md flex justify-center items-center"
                    >
                      {mutationResult.isPending ? (
                        <LoaderCircle color="#FFF" size={20} />
                      ) : (
                        'Update Processing Fee'
                      )}
                    </button>
                  </div>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withUpdateProcessingFeeMutation(ProcessingFeeComp);
