import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000"; // Backend adresin

let googleInitialized = false; // Google init sadece 1 kez çalışacak

const SignIn = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  // -------------------------------------
  // GOOGLE LOGIN
  // -------------------------------------
  const handleGoogleSignIn = async () => {
    return alert("Google Sign-In is currently disabled for debugging purposes.");
    /*
    try {
      if (!window.google || !window.google.accounts) {
        setError("Google Sign-In script not loaded.");
        return;
      }

      if (googleLoading) return; // Çift tıklamayı engelle
      setGoogleLoading(true);

      if (!googleInitialized) {
        window.google.accounts.id.initialize({
          client_id: "528221785652-uu2oalhj0i8b32d9kf9bfim21s08j8oj.apps.googleusercontent.com",

          callback: async (response) => {
            const credential = response.credential;
            console.log("Google sign-in initialized. :: ", credential);
            // Backend'e gönder
            const backendRes = await fetch(`${API_URL}/api/auth/google`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ credential }),
            });

            const data = await backendRes.json();
            if (!backendRes.ok) {
              setError(data.message || "Google login failed");
              setGoogleLoading(false);
              return;
            }

            localStorage.setItem("token", data.token);
            navigate("/");
          },
        });

        googleInitialized = true;
      }

      window.google.accounts.id.prompt();
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed.");
    } finally {
      setGoogleLoading(false);
    }
      */
  };

  // -------------------------------------
  // EMAIL LOGIN
  // -------------------------------------
  const handleEmailSignIn = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Email or password incorrect!");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Server error occurred.");
    }
  };

  // -------------------------------------
  // GUEST LOGIN (Üye olmadan devam et)
  // -------------------------------------
  const handleGuestLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/guest`, {
        method: "POST",
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Guest login failed");
        return;
      }

      localStorage.setItem("token", data.token);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Guest login failed.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Welcome Back 👋
        </h2>

        {/* GOOGLE LOGIN */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg shadow-md font-semibold transition mb-6"
        >
          {googleLoading ? "Loading..." : "Continue with Google"}
        </button>

        <div className="flex items-center mb-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">
            or sign in with email
          </span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

        {/* EMAIL LOGIN */}
        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold"
          >
            Sign In
          </button>
        </form>

        {/* GUEST LOGIN */}
        <button
          onClick={handleGuestLogin}
          className="w-full mt-4 bg-gray-700 hover:bg-gray-800 text-white py-3 rounded-lg font-semibold transition"
        >
          Üye Olmadan Devam Et
        </button>
   
        {/* <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-600 font-semibold hover:underline"
          >
            Sign Up
          </Link>
        </p> */}
      </div>
    </div>
  );
};

export default SignIn;
