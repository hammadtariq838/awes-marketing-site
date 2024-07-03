import {
  fetchBaseQuery,
  createApi,
  FetchArgs,
  BaseQueryApi,
} from '@reduxjs/toolkit/query/react';
import { ACCOUNT_URL } from '@/constants';
import { clearAuth } from '@/features/auth/authSlice';
import {
  AccountCodeValidationPayload,
  AccountRequestForgotPasswordPayload,
  AccountResetPasswordPayload,
  AccountResponse,
  AccountSignupPayload,
  BaseResponse,
  TokenResponse,
} from '@/schema';

const baseQuery = fetchBaseQuery({
  baseUrl: ACCOUNT_URL,
  prepareHeaders: (headers) => {
    return headers;
  },
  credentials: 'include',
});

async function baseQueryWithAuth(
  args: string | FetchArgs,
  api: BaseQueryApi,
  extra: object
) {
  const result = await baseQuery(args, api, extra);
  // Dispatch the logout action on 401.
  if (result.error && result.error.status === 401) {
    api.dispatch(clearAuth());
  }
  return result;
}

export const accountApiSlice = createApi({
  reducerPath: 'accountApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    signup: builder.mutation<
      AccountResponse,
      AccountSignupPayload
    >({
      query: (body) => ({
        url: `/signup`,
        method: 'POST',
        body,
      }),
    }),
    signin: builder.mutation<
      AccountResponse,
      { email: string; password: string }
    >({
      query: (body) => ({
        url: `/signin`,
        method: 'POST',
        body,
      }),
    }),
    signout: builder.mutation<BaseResponse, void>({
      query: () => ({
        url: `/signout`,
        method: 'POST',
      }),
    }),
    requestEmailVerification: builder.mutation<
      TokenResponse,
      void
    >({
      query: () => ({
        url: '/email-verification/request',
        method: 'POST',
      }),
    }),
    validateEmailVerification: builder.mutation<
      AccountResponse,
      AccountCodeValidationPayload
    >({
      query: (body) => ({
        url: '/email-verification/verify',
        method: 'POST',
        body,
      }),
    }),
    requestForgotPassword: builder.mutation<
      TokenResponse,
      AccountRequestForgotPasswordPayload
    >({
      query: (body) => ({
        url: '/forgot-password/request',
        method: 'POST',
        body,
      }),
    }),
    verifyForgotPassword: builder.mutation<
      BaseResponse,
      AccountCodeValidationPayload
    >({
      query: (body) => ({
        url: '/forgot-password/validate',
        method: 'POST',
        body,
      }),
    }),
    resetForgotPassword: builder.mutation<
      BaseResponse,
      AccountResetPasswordPayload
    >({
      query: (body) => ({
        url: '/forgot-password/reset',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const {
  useSigninMutation,
  useSignupMutation,
  useSignoutMutation,
  useRequestEmailVerificationMutation,
  useValidateEmailVerificationMutation,
  useResetForgotPasswordMutation,
  useVerifyForgotPasswordMutation,
  useRequestForgotPasswordMutation,
} = accountApiSlice;
