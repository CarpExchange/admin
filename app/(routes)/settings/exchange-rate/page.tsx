'use client';
import React, { useContext, useEffect } from 'react';
import { useExchangeRateData } from '@/hooks/queries/FetchExchangeRate';
import { useMarketData } from '@/hooks/queries/FetchMarketData';
import { withUpdateExchangeRateMutation } from '@/hooks/mutations/UpdateExchangeRateMutation';
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
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  buy_rate: z.number(),
  sell_rate: z.number(),
});

const ExchangeRate = ({ mutationResult }: any) => {
  const {
    state: { user_info },
  } = useContext(AuthContext);
  const id = user_info?.uid;
  const { exchangeRateData } = useExchangeRateData();
  const { marketData } = useMarketData('usdtngn');

  const { toast } = useToast();

  const usdtPrice = parseFloat(marketData?.ticker?.sell);
  const depositCharges = exchangeRateData?.sell_price?.current_sell_price;

  const depositRate =
    !!usdtPrice && !!depositCharges
      ? usdtPrice + depositCharges
      : 'Fetching rate...';

  const usdtPriceForWithdrawal = parseFloat(marketData?.ticker?.buy);
  // console.log(usdtPrice, 'usdtPrice');
  const withdrawalCharges = exchangeRateData?.buy_price?.current_buy_price;
  // console.log(withdrawalCharges, 'withdrawalCharges');

  const withdrawalRate =
    !!usdtPriceForWithdrawal && !!withdrawalCharges
      ? usdtPriceForWithdrawal - withdrawalCharges
      : 'Fetching rate...';

  const router = useRouter();

  useEffect(() => {
    if (mutationResult?.data?.status === 'success') {
      toast({
        description: 'Exchange rate updated successfully',
        variant: 'success',
      });
      router.push('/settings');
    }
  }, [mutationResult, toast, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buy_rate: 0,
      sell_rate: 0,
    },
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const formData = { id, ...data };
      // console.log(formData)
      await mutationResult.mutateAsync(formData);
    } catch (error: any) {
      // console.log(error, 'error');
      toast({
        description: error?.data?.message || 'Error occured during update',
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
          <h2 className="font-semibold text-2xl ">Exchange Rate</h2>
          <p className="text-secondary">
            Manage and update Kript exchange rate
          </p>
        </div>

        <div>
          <h3>
            Current Deposit Rate:{' '}
            <span>1 USDT = ₦{depositRate.toLocaleString()}</span> {'  '} -{'  '}{' '}
            Added charges = ₦{depositCharges}
          </h3>

          <h3 className="mt-2">
            Current Withdrawal Rate:{' '}
            <span>1 USDT = ₦{withdrawalRate.toLocaleString()}</span>
            {'  '} - {'  '}
            Added charges = ₦{withdrawalCharges}
          </h3>

          <div className="mt-10">
            <h2 className="text-2xl">Update Exchange Rate</h2>

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
                        name="buy_rate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Deposit Rate Charges</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter deposit rate"
                                className="bg-transparent"
                                {...field}
                                value={field.value || ''}
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

                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="sell_rate"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Withdrawal Rate Charges</FormLabel>
                            <FormControl>
                              <Input
                                type="number"
                                placeholder="Enter withdrawal rate"
                                className="bg-transparent"
                                {...field}
                                value={field.value || ''}
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
                      className="bg-primary text-white py-4 px-4 rounded-md"
                    >
                      Update Exchange Rate
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

export default withUpdateExchangeRateMutation(ExchangeRate);
