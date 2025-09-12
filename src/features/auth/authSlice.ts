"use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import type { AuthState, AuthUser } from "./types";
import { registerApi, loginApi, meApi, logoutApi } from "./api";

/* ───────── thunks ───────── */
export const doRegister = createAsyncThunk<
  AuthUser,
  { username: string; email: string; password: string; phone: string },
  { rejectValue: string }
>("auth/register", async (payload, { rejectWithValue }) => {
  try {
    const data = await registerApi(payload);
    return data.user as AuthUser;
  } catch (err: any) {
    return rejectWithValue(err?.message || "Registration failed");
  }
});

export const doLogin = createAsyncThunk<
  AuthUser,
  { email: string; password: string },
  { rejectValue: string }
>("auth/login", async (payload, { rejectWithValue }) => {
  try {
    const data = await loginApi(payload);
    return data.user as AuthUser;
  } catch (err: any) {
    return rejectWithValue(err?.message || "Login failed");
  }
});

export const loadMe = createAsyncThunk<AuthUser, void, { rejectValue: string }>(
  "auth/loadMe",
  async (_, { rejectWithValue }) => {
    try {
      const data = await meApi();
      return data.user as AuthUser;
    } catch (err: any) {
      return rejectWithValue(err?.message || "Not authenticated");
    }
  }
);

export const doLogout = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
    } catch (err: any) {
      return rejectWithValue(err?.message || "Logout failed");
    }
  }
);

/* ───────── state ───────── */
const initialState: AuthState = {
  user: null,

  // generic status/error (kept for convenience)
  status: "idle",
  error: null,

  // more granular flags
  registering: false,
  registerError: null,

  loggingIn: false,
  loginError: null,

  fetchingMe: false,

  loggingOut: false,
};

/* ───────── slice ───────── */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthError(state) {
      state.error = null;
      state.registerError = null;
      state.loginError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      /* register */
      .addCase(doRegister.pending, (s) => {
        s.registering = true;
        s.registerError = null;
        s.status = "loading";
        s.error = null;
      })
      .addCase(doRegister.fulfilled, (s, a: PayloadAction<AuthUser>) => {
        s.registering = false;
        s.user = a.payload;
        s.status = "succeeded";
      })
      .addCase(doRegister.rejected, (s, a) => {
        s.registering = false;
        s.registerError = (a.payload as string) || "Registration failed";
        s.status = "failed";
        s.error = s.registerError;
      })

      /* login */
      .addCase(doLogin.pending, (s) => {
        s.loggingIn = true;
        s.loginError = null;
        s.status = "loading";
        s.error = null;
      })
      .addCase(doLogin.fulfilled, (s, a: PayloadAction<AuthUser>) => {
        s.loggingIn = false;
        s.user = a.payload;
        s.status = "succeeded";
      })
      .addCase(doLogin.rejected, (s, a) => {
        s.loggingIn = false;
        s.loginError = (a.payload as string) || "Login failed";
        s.status = "failed";
        s.error = s.loginError;
      })

      /* loadMe */
      .addCase(loadMe.pending, (s) => {
        s.fetchingMe = true;
        s.status = "loading";
      })
      .addCase(loadMe.fulfilled, (s, a: PayloadAction<AuthUser>) => {
        s.fetchingMe = false;
        s.user = a.payload;
        s.status = "succeeded";
        s.error = null;
      })
      .addCase(loadMe.rejected, (s) => {
        s.fetchingMe = false;
        s.status = "idle"; // unauthenticated is not an error state
      })

      /* logout */
      .addCase(doLogout.pending, (s) => {
        s.loggingOut = true;
      })
      .addCase(doLogout.fulfilled, (s) => {
        s.loggingOut = false;
        s.user = null;
        s.status = "idle";
        s.error = null;
        s.registerError = null;
        s.loginError = null;
      })
      .addCase(doLogout.rejected, (s) => {
        s.loggingOut = false; // keep user as-is if server logout failed
      });
  },
});

export const { clearAuthError } = authSlice.actions;
export default authSlice.reducer;

/* ───────── selectors ───────── */
export const selectAuth = (state: RootState) => state.auth;
export const selectUser = (state: RootState) => state.auth.user;
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;

export const selectRegistering = (state: RootState) => state.auth.registering;
export const selectRegisterError = (state: RootState) => state.auth.registerError;

export const selectLoggingIn = (state: RootState) => state.auth.loggingIn;
export const selectLoginError = (state: RootState) => state.auth.loginError;

export const selectFetchingMe = (state: RootState) => state.auth.fetchingMe;
export const selectLoggingOut = (state: RootState) => state.auth.loggingOut;
