import {
  createSlice,
  PayloadAction,
} from '@reduxjs/toolkit';
import {
  StudentUserResponse,
  TutorUserResponse,
  AdminUserResponse,
} from '@/types';

export type User =
  | StudentUserResponse
  | TutorUserResponse
  | AdminUserResponse;

export type AuthState = {
  user: User | null;
};

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    clearAuth(state) {
      state.user = null;
    },
  },
});

export const { setAuth, clearAuth } = authSlice.actions;
export default authSlice.reducer;
