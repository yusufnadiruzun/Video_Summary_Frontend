import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../Firebase";
import { signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Google login
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Firebase kullanıcı zaten varsa devam
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Google sign-in failed. Try again.");
    }
  };

  // Email/password login
  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Email or password incorrect!");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back 👋</h2>
        <p className="text-center text-gray-500 mb-6">
          Sign in to continue your journey
        </p>

        {/* Google Login Button */}
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

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleEmailSignIn} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
          >
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
