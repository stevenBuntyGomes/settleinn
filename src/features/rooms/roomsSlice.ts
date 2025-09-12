// features/rooms/roomsSlice.ts (add owner fetch)
"use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RoomsState, Room } from "./types";
import type { RootState } from "@/store";
import { fetchRoomsApi, createRoomApi, fetchOwnerRoomsApi } from "./api";

/* public rooms */
export const fetchRooms = createAsyncThunk<
  Room[],
  void,
  { rejectValue: string }
>("rooms/fetch", async (_, { rejectWithValue }) => {
  try {
    const rooms = await fetchRoomsApi();
    return rooms as Room[];
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to fetch rooms");
  }
});

/* owner rooms */
export const fetchOwnerRooms = createAsyncThunk<
  Room[],
  void,
  { rejectValue: string }
>("rooms/fetchOwner", async (_, { rejectWithValue }) => {
  try {
    const rooms = await fetchOwnerRoomsApi();
    return rooms as Room[];
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to fetch rooms");
  }
});

/* create room (JSON) */
export const createRoom = createAsyncThunk<
  { message?: string; room?: Room },
  { hotelId: string; roomType: string; pricePerNight: number; amenities: string[]; images?: string[] },
  { rejectValue: string }
>("rooms/create", async (payload, { rejectWithValue }) => {
  try {
    const data = await createRoomApi(payload);
    return data as { message?: string; room?: Room };
  } catch (err: any) {
    return rejectWithValue(err?.message || "Failed to add room");
  }
});

const initialState: RoomsState = {
  rooms: [],
  status: "idle",
  error: null,
  creating: false,
  createError: null,
};

const roomsSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setRooms(state, action: PayloadAction<Room[]>) {
      state.rooms = action.payload || [];
    },
    resetCreateState(state) {
      state.creating = false;
      state.createError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // public list
      .addCase(fetchRooms.pending, (state) => {
        state.status = "loading"; state.error = null;
      })
      .addCase(fetchRooms.fulfilled, (state, action) => {
        state.status = "succeeded"; state.rooms = action.payload;
      })
      .addCase(fetchRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to fetch rooms";
      })
      // owner list
      .addCase(fetchOwnerRooms.pending, (state) => {
        state.status = "loading"; state.error = null;
      })
      .addCase(fetchOwnerRooms.fulfilled, (state, action) => {
        state.status = "succeeded"; state.rooms = action.payload;
      })
      .addCase(fetchOwnerRooms.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Failed to fetch rooms";
      })
      // create
      .addCase(createRoom.pending, (state) => {
        state.creating = true; state.createError = null;
      })
      .addCase(createRoom.fulfilled, (state, action) => {
        state.creating = false;
        const newRoom = action.payload?.room;
        if (newRoom) state.rooms.unshift(newRoom);
      })
      .addCase(createRoom.rejected, (state, action) => {
        state.creating = false;
        state.createError = (action.payload as string) || "Failed to add room";
      });
  },
});

export const { setRooms, resetCreateState } = roomsSlice.actions;
export default roomsSlice.reducer;

/* selectors */
export const selectRoomsState = (state: RootState) => state.rooms;
export const selectRooms = (state: RootState) => state.rooms.rooms;
export const selectRoomsStatus = (state: RootState) => state.rooms.status;
export const selectRoomsError = (state: RootState) => state.rooms.error;
export const selectRoomsCreating = (state: RootState) => state.rooms.creating;
export const selectRoomsCreateError = (state: RootState) => state.rooms.createError;
export const makeSelectRoomById = (id: string) => (state: RootState) =>
  state.rooms.rooms.find((r) => r._id === id);
