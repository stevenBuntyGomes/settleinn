import { apiFetch } from "@/features/rooms/api";
import type { DashboardData } from "./types";

export async function fetchHotelDashboardApi(): Promise<DashboardData> {
  const res = await apiFetch("/api/bookings/hotel", { method: "GET" });
  const text = await res.text();

  let body: any = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = { error: text }; }

  if (!res.ok) throw new Error(body?.message || `Request failed (${res.status})`);

  // expecting { success: true, dashboardData: {...} }
  if (!body?.success || !body?.dashboardData) {
    throw new Error(body?.message || "Failed to load dashboard");
  }
  return body.dashboardData as DashboardData;
}
