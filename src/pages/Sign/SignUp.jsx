import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../Firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Google signup
  const handleGoogleSignUp = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      // Firebase zaten kayıtlı mı kontrol eder → signup gibi davranır
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError("Google sign-up failed. Try again.");
    }
  };

  // Email/password signup
  const handleEmailSignUp = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/home");
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 p-6">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Create Account ✨</h2>
        <p className="text-center text-gray-500 mb-6">
          Sign up to start your journey
        </p>

        {/* Google Signup Button */}
        <button
          onClick={handleGoogleSignUp}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg shadow-md font-semibold transition mb-6"
        >
          Sign up with Google
        </button>

        <div className="flex items-center mb-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">or sign up with email</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        {error && (
          <p className="text-red-600 text-center mb-4">{error}</p>
        )}

        <form onSubmit={handleEmailSignUp} className="space-y-4">
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
            Sign Up
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <Link to="/signin" className="text-indigo-600 font-semibold hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
