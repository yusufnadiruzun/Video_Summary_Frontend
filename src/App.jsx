// App.jsx
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Sign/Home";
import ProUpgrade from "./pages/Sign/ProUpgrade";
import Channel from "./pages/Sign/Channels";
import SignIn from "./pages/Sign/SignIn";
import SignUp from "./pages/Sign/SignUp";

import ProtectedRoute from "./ProtectedRoute";

function App() {
  const [purchasedPackages, setPurchasedPackages] = useState([]);

  return (
    <Router>
      <Routes>
        {/* Auth Routes */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home
                purchasedPackages={purchasedPackages}
                setPurchasedPackages={setPurchasedPackages}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pro-upgrade"
          element={
            <ProtectedRoute>
              <ProUpgrade
                purchasedPackages={purchasedPackages}
                setPurchasedPackages={setPurchasedPackages}
              />
            </ProtectedRoute>
          }
        />

        <Route
          path="/channel"
          element={
            <ProtectedRoute>
              <Channel purchasedPackages={purchasedPackages} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
