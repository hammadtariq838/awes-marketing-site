import {
  fetchBaseQuery,
  createApi,
  FetchArgs,
  BaseQueryApi,
} from '@reduxjs/toolkit/query/react';
import { ACCOUNT_URL } from '@/constants';
import { clearAuth } from '@/features/auth/authSlice';

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

// TODO: fix request / response types
export const accountApiSlice = createApi({
  reducerPath: 'accountApi',
  baseQuery: baseQueryWithAuth,
  endpoints: (builder) => ({
    signout: builder.mutation<void, void>({
      query: () => ({
        url: `/signout`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useSignoutMutation } = accountApiSlice;
