import { createLazyFileRoute } from '@tanstack/react-router'
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { toast } from 'sonner';
import { useNavigate } from '@tanstack/react-router';
import { useAppDispatch } from '@/app/hooks';
import {
  useRequestEmailVerificationMutation,
  useValidateEmailVerificationMutation,
} from '@/services/account/accountApiSlice';
import { setAuth } from '@/features/auth/authSlice';
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
})

const EmailVerificationScreen = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [verifyApiCall, { isLoading: verifyLoading }] = useValidateEmailVerificationMutation();
  const [verifyRequestApiCall, { isLoading: verifyRequestLoading }] = useRequestEmailVerificationMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  })

  const resendHandler = async () => {
    form.reset();
    try {
      await verifyRequestApiCall().unwrap();
      toast.success('Resent Verification Code!');
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
      console.log(error);
    }
  };

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const code = data.pin;
    form.reset();
    try {
      const res = await verifyApiCall({ code }).unwrap();
      console.log('verify', res);
      toast.success('Email verified successfully!');
      dispatch(setAuth(res));
      navigate({ to: '/' });
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error?.data?.message || error.error);
      console.log(error);
    }
  }

  return (
    <div className=" w-[380px] px-10 flex flex-col justify-center">
      <h2 className='text-center'>Verify Email</h2>
      <p className="my-1 text-base text-center">
        Please enter the 6-digit code we have sent on the mail you provided.
      </p>
      <Form {...form}>
        <form
          className="flex flex-col gap-2"
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
          <Button
            variant='brand'
            className="w-full"
            type="submit"
            size={'lg'}
            disabled={verifyLoading}
          >
            Submit
          </Button>
        </form>
        <Button
          variant='link'
          className='mt-2'
          onClick={resendHandler}
          disabled={verifyRequestLoading}
        >
          Resend Verification Code?
        </Button>
      </Form>
    </div>
  );
};

export default EmailVerificationScreen;

export const Route = createLazyFileRoute('/_auth/email-verification')({
  component: EmailVerificationScreen
})