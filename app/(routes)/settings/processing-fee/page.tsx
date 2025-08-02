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
  fee: z.number({ required_error: 'Processing fee is required' }),
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
      await mutationResult.mutateAsync(formData);
    } catch (error: any) {
      toast({
        description: error?.data?.message || 'Error occurred during update',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="min-h-screen px-0 pt-8 pb-16 font-figtree text-[#1E1E1E]">
      {/* Go Back */}
      <Link href="/settings" className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-full bg-[#E6EEFF] flex items-center justify-center">
          <ArrowLeft size={20} color="#003399" />
        </div>
        <span className="text-[#003399] font-semibold">Back to Settings</span>
      </Link>

      <div className="max-w-3xl mx-auto">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-[#003399]">Processing Fee</h1>
          <p className="text-sm text-muted mt-1">
            Manage and update Kript’s processing fee for transactions.
          </p>
        </div>

        <div className="bg-white shadow-md border rounded-xl p-6 md:p-8 space-y-6">
          {/* Current fee display */}
          <div className="text-lg font-medium text-gray-700">
            Current Fee: <span className="font-bold text-[#003399]">₦{fee.toLocaleString()}</span>
          </div>

          {/* Update Fee Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="fee"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-600 font-medium">New Processing Fee</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter new fee"
                        className="bg-gray-100 focus:ring-2 focus:ring-[#003399] focus:outline-none"
                        {...field}
                        value={field.value || ''}
                        onChange={(e) => field.onChange(e.target.valueAsNumber)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <button
                type="submit"
                className="w-full md:w-fit px-6 py-3 bg-[#003399] hover:bg-[#002ecc] text-white font-medium rounded-md flex items-center justify-center transition duration-200"
              >
                {mutationResult.isPending ? (
                  <LoaderCircle className="animate-spin" size={20} />
                ) : (
                  'Update Processing Fee'
                )}
              </button>

              <p className="text-sm text-gray-500">
                Last updated:{' '}
                <span className="font-medium">
                  {processingFee?.data?.updated_at
                    ? moment(processingFee?.data?.updated_at).format('DD MMM YYYY, hh:mm a')
                    : 'Fetching...'}
                </span>
              </p>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default withUpdateProcessingFeeMutation(ProcessingFeeComp);
