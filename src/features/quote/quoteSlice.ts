"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { QuotePayload, QuoteResponse, QuoteState } from "./types";
import { postQuote } from "./api";

export const submitQuote = createAsyncThunk<
  QuoteResponse,
  QuotePayload,
  { rejectValue: string }
>("quote/submit", async (payload, { rejectWithValue }) => {
  try {
    const data = await postQuote(payload);
    return data as QuoteResponse;
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to submit quote");
  }
});

const initialState: QuoteState = {
  sending: false,
  success: false,
  error: null,
  lastId: undefined,
};

const quoteSlice = createSlice({
  name: "quote",
  initialState,
  reducers: {
    resetQuoteState(state) {
      state.sending = false;
      state.success = false;
      state.error = null;
      state.lastId = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitQuote.pending, (state) => {
        state.sending = true;
        state.success = false;
        state.error = null;
        state.lastId = undefined;
      })
      .addCase(submitQuote.fulfilled, (state, action) => {
        state.sending = false;
        state.success = true;
        state.error = null;
        state.lastId = action.payload.id;
      })
      .addCase(submitQuote.rejected, (state, action) => {
        state.sending = false;
        state.success = false;
        state.error = (action.payload as string) || "Request failed";
      });
  },
});

export const { resetQuoteState } = quoteSlice.actions;
export default quoteSlice.reducer;
