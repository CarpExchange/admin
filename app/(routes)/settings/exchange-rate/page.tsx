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
  const router = useRouter();

  const usdtSellPrice = parseFloat(marketData?.ticker?.sell);
  const sellCharge = exchangeRateData?.sell_price?.current_sell_price;
  const depositRate = usdtSellPrice && sellCharge ? usdtSellPrice + sellCharge : null;

  const usdtBuyPrice = parseFloat(marketData?.ticker?.buy);
  const buyCharge = exchangeRateData?.buy_price?.current_buy_price;
  const withdrawalRate = usdtBuyPrice && buyCharge ? usdtBuyPrice - buyCharge : null;

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
      await mutationResult.mutateAsync(formData);
    } catch (error: any) {
      toast({
        description: error?.data?.message || 'Error occurred during update',
        variant: 'destructive',
      });
    }
  }

  return (
    <div className="min-h-screen py-8">
      <Link
        href="/settings"
        className="flex items-center gap-3 mb-6 text-primary font-semibold"
      >
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
          <ArrowLeft className="text-primary" size={20} />
        </div>
        Go back
      </Link>

      <div className="max-w-2xl bg-white rounded-2xl shadow-md p-6 md:p-8 space-y-6">
        <div className="text-center space-y-1">
          <h2 className="text-2xl font-semibold text-primary font-figtree">
            Exchange Rate Management
          </h2>
          <p className="text-sm text-gray-500">
            Set USDT/NGN deposit and withdrawal charges
          </p>
        </div>

        <div className="space-y-4 text-[15px] font-medium text-gray-700 bg-gray-50 p-4 rounded-md border border-gray-200">
          <p>
            <span className="font-semibold text-gray-800">Deposit Rate:</span>{' '}
            1 USDT = ₦{depositRate ? depositRate.toLocaleString() : '...'}{' '}
            <span className="text-sm font-normal">
              (Charge: ₦{sellCharge || '...'})
            </span>
          </p>
          <p>
            <span className="font-semibold text-gray-800">Withdrawal Rate:</span>{' '}
            1 USDT = ₦{withdrawalRate ? withdrawalRate.toLocaleString() : '...'}{' '}
            <span className="text-sm font-normal">
              (Charge: ₦{buyCharge || '...'})
            </span>
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-secondary mb-4">
            Update Charges
          </h3>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-6"
            >
              <FormField
                control={form.control}
                name="buy_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Deposit Rate Charge (₦)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 25"
                        className="bg-gray-50"
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

              <FormField
                control={form.control}
                name="sell_rate"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Withdrawal Rate Charge (₦)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="e.g. 30"
                        className="bg-gray-50"
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

              <button
                type="submit"
                className="bg-primary hover:bg-blue-900 text-white font-medium text-sm py-3 px-6 rounded-lg transition"
              >
                Update Exchange Rate
              </button>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default withUpdateExchangeRateMutation(ExchangeRate);
