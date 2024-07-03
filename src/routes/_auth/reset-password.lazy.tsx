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
import { toast } from 'sonner';

import { useNavigate } from '@tanstack/react-router';
import { useResetForgotPasswordMutation } from '@/services/account/accountApiSlice';

const ForgetPasswordFormSchema = z.object({
  newPassword: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' }),
});

type ForgetPasswordFormValues = z.infer<typeof ForgetPasswordFormSchema>;

// This can come from your database or API.
const defaultValues: ForgetPasswordFormValues = {
  newPassword: '',
};

const ResetPasswordScreen = () => {
  const form = useForm<ForgetPasswordFormValues>({
    resolver: zodResolver(ForgetPasswordFormSchema),
    defaultValues,
  });

  const navigate = useNavigate();

  const [forgetPasswordApiCall, { isLoading }] = useResetForgotPasswordMutation();

  async function onSubmit(data: ForgetPasswordFormValues) {
    const { newPassword } = data;
    try {
      const res = await forgetPasswordApiCall({
        password: newPassword,
      }).unwrap();
      console.log('verify', res);
      toast.success('Password reset successfully!');
      navigate({ to: '/login' });
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
        className="flex flex-col justify-center w-[400px] px-10 gap-2 rounded"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <h2>Reset Password</h2>

        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>New Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  autoComplete="new-password"
                  placeholder="Enter new password"
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
          Update Password
        </Button>
      </form>
    </Form >
  );
};


export const Route = createLazyFileRoute('/_auth/reset-password')({
  component: ResetPasswordScreen
})