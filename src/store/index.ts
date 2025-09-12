"use client";

import { configureStore } from "@reduxjs/toolkit";
import quoteReducer from "@/features/quote/quoteSlice";
import roomsReducer from "@/features/rooms/roomsSlice";
import dashboardReducer from "@/features/dashboard/dashboardSlice";
import authReducer from "@/features/auth/authSlice";
import hotelsReducer from "@/features/hotels/hotelsSlice";
import checkoutReducer from "@/features/checkout/checkoutSlice";

 // ⬅️ add this

export const store = configureStore({
  reducer: {
    quote: quoteReducer,
    rooms: roomsReducer,  
    dashboard: dashboardReducer,
    auth: authReducer, 
    hotels: hotelsReducer,
    checkout: checkoutReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
