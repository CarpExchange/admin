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
import { ArrowLeft } from 'lucide-react';
import UpdateAccDetailsBtn from './UpdateAccDetailsBtn';

const formSchema = z.object({
  account_name: z.string().min(1, { message: 'Account name is required' }),
  account_number: z.string().min(10, { message: 'Account number is required' }),
  bank_name: z.string().min(1, { message: 'Bank is required' }),
});

const AdminAccount = ({}: any) => {
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

  const formValues = form.getValues();
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
          <h2 className="font-semibold text-2xl ">Admin Bank Account</h2>
          <p className="text-secondary">
            Manage and update Kript bank account details
          </p>
        </div>

        <div>
          <h3>Current Account Details: </h3>

          {/* <div className="mt-2">
            <p>Account Name: {kriptAccountDetail?.account_name}</p>
            <p>Account Number: {kriptAccountDetail?.account_number}</p>
            <p>Bank Name: {kriptAccountDetail?.bank_name}</p>
          </div> */}

          <div className="mt-10">
            <h2 className="text-2xl">Update Exchange Rate</h2>

            <div>
              <Form {...form}>
                <form className="mt-2 w-3/5">
                  <div className="flex flex-col gap-4">
                    <div className="w-full">
                      <FormField
                        control={form.control}
                        name="account_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter account name"
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
                        name="account_number"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Account Number</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter account number"
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
                        name="bank_name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Bank Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter bank name"
                                className="bg-transparent"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <UpdateAccDetailsBtn 
                    // @ts-ignore
                    formData={{ id, ...formValues }} />
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

export default AdminAccount;

// export default withFetchkriptDepositAccountDetailQuery(AdminAccount, {
//   components: { ServiceError: ServiceError, Loading: Spinner },
// });
