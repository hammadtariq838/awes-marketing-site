import {
  fetchBaseQuery,
  createApi,
  FetchArgs,
  BaseQueryApi,
} from '@reduxjs/toolkit/query/react';
// import {
//   BaseResponse,
//   NoUserResponse,
// } from '@/types/response.type';
// import {
//   ChangePasswordRequest, // TODO: add
// } from '@/types/request.type';

import { ACCOUNT_URL } from '@/constants';
import { User, clearAuth } from '@/features/auth/authSlice';

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
    // TODO: response type & needs api route
    signout: builder.mutation<BaseResponse, void>({
      query: () => ({
        url: `/signout`, // TODO: add api route
        method: 'POST',
      }),
    }),
    accountDelete: builder.mutation<
      BaseResponse,
      void // body (TODO: add request type)
    >({
      query: () => ({
        url: `/delete`,
        method: 'POST',
      }),
    }),
    accountDeactivate: builder.mutation<
      BaseResponse,
      void // body (TODO: add request type)
    >({
      query: () => ({
        url: `/deactivate`,
        method: 'POST',
      }),
    }),
    accountActivate: builder.mutation<
      User,
      void // body (TODO: add request type)
    >({
      query: () => ({
        url: `/activate`,
        method: 'POST',
      }),
    }),
    changePassword: builder.mutation<
      BaseResponse,
      ChangePasswordRequest
    >({
      query: (body) => ({
        url: `/change-password`,
        method: 'POST',
        body,
      }),
    }),
    getUser: builder.query<User | NoUserResponse, void>({
      query: () => ({
        url: `/`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useAccountActivateMutation,
  useAccountDeactivateMutation,
  useSignoutMutation,
  useAccountDeleteMutation,
  useChangePasswordMutation,
  useGetUserQuery,
} = accountApiSlice;
