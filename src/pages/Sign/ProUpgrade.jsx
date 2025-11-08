import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const ProUpgrade = ({ purchasedPackages, setPurchasedPackages }) => {
  const [selectedOption, setSelectedOption] = useState("");
  const [contactInfo, setContactInfo] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleUpgrade = () => {
    if (!selectedOption || !contactInfo) {
      setError("Please select a notification method and provide your info!");
      return;
    }

    // Örnek: backend'e POST request veya state update
    const packageName = "Premium Notifications";
    if (!purchasedPackages.includes(packageName)) {
      setPurchasedPackages([...purchasedPackages, packageName]);
      alert(`${packageName} activated for ${selectedOption}!`);
      navigate("/"); // ana sayfaya geri dön
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400 via-indigo-500 to-blue-500 flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-2xl p-8 max-w-lg w-full"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Upgrade to Pro
        </h2>
        <p className="text-gray-600 mb-4 text-center">
          Choose how you want to receive notifications for new video uploads
        </p>

        {/* Seçenekler */}
        <div className="flex flex-col space-y-4 mb-6">
          <label className="flex items-center space-x-3 bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition">
            <input
              type="radio"
              name="notification"
              value="Email"
              checked={selectedOption === "Email"}
              onChange={() => setSelectedOption("Email")}
              className="accent-indigo-600"
            />
            <span>Email Notifications</span>
          </label>

          <label className="flex items-center space-x-3 bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition">
            <input
              type="radio"
              name="notification"
              value="Telegram"
              checked={selectedOption === "Telegram"}
              onChange={() => setSelectedOption("Telegram")}
              className="accent-indigo-600"
            />
            <span>Telegram Notifications</span>
          </label>

          <label className="flex items-center space-x-3 bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition">
            <input
              type="radio"
              name="notification"
              value="WhatsApp"
              checked={selectedOption === "WhatsApp"}
              onChange={() => setSelectedOption("WhatsApp")}
              className="accent-indigo-600"
            />
            <span>WhatsApp Notifications</span>
          </label>
        </div>

        {/* Input alanı */}
        {selectedOption && (
          <div className="mb-6">
            <input
              type={selectedOption === "WhatsApp" ? "tel" : "text"}
              placeholder={
                selectedOption === "Email"
                  ? "Enter your email"
                  : selectedOption === "Telegram"
                  ? "Enter your Telegram ID"
                  : "Enter your phone number"
              }
              value={contactInfo}
              onChange={(e) => setContactInfo(e.target.value)}
              className="w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
        )}

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          onClick={handleUpgrade}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-semibold transition"
        >
          Upgrade to Pro
        </button>
      </motion.div>
    </div>
  );
};

export default ProUpgrade;
