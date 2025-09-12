import { apiFetch } from "@/features/rooms/api";

export async function createCheckoutSessionApi(payload: {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  guests: number;
}) {
  const res = await apiFetch("/api/checkout/create-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok || !data?.success) {
    throw new Error(data?.message || "Failed to create checkout session");
  }
  return data as { success: true; url: string };
}
