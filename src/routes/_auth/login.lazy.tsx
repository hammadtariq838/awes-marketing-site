import { createLazyFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Link, useNavigate } from "@tanstack/react-router";
import { useSigninMutation } from "@/services/account/accountApiSlice";
import { toast } from "sonner";
import { setAuth } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/app/hooks";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";


const LoginFormSchema = z.object({
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
});

type LoginFormValues = z.infer<typeof LoginFormSchema>;

const defaultValues: LoginFormValues = {
  email: "",
  password: "",
};

const LoginScreen = () => {
  const form = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues,
  });

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [showPassword, setShowPassword] = useState(false);

  const [loginApiCall, { isLoading }] = useSigninMutation();

  async function onSubmit(data: LoginFormValues) {
    try {
      const res = await loginApiCall(data).unwrap();
      console.log("login", res);
      toast.success("Login Successful!");
      dispatch(setAuth(res));
      navigate({ to: "/email-verification" });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.log("login error", error);
      toast.error(error?.data?.message || error.error);
    }
  }

  return (
    <Card className="p-10 px-8">
      <Form {...form}>
        <form
          className="flex flex-col justify-center w-[420px] p-4 gap-4 rounded"
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      autoComplete="email"
                      placeholder="Enter your email address"
                      {...field}
                      className={cn(
                        form.formState.errors.email && "border-destructive",
                        ""
                      )}
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
                  <div className="flex items-center justify-between">
                    <FormLabel>Password</FormLabel>
                    {/* css class to not go to another line because of space */}
                    <button
                      type="button"
                      className="flex items-center gap-1 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {!showPassword ? (
                        <Eye className="w-4 h-4" />
                      ) : (
                        <EyeOff className="w-4 h-4" />
                      )}
                      <span className=" text-sm font-medium">
                        {!showPassword ? "Show" : "Hide"}
                      </span>
                    </button>
                  </div>
                  <FormControl>
                    <div className="w-full">
                      <Input
                        type={showPassword ? "text" : "password"}
                        autoComplete="password"
                        placeholder="Enter your password"
                        {...field}
                        className={cn(
                          form.formState.errors.password &&
                          "border-destructive")}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>


          <Button
            variant='link'
            asChild
          >
            <Link to='/reset-request'>Forget Password?</Link>
          </Button>

          <Button
            variant='brand'
            size={"lg"}
            type="submit"
            disabled={isLoading}
          >
            Log in
          </Button>

          <div className="flex items-center justify-between">
            <Button
              variant='link'
              asChild
            >
              <Link to='/register'>Sign Up?</Link>
            </Button>

            <div>
              <span>Need help?</span>{" "}
              <Button
                variant='link'
                asChild
              >
                <Link to='/about-us'>Contact us</Link>
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </Card >
  );
};

export const Route = createLazyFileRoute("/_auth/login")({
  component: LoginScreen,
});
