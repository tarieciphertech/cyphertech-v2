import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useAuth } from "../auth/useAuth";
import { asset } from "../utils/paths";

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || "/client";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const trimmedEmail = email.trim().toLowerCase();
    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setLoading(true);
    const { error: authError } = await signIn({ email: trimmedEmail, password });
    setLoading(false);

    if (authError) {
      setError(authError.friendly || "Unable to sign in. Please try again.");
      return;
    }

    navigate(from, { replace: true });
  }

  return (
    <div className="relative flex min-h-screen flex-col bg-[#05020a] text-white">
      {/* Brand header */}
      <header className="flex items-center justify-between px-5 py-4 lg:px-6">
        <Link to="/" className="flex items-center gap-3">
          <span className="h-10 w-10 overflow-hidden rounded-xl border border-cyan-300/30 shadow-[0_0_35px_rgba(34,211,238,0.2)]">
            <img src={asset("brand/cypher-logo-dark.webp")} alt="" className="h-full w-full object-cover" />
          </span>
          <span className="text-lg font-black tracking-wide text-white">Cypher Technologies</span>
        </Link>
        <Link to="/" className="btn btn-secondary !px-4 !py-2 !text-sm">
          Back to site
        </Link>
      </header>

      <main className="flex flex-1 items-center justify-center px-5 pb-16">
        <div className="w-full max-w-md">
          <div className="card rounded-3xl p-6 md:p-8">
            <div className="mb-6 text-center">
              <h1 className="text-2xl font-black text-white">Welcome back</h1>
              <p className="mt-2 text-sm text-gray-400">Sign in to access your client portal.</p>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-4">
              <label className="field-label">
                Email
                <span className="relative block">
                  <FaEnvelope className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type="email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="field-input !pl-11"
                    placeholder="you@example.com"
                    required
                  />
                </span>
              </label>

              <label className="field-label">
                Password
                <span className="relative block">
                  <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="field-input !pr-12 !pl-11"
                    placeholder="Your password"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute right-3 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-lg text-gray-400 hover:text-cyan-200"
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </span>
              </label>

              {error && (
                <p role="alert" className="rounded-xl border border-rose-300/30 bg-rose-300/10 px-4 py-3 text-sm font-semibold text-rose-200">
                  {error}
                </p>
              )}

              <button type="submit" disabled={loading} className="btn btn-primary w-full">
                {loading ? "Signing in..." : "Sign In"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold text-cyan-300 hover:text-cyan-200">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}