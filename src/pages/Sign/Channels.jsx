import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Channel = ({ purchasedPackages }) => {
  const [channels, setChannels] = useState(["TechReview", "ScienceDaily"]);
  const [newChannel, setNewChannel] = useState("");
  const [error, setError] = useState("");

  const handleAddChannel = () => {
    if (!purchasedPackages.includes("Channel Summary") && !purchasedPackages.includes("New Video Alerts")) {
      setError("You need to purchase a Pro Package to add new channels.");
      return;
    }

    if (!newChannel) return;
    setChannels([...channels, newChannel]);
    setNewChannel("");
    setError("");
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 text-white">
      {/* Navbar */}
      <header className="flex justify-between items-center p-6 bg-indigo-900 shadow-md">
        <h1 className="text-2xl font-bold">Video Summary App</h1>
        <nav className="flex items-center space-x-6 font-medium">
          <button className="hover:text-indigo-300 transition">Home</button>
          <button className="hover:text-indigo-300 transition">Channel</button>
          <button className="hover:text-indigo-300 transition">Profile</button>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col items-center mt-12 px-4">
        <h2 className="text-3xl font-bold mb-6">Your Channels</h2>

        {/* Add New Channel */}
        <div className="flex mb-6 w-full max-w-xl">
          <input
            type="text"
            placeholder="Add a new channel..."
            className="flex-1 p-3 rounded-l-lg text-gray-800 outline-none"
            value={newChannel}
            onChange={(e) => setNewChannel(e.target.value)}
          />
          <button
            onClick={handleAddChannel}
            className="bg-indigo-600 px-6 rounded-r-lg hover:bg-indigo-700 transition font-semibold"
          >
            Add Channel
          </button>
        </div>

        {error && <p className="text-red-500 mb-4">{error}</p>}

        {/* Channel List */}
        <div className="grid md:grid-cols-3 gap-6 w-full max-w-5xl">
          <AnimatePresence>
            {channels.map((channel, idx) => (
              <motion.div
                key={idx}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
                className="bg-white text-gray-800 p-6 rounded-xl shadow-lg flex flex-col items-center justify-center hover:scale-105 transition"
              >
                <h3 className="text-xl font-bold mb-2">{channel}</h3>
                <p className="text-gray-600 text-sm">YouTube Channel</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
};

export default Channel;
