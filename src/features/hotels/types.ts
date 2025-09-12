// features/hotels/types.ts
export type Hotel = {
  _id: string;
  name: string;
  address: string;
  contact: string;
  city: string;
  owner?: string;
  createdAt?: string;
  updatedAt?: string;
};

export type HotelsState = {
  myHotels: Hotel[];   // <-- array now
  creating: boolean;
  loading: boolean;
  error: string | null;
};
