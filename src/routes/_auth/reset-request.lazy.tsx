import { createLazyFileRoute } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import { useNavigate } from '@tanstack/react-router';
import { useRequestForgotPasswordMutation } from '@/services/account/accountApiSlice';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

const ForgetPasswordFormSchema = z.object({
  email: z.string().email({ message: 'Invalid email' }),
});

type ForgetPasswordFormValues = z.infer<typeof ForgetPasswordFormSchema>;

// This can come from your database or API.
const defaultValues: ForgetPasswordFormValues = {
  email: '',
};

const ResetRequestScreen = () => {
  const form = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(ForgetPasswordFormSchema),
    defaultValues,
  });

  const navigate = useNavigate();

  const [forgetPasswordRequestApiCall, { isLoading }] =
    useRequestForgotPasswordMutation();


  async function onSubmit(data: ForgetPasswordFormValues) {
    try {
      const res = await forgetPasswordRequestApiCall({
        email: data.email,
      }).unwrap();
      console.log('forget_password_request', res);
      toast.success('Verification Code Sent!');
      navigate({ to: '/reset-verification' })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.data?.message || error.error || 'Error: Something went wrong!'
      );
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col justify-start w-[350px] px-10 pb-4 gap-4 rounded"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h2 className="text-center">Forget Password?</h2>
        <p className="text-center">
          No worries, we've got your back! Reset your password and get back to
          your studies in a snap.
        </p>

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
                    className={cn(
                      form.formState.errors.email && 'border-destructive')}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            variant='brand'
            className='w-full'
            type="submit"
            size='lg'
            disabled={isLoading}
          >
            Send Verification Code
          </Button>
        </div>
      </form>
    </Form>
  );
};


export const Route = createLazyFileRoute('/_auth/reset-request')({
  component: ResetRequestScreen
})