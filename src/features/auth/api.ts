const RAW_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
const API_BASE = RAW_BASE.replace(/\/+$/, "");

async function parse(res: Response) {
  const text = await res.text();
  let json: any = null;
  try { json = text ? JSON.parse(text) : null; } catch { json = { error: text }; }
  if (!res.ok) throw new Error(json?.message || json?.error || `Request failed (${res.status})`);
  if (json?.success === false) throw new Error(json?.message || "Request failed");
  return json;
}

export async function registerApi(payload: {
  username: string; email: string; password: string; phone: string;
}) {
  const res = await fetch(`${API_BASE}/api/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return parse(res);
}

export async function loginApi(payload: { email: string; password: string }) {
  const res = await fetch(`${API_BASE}/api/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });
  return parse(res);
}

export async function meApi() {
  const res = await fetch(`${API_BASE}/api/auth/me`, {
    method: "GET",
    credentials: "include",
  });
  return parse(res);
}

export async function logoutApi() {
  const res = await fetch(`${API_BASE}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
  return parse(res);
}
