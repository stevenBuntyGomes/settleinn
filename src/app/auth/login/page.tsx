"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { doLogin, selectAuthStatus, selectAuthError } from "@/features/auth/authSlice";
import SiteHeader from "@/components/SiteHeader";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const status = useAppSelector(selectAuthStatus);
  const error = useAppSelector(selectAuthError);
  const router = useRouter();

  const [form, setForm] = useState({ email: "", password: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await dispatch(doLogin(form));
    if (doLogin.fulfilled.match(res)) router.push("/dashboard");
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">
      <SiteHeader />
      <section className="max-w-md mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold mb-6">Sign in</h1>

        {error && <p className="text-red-600 mb-3">{error}</p>}

        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Email</label>
            <input
              type="email"
              className="w-full border rounded px-3 py-2"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Password</label>
            <input
              type="password"
              className="w-full border rounded px-3 py-2"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
            />
          </div>
          <button
            type="submit"
            disabled={status === "loading"}
            className="w-full bg-black text-white rounded py-2"
          >
            {status === "loading" ? "Signing in..." : "Login"}
          </button>
        </form>
      </section>
    </main>
  );
}
