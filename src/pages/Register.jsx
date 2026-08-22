import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock, FaUser } from "react-icons/fa";
import { useAuth } from "../auth/useAuth";
import { asset } from "../utils/paths";

const PASSWORD_RULES = [
  { label: "At least 8 characters", test: (v) => v.length >= 8 },
  { label: "One uppercase letter", test: (v) => /[A-Z]/.test(v) },
  { label: "One lowercase letter", test: (v) => /[a-z]/.test(v) },
  { label: "One number", test: (v) => /\d/.test(v) },
];

export default function Register() {
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const rulesMet = PASSWORD_RULES.map((rule) => rule.test(password));
  const allRulesMet = rulesMet.every(Boolean);
  const passwordsMatch = password === confirmPassword;

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    const trimmedName = fullName.trim();
    const trimmedEmail = email.trim().toLowerCase();

    if (trimmedName.length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!allRulesMet) {
      setError("Your password does not meet the requirements below.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);
    const result = await signUp({ fullName: trimmedName, email: trimmedEmail, password });
    setLoading(false);

    if (result.error) {
      setError(result.error.message || "We could not create your account. Please try again.");
      return;
    }

    // If the project requires email confirmation, auth.session will be null.
    if (result.data?.session) {
      // Signed in automatically — profile trigger has already created the row.
      navigate("/client", { replace: true });
    } else {
      setSuccess(
        "Account created! We sent you a confirmation email. Please verify your email before signing in.",
      );
      // Clear the form so the user can confirm then sign in.
      setPassword("");
      setConfirmPassword("");
    }
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
          {success ? (
            <div className="card rounded-3xl p-6 text-center md:p-8">
              <div className="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-2xl bg-emerald-300/10 text-emerald-300">
                <FaEnvelope className="text-2xl" />
              </div>
              <h1 className="text-xl font-black text-white">Confirm your email</h1>
              <p className="mt-3 text-sm leading-6 text-gray-400">{success}</p>
              <Link to="/login" className="btn btn-primary mt-6 w-full">
                Go to Sign In
              </Link>
            </div>
          ) : (
            <div className="card rounded-3xl p-6 md:p-8">
              <div className="mb-6 text-center">
                <h1 className="text-2xl font-black text-white">Create your account</h1>
                <p className="mt-2 text-sm text-gray-400">
                  Join Cypher Technologies to manage your projects and support tickets.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="grid gap-4">
                <label className="field-label">
                  Full name
                  <span className="relative block">
                    <FaUser className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type="text"
                      name="fullName"
                      autoComplete="name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="field-input !pl-11"
                      placeholder="Your full name"
                      required
                    />
                  </span>
                </label>

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
                      autoComplete="new-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="field-input !pr-12 !pl-11"
                      placeholder="Create a password"
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

                <ul className="grid gap-1.5 text-xs">
                  {PASSWORD_RULES.map((rule, index) => {
                    const met = rulesMet[index];
                    return (
                      <li
                        key={rule.label}
                        className={`flex items-center gap-2 font-semibold ${
                          met ? "text-emerald-300" : "text-gray-500"
                        }`}
                      >
                        <span
                          className={`grid h-4 w-4 place-items-center rounded-full text-[10px] ${
                            met ? "bg-emerald-300/15" : "bg-white/5"
                          }`}
                        >
                          {met ? "✓" : ""}
                        </span>
                        {rule.label}
                      </li>
                    );
                  })}
                </ul>

                <label className="field-label">
                  Confirm password
                  <span className="relative block">
                    <FaLock className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="confirmPassword"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={`field-input !pl-11 ${
                        confirmPassword && !passwordsMatch ? "!border-rose-400/50" : ""
                      }`}
                      placeholder="Re-enter your password"
                      required
                    />
                  </span>
                </label>

                {error && (
                  <p role="alert" className="rounded-xl border border-rose-300/30 bg-rose-300/10 px-4 py-3 text-sm font-semibold text-rose-200">
                    {error}
                  </p>
                )}

                <button type="submit" disabled={loading} className="btn btn-primary w-full">
                  {loading ? "Creating account..." : "Create Account"}
                </button>
              </form>

              <p className="mt-6 text-center text-sm text-gray-400">
                Already have an account?{" "}
                <Link to="/login" className="font-bold text-cyan-300 hover:text-cyan-200">
                  Sign in
                </Link>
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}