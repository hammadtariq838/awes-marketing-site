import { createLazyFileRoute } from "@tanstack/react-router";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button, buttonVariants } from "@/components/ui/button";
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
import { useSignupMutation, useRequestEmailVerificationMutation } from "@/services/account/accountApiSlice";
import { setAuth } from "@/features/auth/authSlice";
import { useAppDispatch } from "@/app/hooks";
import { toast } from "sonner";
import { useState } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";

const RegisterFormSchema = z.object({
  name: z.string().min(3, { message: "Not a valid name" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" }),
  terms: z.literal(true, {
    errorMap: () => ({
      message: "Please accept terms and conditions",
    }),
  }),
});

type RegisterFormValues = z.infer<typeof RegisterFormSchema>;

// This can come from your database or API.
const defaultValues: RegisterFormValues = {
  name: "",
  email: "",
  password: "",
  terms: true,
};

const RegisterScreen = () => {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues,
  });
  const [registerApiCall, { isLoading }] = useSignupMutation();
  const [verifyRequestApiCall] = useRequestEmailVerificationMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  async function onSubmit(data: RegisterFormValues) {
    const { name, email, password } = data;
    try {
      const res = await registerApiCall({ name, email, password, role: 'user' }).unwrap();
      console.log("register", res);
      toast.success("Registration Successful!");
      dispatch(setAuth(res));
      navigate({ to: "/email-verification" });
      await verifyRequestApiCall().unwrap();
      console.log("verify_request", res);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
      console.log(error);
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      autoComplete="name"
                      placeholder="Enter your name"
                      autoFocus
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
                        {/* show or hide text */}
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
                          "border-destructive",
                          ""
                        )}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="terms"
              render={({ field }) => (
                <FormItem className="flex-row">
                  <FormControl>
                    <>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        value={field.value?.toString()}
                        disabled={field.disabled}
                        name="terms"
                        className={cn(
                          form.formState.errors.terms && "border-destructive",
                          "align-middle me-3"
                        )}
                      />
                      <FormLabel>Accept terms and conditions</FormLabel>
                    </>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <p>
            Already have an account?{" "}
            But
            <Link
              to="/login"
              className={cn(buttonVariants({ variant: 'link' }))}
            >
              Sign In
            </Link>
          </p>

          <Button
            className="w-full bg-[#EB7547]"
            size={"lg"}
            type="submit"
            disabled={isLoading}
          >
            Sign Up
          </Button>

          {/* reset password */}
          <div className="flex items-center justify-between">
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
    </Card>
  );
};

export const Route = createLazyFileRoute("/_auth/register")({
  component: RegisterScreen,
});
