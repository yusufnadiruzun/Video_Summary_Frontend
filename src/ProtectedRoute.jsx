// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  // Token yoksa → giriş ekranına gönder
  if (!token) {
    return <Navigate to="/signin" replace />;
  }
  
  // Token varsa → sayfayı göster
  return children;
};

export default ProtectedRoute;
