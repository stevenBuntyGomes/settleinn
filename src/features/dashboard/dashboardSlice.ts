"use client";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { DashboardData, DashboardState } from "./types";
import { fetchHotelDashboardApi } from "./api";

export const fetchHotelDashboard = createAsyncThunk<
  DashboardData,
  void,
  { rejectValue: string }
>("dashboard/fetchHotelDashboard", async (_, { rejectWithValue }) => {
  try {
    const data = await fetchHotelDashboardApi();
    return data;
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to load dashboard");
  }
});

const initialState: DashboardState = {
  status: "idle",
  error: null,
  data: null,
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchHotelDashboard.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchHotelDashboard.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchHotelDashboard.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Request failed";
      });
  },
});

export default dashboardSlice.reducer;

/* ── selectors ── */
import type { RootState } from "@/store";
export const selectDashboardStatus = (s: RootState) => s.dashboard.status;
export const selectDashboardError = (s: RootState) => s.dashboard.error;
export const selectDashboardData = (s: RootState) => s.dashboard.data;
