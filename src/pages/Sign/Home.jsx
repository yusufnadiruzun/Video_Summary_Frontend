import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";

const packages = [
  {
    name: "Channel Summary",
    price: "$9.99",
    features: ["Get summaries of all existing videos in a channel."],
    color: "from-blue-200 to-blue-400",
    icon: "📹",
  },
  {
    name: "New Video Alerts",
    price: "$14.99",
    features: [
      "See new videos from your subscribed channels in real-time on the web.",
    ],
    color: "from-green-200 to-green-400",
    icon: "🔔",
  },
  {
    name: "Premium Notifications",
    price: "$19.99",
    features: ["Receive summaries via Telegram or Email automatically."],
    color: "from-purple-200 to-purple-400",
    icon: "✉️",
  },
];

const Home = () => {
  const [videoId, setVideoId] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [purchasedPackages, setPurchasedPackages] = useState([]);
  const [showNotificationHint, setShowNotificationHint] = useState(false);

  const navigate = useNavigate();

  const extractYouTubeId = (url) => {
    try {
      // 1) https://www.youtube.com/watch?v=XXXX
      let match = url.match(/v=([^&]+)/);
      if (match) return match[1];

      // 2) https://youtu.be/XXXX
      match = url.match(/youtu\.be\/([^?&]+)/);
      if (match) return match[1];

      // 3) https://www.youtube.com/shorts/XXXX
      match = url.match(/shorts\/([^?&]+)/);
      if (match) return match[1];

      // 4) Kullanıcı direkt ID yazdıysa
      if (/^[a-zA-Z0-9_-]{8,}$/.test(url)) return url;

      return "";
    } catch {
      return "";
    }
  };

  // 🔥🔥 REAL API CALL HERE
  const handleGetSummary = async () => {
    if (!videoId) return;

    const token = localStorage.getItem("token");
    console.log("Retrieved token:", token);
    if (!token) {
      setError("Please login first.");
      return;
    }

    setLoading(true);
    setSummary("");
    setError("");

    try {
      const response = await fetch("http://localhost:3000/api/video/summary", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          videoId: videoId,
          summaryType: "short", // istersen uzun yaparsın
        }),
        credentials: "same-origin"
      });

      const data = await response.json();

      if (!response.ok) {
        setLoading(false);
        setError(data.error || "An error occurred.");
        return;
      }

      setSummary(data.summary);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setError("Server error.");
      setLoading(false);
    }
  };

  const handleBuyPackage = (pkgName) => {
    navigate("/pro-upgrade", { state: { selectedPackage: pkgName } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-gray-800">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 bg-indigo-900 shadow-md">
        <h1 className="text-2xl font-bold text-white">Video Summary App</h1>
        <nav className="flex items-center space-x-6 text-white font-medium">
          <button className="hover:text-indigo-300 transition">Channel</button>
          <button className="hover:text-indigo-300 transition">Profile</button>
          <button
            onClick={() => setShowModal(true)}
            className="bg-yellow-400 text-gray-900 px-4 py-2 rounded-lg hover:bg-yellow-500 transition font-semibold"
          >
            Purchase Plan
          </button>
        </nav>
      </header>

      {/* Main */}
      <main className="flex flex-col items-center justify-center mt-16 px-4">
        <h2 className="text-3xl font-bold text-white mb-6 text-center">
          Enter YouTube Video ID
        </h2>

        <div className="flex w-full max-w-xl mb-4">
          <input
            type="text"
            placeholder="e.g. dQw4w9WgXcQ"
            className="flex-1 p-4 rounded-l-xl outline-none border-2 border-white focus:border-indigo-300 text-gray-800"
            value={videoId}
            onChange={(e) => {
              const input = e.target.value;
              const id = extractYouTubeId(input);
              setVideoId(id);
            }}
          />
          <button
            onClick={handleGetSummary}
            className="bg-indigo-600 text-white px-6 rounded-r-xl hover:bg-indigo-700 transition font-semibold"
          >
            {loading ? "Loading..." : "Get Summary"}
          </button>
        </div>

        {error && (
          <p className="text-red-500 bg-white/20 p-2 rounded mb-4">{error}</p>
        )}

        {summary && (
          <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl text-gray-800 mt-4">
            <h3 className="font-semibold text-lg mb-2">Summary:</h3>
            <p>{summary}</p>
          </div>
        )}
      </main>

      {/* Purchase Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-black"
              onClick={() => setShowModal(false)}
            />
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="bg-white p-8 rounded-xl shadow-2xl z-10 max-w-5xl w-full text-center grid md:grid-cols-3 gap-6"
            >
              {packages.map((pkg, i) => (
                <motion.div
                  key={i}
                  whileHover={{ scale: 1.05 }}
                  className={`bg-gradient-to-br ${pkg.color} rounded-xl p-6 flex flex-col justify-between`}
                >
                  <div className="flex items-center justify-center mb-4 text-3xl">
                    {pkg.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-4">{pkg.name}</h3>
                  <ul className="text-left mb-6 list-disc list-inside text-gray-800 space-y-2">
                    {pkg.features.map((f, idx) => (
                      <li key={idx}>{f}</li>
                    ))}
                  </ul>
                  <p className="text-gray-800 font-semibold mb-4">
                    {pkg.price}
                  </p>
                  <button
                    onClick={() => handleBuyPackage(pkg.name)}
                    className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition font-semibold"
                  >
                    Buy Now
                  </button>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;
