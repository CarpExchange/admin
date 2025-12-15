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
import moment from 'moment';
import { withUpdateAirtimeRateMutation } from '@/hooks/mutations/useUpdateAirtimeRate';
import { useAirtimeRate } from '@/hooks/queries/FetchAirtimeRate';

const formSchema = z.object({
  rate: z.number({ required_error: 'Airtime rate is required' }),
});

const AirtimeRateComp = ({ mutationResult }: any) => {
  const router = useRouter();
  const {
    state: { user_info },
  } = useContext(AuthContext);
  const id = user_info?.uid;
  const { toast } = useToast();
  const { airtimeRate } = useAirtimeRate(id);
  const rate = airtimeRate?.data?.current_rate ?? 'Fetching...';

  useEffect(() => {
    if (mutationResult?.data?.status === 'success') {
      toast({
        description: 'Airtime Rate updated successfully',
        variant: 'success',
      });
      router.refresh();
    }
  }, [mutationResult, toast, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      rate: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const formData = { id, rate: data.rate };
      await mutationResult.mutateAsync(formData);
    } catch (error: any) {
      toast({
        description: error?.data?.message || 'Error occurred during update',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="min-h-screen px-4 md:px-0 pt-8 pb-16 font-figtree text-[#1E1E1E]">
      {/* Go Back */}
      <Link href="/settings" className="flex items-center gap-3 mb-6">
        <div className="w-9 h-9 rounded-full bg-[#E6EEFF] flex items-center justify-center">
          <ArrowLeft size={20} color="#003399" />
        </div>
        <span className="text-[#003399] font-semibold">Back to Settings</span>
      </Link>

      <div className="max-w-3xl">
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-[#003399]">Airtime rate</h1>
          <p className="text-sm text-muted mt-1">
            Manage and update Kript’s airtime rate for transactions.
          </p>
        </div>

        <div className="bg-white shadow-md border rounded-xl p-6 md:p-8 space-y-6">
          {/* Current rate display */}
          <div className="text-lg font-medium text-gray-700">
            Current rate: <span className="font-bold text-[#003399]">₦{rate.toLocaleString()}</span>
          </div>

          {/* Update rate Form */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm text-gray-600 font-medium">New Airtime Rate</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter new rate"
                        className="bg-gray-100 focus:ring-2 focus:ring-[#003399] focus:outline-none md:w-3/4"
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
                  <p className='flex flex-row items-center'><LoaderCircle className="animate-spin" size={20} /> Updating</p>
                ) : (
                  'Update Airtime Rate'
                )}
              </button>

              <p className="text-sm text-gray-500">
                Last updated:{' '}
                <span className="font-medium">
                  {airtimeRate?.data?.updated_at
                    ? moment(airtimeRate?.data?.updated_at).format('DD MMM YYYY, hh:mm a')
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

export default withUpdateAirtimeRateMutation(AirtimeRateComp);
