import { useState } from "react";
import { supabase } from "../lib/supabaseClient.js";
import "./AuthScreen.css";

// This is a full-page login/register/forgot-password screen, shown
// instead of the whole site when nobody's logged in yet. It's the same
// idea as the Login popup we had before, just laid out as its own page
// (a two-column "welcome text + form card" layout) rather than a modal.
function AuthScreen() {
  const [mode, setMode] = useState("login"); // 'login' | 'register' | 'forgot'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  function resetMessages() {
    setError("");
    setMessage("");
  }

  function switchMode(nextMode) {
    resetMessages();
    setPassword("");
    setMode(nextMode);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    resetMessages();
    setLoading(true);

    if (mode === "login") {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (signInError) setError(signInError.message);
      // On success, App.jsx's onAuthStateChange listener picks up the new
      // session automatically and swaps this screen for the real site —
      // nothing else to do here.
    }

    if (mode === "register") {
      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
      });
      if (signUpError) {
        setError(signUpError.message);
      } else {
        setMessage("Account created! You can log in now.");
        setMode("login");
      }
    }

    if (mode === "forgot") {
      const { error: resetError } =
        await supabase.auth.resetPasswordForEmail(email);
      if (resetError) {
        setError(resetError.message);
      } else {
        setMessage("Password reset email sent — check your inbox.");
      }
    }

    setLoading(false);
  }

  const titles = {
    login: "Log in",
    register: "Create an account",
    forgot: "Reset your password",
  };

  return (
    <div className="auth-screen">
      <div className="auth-screen__inner">
        <div className="auth-screen__welcome">
          <p className="auth-screen__eyebrow">Welcome</p>
          <h1>
            Bean.Cafe
            <br />
            Coffee
          </h1>
          <p className="auth-screen__tagline">
            Log in to browse the menu, save your order history, and pick up
            right where you left off.
          </p>
        </div>

        <div className="auth-screen__card">
          <h2>{titles[mode]}</h2>
          <p className="auth-screen__subtitle">
            {mode === "login" && "Log in to start your order"}
            {mode === "register" && "Takes less than a minute"}
            {mode === "forgot" && "We'll email you a reset link"}
          </p>

          <form onSubmit={handleSubmit} className="auth-screen__form">
            <label htmlFor="auth-email">Email</label>
            <input
              id="auth-email"
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
            />

            {mode !== "forgot" && (
              <>
                <label htmlFor="auth-password">Password</label>
                <input
                  id="auth-password"
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                />
              </>
            )}

            {error && <p className="auth-screen__error">{error}</p>}
            {message && <p className="auth-screen__success">{message}</p>}

            <button type="submit" disabled={loading}>
              {loading ? "Please wait…" : titles[mode]}
            </button>
          </form>

          <div className="auth-screen__switch">
            {mode === "login" && (
              <>
                <button type="button" onClick={() => switchMode("register")}>
                  Need an account? Register
                </button>
                <button type="button" onClick={() => switchMode("forgot")}>
                  Forgot password?
                </button>
              </>
            )}
            {mode !== "login" && (
              <button type="button" onClick={() => switchMode("login")}>
                Back to login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthScreen;
