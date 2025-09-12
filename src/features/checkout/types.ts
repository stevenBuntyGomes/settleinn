export type CreateCheckoutPayload = {
  roomId: string;
  checkInDate: string; // YYYY-MM-DD
  checkOutDate: string; // YYYY-MM-DD
  guests: number;
};

export type CreateCheckoutResponse = {
  url?: string;       // Stripe-hosted url (preferred)
  id?: string;        // sessionId fallback
};

export type CheckoutState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  lastUrl?: string | null;
  sessionId?: string | null;
};
