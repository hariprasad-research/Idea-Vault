import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("Login successful!");

    navigate("/dashboard");
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Welcome Back</h1>

        <p>Login to your IdeaVault account.</p>

        <form onSubmit={handleLogin}>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit">
            Login
          </button>

        </form>

        {message && <p>{message}</p>}

        <p>
          Don't have an account?{" "}
          <Link to="/signup">
            Sign up
          </Link>
        </p>

      </div>

    </div>
  );
}

export default Login;
