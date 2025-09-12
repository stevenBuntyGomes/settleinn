const RAW_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000";
const API_BASE = RAW_BASE.replace(/\/+$/, "");

export async function postQuote(payload: any) {
  const url = `${API_BASE}/api/quotes`;
  if (typeof window !== "undefined") console.log("[postQuote] →", url);

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
    cache: "no-store",
  });

  const text = await res.text();
  let body: any = null;
  try { body = text ? JSON.parse(text) : null; } catch { body = { error: text }; }

  if (!res.ok) throw new Error(body?.error || `Request failed (${res.status})`);
  return body;
}
