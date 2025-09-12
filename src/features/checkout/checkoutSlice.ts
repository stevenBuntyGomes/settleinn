"use client";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import { createCheckoutSessionApi } from "./api";

type State = { status: "idle"|"loading"|"succeeded"|"failed"; error: string|null; lastUrl?: string; };
const initialState: State = { status: "idle", error: null };

export const createCheckoutSession = createAsyncThunk<
  { url: string },
  { roomId: string; checkInDate: string; checkOutDate: string; guests: number },
  { rejectValue: string }
>("checkout/createSession", async (payload, { rejectWithValue }) => {
  try {
    const data = await createCheckoutSessionApi(payload);
    return { url: data.url };
  } catch (e: any) {
    return rejectWithValue(e?.message || "Failed to start checkout");
  }
});

const slice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b.addCase(createCheckoutSession.pending, (s) => { s.status = "loading"; s.error = null; });
    b.addCase(createCheckoutSession.fulfilled, (s, a) => { s.status = "succeeded"; s.lastUrl = a.payload.url; });
    b.addCase(createCheckoutSession.rejected, (s, a) => { s.status = "failed"; s.error = (a.payload as string) || "Failed to start checkout"; });
  },
});

export default slice.reducer;

export const selectCheckoutStatus = (s: RootState) => s.checkout.status;
export const selectCheckoutError  = (s: RootState) => s.checkout.error;
