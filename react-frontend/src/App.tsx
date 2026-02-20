import { useState } from "react";
import { AuthPage } from "./components/AuthPage";
import { ManagerDashboard } from "./components/ManagerDashboard";
import { TeamLeadDashboard } from "./components/TeamLeadDashboard";
import { Dashboard } from "./components/Dashboard"; // <-- Added the Employee Dashboard

type Page = "auth" | "dashboard";
type UserRole = "company" | "lead" | "employee" | string | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("auth");
  const [userRole, setUserRole] = useState<UserRole>(null);

  const handleLogout = () => {
    setCurrentPage("auth");
    setUserRole(null);
  };

  if (currentPage === "dashboard") {
    // Route to Company Manager (Backend uses 'company')
    if (userRole === "company" || userRole === "manager") {
      return <ManagerDashboard onLogout={handleLogout} />;
    }
    // Route to Team Lead (Backend uses 'lead')
    if (userRole === "lead" || userRole === "team-lead") {
      return <TeamLeadDashboard onLogout={handleLogout} />;
    }
    // Route to Employee (Backend uses 'employee')
    return <Dashboard onLogout={handleLogout} />;
  }

  return (
    <AuthPage
      onSuccess={(role) => {
        setUserRole(role);
        setCurrentPage("dashboard");
      }}
    />
  );
}