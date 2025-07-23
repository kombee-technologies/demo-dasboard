import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import PageNotFound from "./components/PageNotFound";
import Dashboard from "./components/dashboard/Dashboard";
import Layout from "./components/Layout";
import EmployeeTable from "./components/employee-management/EmployeeTable";
import AttendanceTable from "./components/attendance-management/AttendanceTable";
import PayrollTable from "./components/payroll-management/PayrollTable";
import RecruitmentTable from "./components/recruitment-management/RecruitmentTable";
import LeaveTable from "./components/leave-management/LeaveTable";
import Settings from "./components/setting/Settings";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public routes wrapped in Layout */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />

        <Route path="/employees" element={<EmployeeTable />} />
        <Route path="/attendance" element={<AttendanceTable />} />
        <Route path="/payroll" element={<PayrollTable />} />
        <Route path="/recruitment" element={<RecruitmentTable />} />
        <Route path="/leave" element={<LeaveTable />} />

        {/* Add other routes here as needed */}
        <Route path="/settings" element={<Settings />} />
      </Route>
      {/* Catch-all route for unknown paths */}
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default AppRoutes;
