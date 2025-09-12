export type AuthUser = {
  id: string;
  username: string;
  email: string;
  phone?: string;
  role?: string;
};

export type AuthState = {
  user: AuthUser | null;

  // generic
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;

  // granular flags
  registering: boolean;
  registerError: string | null;

  loggingIn: boolean;
  loginError: string | null;

  fetchingMe: boolean;
  loggingOut: boolean;
};
