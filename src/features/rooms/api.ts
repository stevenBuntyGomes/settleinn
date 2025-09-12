// features/rooms/api.ts
const RAW_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
const API_BASE = RAW_BASE.replace(/\/+$/, "");

const isAbsolute = (p: string) => /^https?:\/\//i.test(p);

export function apiUrl(path: string) {
  if (isAbsolute(path)) return path;
  const p = path.startsWith("/") ? path : `/${path}`;
  const isBrowser = typeof window !== "undefined";
  return isBrowser ? p : `${API_BASE}${p}`;
}

export async function apiFetch(path: string, init?: RequestInit) {
  const opts: RequestInit = { credentials: "include", ...init };
  return fetch(apiUrl(path), opts);
}

export async function fetchRoomsApi() {
  const res = await apiFetch("/api/rooms", { method: "GET", cache: "no-store" });
  const text = await res.text();
  let body: any = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = { error: text }; }
  if (!res.ok) throw new Error(body?.message || `Request failed (${res.status})`);
  if (!body?.success) throw new Error(body?.message || "Failed to fetch rooms");
  return body.rooms;
}

/** JSON creation (no upload middleware): send hotelId, roomType, pricePerNight, amenities[] */
export async function createRoomApi(payload: {
  hotelId: string;
  roomType: string;
  pricePerNight: number;
  amenities: string[];
  images?: string[]; // optional URL strings if you have them
}) {
  const res = await apiFetch("/api/rooms", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const text = await res.text();
  let body: any = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = { error: text }; }
  if (!res.ok) throw new Error(body?.message || `Request failed (${res.status})`);
  if (!body?.success) throw new Error(body?.message || "Failed to add room");
  return body; // { success, message, room }
}


export async function fetchOwnerRoomsApi() {
  const res = await apiFetch("/api/rooms/owner", { method: "GET" });
  const text = await res.text();
  let body: any = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = { error: text }; }
  if (!res.ok) throw new Error(body?.message || `Request failed (${res.status})`);
  if (!body?.success) throw new Error(body?.message || "Failed to fetch rooms");
  return body.rooms;
}
