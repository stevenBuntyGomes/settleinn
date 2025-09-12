export type QuotePayload = {
  service: string;
  seatsItems?: string;
  pickup?: string;
  dropoff?: string;
  date?: string;
  time?: string;
  details?: string;
  fullName: string;
  email: string;
  phone?: string;
  heardAbout?: string;
  consent: boolean;
};

export type QuoteResponse = {
  id: string;
  createdAt: string;
};

export type QuoteState = {
  sending: boolean;
  success: boolean;
  error: string | null;
  lastId?: string;
};
