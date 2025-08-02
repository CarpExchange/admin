'use client';
import React, { useContext } from 'react';
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
import UpdateAccDetailsBtn from './UpdateAccDetailsBtn';
import { withFetchkriptDepositAccountDetailQuery } from '@/hooks/queries/useFetchKriptDepositDetail';
import ServiceError from '@/components/ServiceError';
import Spinner from '@/components/Spinner';

const formSchema = z.object({
  account_name: z.string().min(1, { message: 'Account name is required' }),
  account_number: z.string().min(10, { message: 'Account number is required' }),
  bank_name: z.string().min(1, { message: 'Bank is required' }),
});

const AdminAccount = ({ kriptAccountDetail }: any) => {
  const {
    state: { user_info },
  } = useContext(AuthContext);
  const id = user_info?.uid;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      account_name: '',
      account_number: '',
      bank_name: '',
    },
  });

  const formValues = form.watch();

  return (
    <div className="min-h-screen py-8 font-figtree text-secondary">
      <Link href="/settings" className="flex items-center gap-3 mb-6 w-fit">
        <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">
          <ArrowLeft color="#003399" size={20} />
        </div>
        <span className="text-primary font-medium">Back to Settings</span>
      </Link>

      <div className="grid gap-10">
        <div className="grid gap-1">
          <h1 className="text-3xl font-semibold text-primary">Admin Bank Account</h1>
          <p className="text-sm text-muted-foreground">
            Manage and update Kript’s company bank account details here.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 mt-4">
          {/* Current Account Details */}
          <div className="bg-white shadow rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-primary mb-4">Current Details</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <span className="text-muted-foreground">Account Name:</span>{' '}
                <strong className="text-secondary">{kriptAccountDetail?.account_name || 'N/A'}</strong>
              </li>
              <li>
                <span className="text-muted-foreground">Account Number:</span>{' '}
                <strong className="text-secondary">{kriptAccountDetail?.account_number || 'N/A'}</strong>
              </li>
              <li>
                <span className="text-muted-foreground">Bank Name:</span>{' '}
                <strong className="text-secondary">{kriptAccountDetail?.bank_name || 'N/A'}</strong>
              </li>
            </ul>
          </div>

          {/* Update Form */}
          <div className="bg-white shadow rounded-2xl p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-primary mb-6">Update Details</h3>

            <Form {...form}>
              <form className="space-y-5">
                <FormField
                  control={form.control}
                  name="account_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Kript Technologies Ltd"
                          className="bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="account_number"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Account Number</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. 0123456789"
                          className="bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="bank_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Bank Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="e.g. Wema Bank"
                          className="bg-white"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <UpdateAccDetailsBtn formData={{ id, ...formValues }} />
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withFetchkriptDepositAccountDetailQuery(AdminAccount, {
  components: { ServiceError, Loading: Spinner },
});
