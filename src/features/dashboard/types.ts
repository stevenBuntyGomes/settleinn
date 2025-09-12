export type DashboardBooking = {
  user: { username: string };
  room: { roomType: string };
  totalPrice: number;
  isPaid: boolean;
};

export type DashboardData = {
  bookings: DashboardBooking[];
  totalBookings: number;
  totalRevenue: number;
};

export type DashboardState = {
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
  data: DashboardData | null;
};
