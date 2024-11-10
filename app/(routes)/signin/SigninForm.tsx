"use client";
import React, { useEffect, useState, useContext } from "react";
import Image from "next/image";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { withLoginMutation } from "@/hooks/mutations/LoginMutation";
import { NotificationContext } from "@/components/NotificationProvider";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import Spinner from "@/components/Spinner";
import { AuthContext } from "@/components/AuthProvider";

const formSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

const SigninForm = ({ mutationResult }: any) => {
  const { dispatch: setNotificationPopUp } = useContext(NotificationContext);

  const {
    authContext: { signIn },
  } = useContext(AuthContext);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // const router = useRouter();

  useEffect(() => {
    if (mutationResult?.data?.status === "success") {
      // router.replace("/");
      console.log(mutationResult?.data?.data);
      signIn(mutationResult?.data?.data);
      setNotificationPopUp({
        type: "UPDATE_MESSAGE",
        payload: {
          status: true,
          message: "Log in successful",
          type: "success",
        },
      });
    }
  }, [mutationResult]);

  const [showPassword, setShowPassword] = useState(false);

  const icon = showPassword ? (
    <Eye color="#667185" size={24} />
  ) : (
    <EyeOff color="#667185" size={24} />
  );

  const togglePassword = () => setShowPassword((prev) => !prev);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await mutationResult.mutateAsync(values);
    } catch (error: any) {
      setNotificationPopUp({
        type: "UPDATE_MESSAGE",
        payload: {
          status: true,
          message: "Error occured during login",
          type: "error",
        },
      });
    }
  };
  return (
    <div className="bg-background text-foreground w-full h-full p-4">
      <div className="flex items-center gap-2">
        <Image
          alt="Kript Logo"
          src={"/assets/kript.png"}
          width={40}
          height={40}
        />

        <h1 className="text-2xl md:text-3xl font-bold text-primary">
          Kript Admin
        </h1>
      </div>
      <div className="w-full md:w-2/5 md:mx-auto rounded-[16px] mt-16">
        <h1 className="text-xl md:text-2xl font-semibold mb-5">Log in</h1>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="me@kript.com"
                      {...field}
                      className="focus:border-primary focus:border-2"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="bg-background flex items-center gap-2 w-full rounded-md border border-input">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="*********"
                        className="border-0"
                        autoComplete="on"
                        {...field}
                      />
                      <div
                        className="cursor-pointer mr-1"
                        onClick={togglePassword}
                      >
                        {icon}
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="mt-6 py-6">
              {mutationResult.isPending ? (
                <Spinner color="#FFFFFF" />
              ) : (
                "Submit"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default withLoginMutation(SigninForm);
