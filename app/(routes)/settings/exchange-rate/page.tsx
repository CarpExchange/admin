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
import { NotificationContext } from '@/components/NotificationProvider';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

const formSchema = z.object({
  buy_rate: z.number().min(1, { message: 'Buy rate is required' }),
  sell_rate: z.number().min(1, { message: 'Sell rate is required' }),
});

const ExchangeRate = ({ mutationResult }: any) => {
  const {
    state: { user_info },
  } = useContext(AuthContext);
  const id = user_info?.uid;
  const { dispatch: setNotificationPopUp } = useContext(NotificationContext);
  const { exchangeRateData } = useExchangeRateData();
  const { marketData } = useMarketData('usdtngn');

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

  useEffect(() => {
    if (mutationResult?.data?.status === 'success') {
      setNotificationPopUp({
        type: 'UPDATE_MESSAGE',
        payload: {
          status: true,
          message: 'Exchange rate updated successfully',
          type: 'success',
        },
      });
    }
  }, [mutationResult]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      buy_rate: 0,
      sell_rate: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    try {
      const formData = { id, ...data };
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
            Current Deposit Rate: <span>1 USDT = ₦{depositRate.toLocaleString()}</span> {'  '} -
            {'  '} Added charges = ₦{depositCharges}
          </h3>

          <h3 className="mt-2">
            Current Withdrawal Rate: <span>1 USDT = ₦{withdrawalRate.toLocaleString()}</span>
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
                                placeholder="Enter buy rate"
                                className="bg-transparent"
                                {...field}
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
                            <FormLabel>Sell Rate Charges</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter sell rate"
                                className="bg-transparent"
                                {...field}
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
