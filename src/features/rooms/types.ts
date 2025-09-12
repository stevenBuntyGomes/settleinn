// features/rooms/types.ts
export type HotelRef =
  | string
  | {
      _id?: string;
      name?: string;
      address?: string;
      city?: string;
      owner?: { image?: string } | string;
    };

export type Room = {
  _id: string;
  roomType?: string;
  pricePerNight?: number;
  amenities?: string[];
  images?: string[];
  hotel?: HotelRef;
  isAvailable?: boolean;
  createdAt?: string;
  updatedAt?: string;
  [key: string]: any;
};

export type RoomsState = {
  rooms: Room[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  creating: boolean;
  createError: string | null;
};
