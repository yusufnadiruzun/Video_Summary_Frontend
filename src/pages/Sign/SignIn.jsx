import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../Firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // GOOGLE LOGIN
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);

      // 🔥 TOKEN AL
      const token = await result.user.getIdToken();
      localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTc2MzMxNjQ5OCwiZXhwIjoxNzYzOTIxMjk4fQ.DGXag-ZK_-jtYUwGPuoXEOh1Hplc_oo46WlHv4Z4k88");

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed.");
    }
  };

  // EMAIL LOGIN
  const handleEmailSignIn = async (e) => {
    e.preventDefault();

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);

      // 🔥 TOKEN AL
      const token = await result.user.getIdToken();
      localStorage.setItem("token", token);

      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Email or password incorrect!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back 👋</h2>

        {/* GOOGLE LOGIN */}
        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg shadow-md font-semibold transition mb-6"
        >
          Continue with Google
        </button>

        <div className="flex items-center mb-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or sign in with email</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {error && <p className="text-red-600 text-center mb-4">{error}</p>}

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

          <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold">
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Don't have an account?{" "}
          <Link to="/signup" className="text-indigo-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
