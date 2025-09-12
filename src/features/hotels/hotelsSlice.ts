// features/hotels/hotelsSlice.ts
"use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/store";
import type { HotelsState, Hotel } from "./types";
import { createHotelApi, fetchMyHotelsApi } from "./api";

export const fetchMyHotels = createAsyncThunk<
  Hotel[],
  void,
  { rejectValue: string }
>("hotels/fetchMine", async (_, { rejectWithValue }) => {
  try {
    const hotels = await fetchMyHotelsApi();
    return hotels as Hotel[];
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to load hotels");
  }
});

export const createHotel = createAsyncThunk<
  { hotel: Hotel; message?: string },
  { name: string; address: string; contact: string; city: string },
  { rejectValue: string }
>("hotels/create", async (payload, { rejectWithValue }) => {
  try {
    const data = await createHotelApi(payload);
    return { hotel: data.hotel as Hotel, message: data?.message };
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to register hotel");
  }
});

const initialState: HotelsState = {
  myHotels: [],
  creating: false,
  loading: false,
  error: null,
};

const hotelsSlice = createSlice({
  name: "hotels",
  initialState,
  reducers: {
    setMyHotels(state, action: PayloadAction<Hotel[]>) {
      state.myHotels = action.payload ?? [];
    },
    resetHotelError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyHotels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMyHotels.fulfilled, (state, action) => {
        state.loading = false;
        state.myHotels = action.payload ?? [];
      })
      .addCase(fetchMyHotels.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to load hotels";
      })
      .addCase(createHotel.pending, (state) => {
        state.creating = true;
        state.error = null;
      })
      .addCase(createHotel.fulfilled, (state, action) => {
        state.creating = false;
        const h = action.payload.hotel;
        // prepend new hotel to the list
        state.myHotels = [h, ...state.myHotels];
      })
      .addCase(createHotel.rejected, (state, action) => {
        state.creating = false;
        state.error = (action.payload as string) || "Failed to register hotel";
      });
  },
});

export const { setMyHotels, resetHotelError } = hotelsSlice.actions;
export default hotelsSlice.reducer;

/* selectors */
export const selectHotelsState = (state: RootState) => state.hotels;
export const selectMyHotels = (state: RootState) => state.hotels.myHotels;
export const selectHotelsLoading = (state: RootState) => state.hotels.loading;
export const selectHotelsCreating = (state: RootState) => state.hotels.creating;
export const selectHotelsError = (state: RootState) => state.hotels.error;
