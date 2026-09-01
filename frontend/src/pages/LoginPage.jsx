import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(event) {
    event.preventDefault();

    setError("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed.");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/dashboard");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="auth-page">
      <div className="auth-card">
        <p className="eyebrow">Welcome back</p>

        <h1>Log in to Decision Deck.</h1>

        <p className="auth-description">
          Pick up where you left off and make your next decision with confidence.
        </p>

        <form onSubmit={handleLogin} className="auth-form">
          <div className="form-field">
            <label htmlFor="email">Email</label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              required
            />
          </div>

          <div className="form-field">
            <label htmlFor="password">Password</label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              required
            />
          </div>

          {error && <p className="auth-error">{error}</p>}

          <button
            type="submit"
            className="primary-button auth-submit"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Log in →"}
          </button>
        </form>

        <button
  type="button"
  className="auth-back"
  onClick={() => navigate("/")}
>
  <span>←</span>
  <span>Back to Decision Deck</span>
</button>
      </div>
    </section>
  );
}

export default LoginPage;