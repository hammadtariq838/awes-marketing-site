import { createLazyFileRoute } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import {
  useRequestForgotPasswordMutation,
  useVerifyForgotPasswordMutation,
} from '@/services/account/accountApiSlice';
import { useEffect, useState } from 'react';
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"
import { REGEXP_ONLY_DIGITS_AND_CHARS } from "input-otp"

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your code must be 6 characters.",
  }),
});

type FormValues = z.infer<typeof FormSchema>;

const ResetVerificationScreen = () => {
  const navigate = useNavigate();

  const [isDisabled, setIsDisabled] = useState(true);

  const [timer, setTimer] = useState(30);

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1);
      } else {
        setIsDisabled(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })


  const handleResend = () => {
    setIsDisabled(true);
    setTimer(90);
  };

  const [requestApiCall] = useRequestForgotPasswordMutation();
  const [confirmationApiCall] = useVerifyForgotPasswordMutation();

  const resendHandler = async () => {
    handleResend();
    try {
      const res = await requestApiCall({}).unwrap();
      console.log('verify_request', res);
      toast.success('Resent Verification Code!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.data?.message || error.error || 'Error: Something went wrong!'
      );
      console.log(error);
    }
  };

  async function onSubmit(data: FormValues) {
    const code = data.pin;
    form.reset();
    try {
      await confirmationApiCall({ code }).unwrap();
      navigate({ to: '/reset-password' })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(
        error?.data?.message || error.error || 'Error: Something went wrong!'
      );
      console.log(error);
    }
  }


  return (
    <div className="w-[350px] px-10 flex flex-col justify-center">
      <h2>Reset Password</h2>
      <p className="my-2 text-center">
        Please enter the 6-digit code we have sent on the mail you provided.
      </p>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <FormField
            control={form.control}
            name="pin"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP maxLength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS} {...field}>
                    <InputOTPGroup className='flex gap-2'>
                      <InputOTPSlot index={0} className='border rounded-md' />
                      <InputOTPSlot index={1} className='border rounded-md' />
                      <InputOTPSlot index={2} className='border rounded-md' />
                      <InputOTPSlot index={3} className='border rounded-md' />
                      <InputOTPSlot index={4} className='border rounded-md' />
                      <InputOTPSlot index={5} className='border rounded-md' />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex items-center justify-between gap-2">
            <p className="text-[#40916C]">
              {timer > 0
                ? `Time: ${Math.floor(timer / 60)}:${timer % 60 < 10 ? '0' : ''
                }${timer % 60}`
                : '\u00A0'}
            </p>
            <Button variant="link" className="text-[#40916C] hover:text-[#2e684d] p-0 h-auto"
              onClick={() => navigate({ to: '/reset-request' })}
            >
              Update email?
            </Button>
          </div>
          <Button
            variant='brand'
            className='w-full'
            type="submit"
            size='lg'
          >
            Submit
          </Button>
          <Button
            variant='link'
            onClick={resendHandler}
            type="button"
            disabled={isDisabled}
          >
            Resend Verification Code?
          </Button>
        </form>
      </Form>
    </div>
  );
};

export const Route = createLazyFileRoute('/_auth/reset-verification')({
  component: ResetVerificationScreen
})