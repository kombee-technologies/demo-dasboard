import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/Layout";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes wrapped in Layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Route>
      {/* Catch-all route for unknown paths */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;