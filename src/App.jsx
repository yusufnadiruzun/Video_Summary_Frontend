// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Sign/Home";
import ProUpgrade from "./pages/Sign/ProUpgrade";
import Channel from "./pages/Sign/Channels";
import SignIn from "./pages/Sign/SignIn";
import SignUp from "./pages/Sign/SignUp";

function App() {
  const [purchasedPackages, setPurchasedPackages] = useState([]);

  return (
    <Router>
      <Routes>
        {/* Auth */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Main App */}
        <Route
          path="/"
          element={
            <Home
              purchasedPackages={purchasedPackages}
              setPurchasedPackages={setPurchasedPackages}
            />
          }
        />

        {/* Pro Upgrade Page */}
        <Route
          path="/pro-upgrade"
          element={
            <ProUpgrade
              purchasedPackages={purchasedPackages}
              setPurchasedPackages={setPurchasedPackages}
            />
          }
        />

        {/* Channel Page */}
        <Route
          path="/channel"
          element={<Channel purchasedPackages={purchasedPackages} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
