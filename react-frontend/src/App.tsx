import { useState } from "react";
import { AuthPage } from "./components/AuthPage";
import { CompanyDashboard } from "./components/CompanyDashboard";
import { TeamLeadDashboard } from "./components/TeamLeadDashboard";
import { Dashboard } from "./components/Dashboard"; 
import { Toaster } from "sonner";

type Page = "auth" | "dashboard";
type UserRole = "company" | "lead" | "employee" | string | null;

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>("auth");
  const [userRole, setUserRole] = useState<UserRole>(null);
  const [userName, setUserName] = useState<string>("Team Leader");

  const handleLogout = () => {
    setCurrentPage("auth");
    setUserRole(null);
    // Ensure tokens are cleared when using the secure logout
    sessionStorage.removeItem("orgpath_token");
    sessionStorage.removeItem("orgpath_user");
  };

  // Helper function to figure out which page to show
  const renderPage = () => {
    if (currentPage === "dashboard") {
      // Route to Executive Manager (The new 9-Box Dashboard we built)
      if (userRole === "company" || userRole === "manager") {
        return <CompanyDashboard onLogout={handleLogout} userName={userName} />;
      }
 
      // Route to Team Lead (Your original ld@gmail.com view)
      if (userRole === "lead" || userRole === "team-lead") {
        return <TeamLeadDashboard onLogout={handleLogout} teamLeadName={userName} />;
      }
      
      // Route to Employee Default
      return <Dashboard onLogout={handleLogout} />;
    }

    // YOUR ORIGINAL AUTH PAGE (This brings back 'Create Account'!)
    return (
      <AuthPage
        onSuccess={(role) => {
          // Grab the user's real name from session storage if AuthPage saved it
          const userStr = sessionStorage.getItem("orgpath_user");
          if (userStr) {
            try {
              const u = JSON.parse(userStr);
              setUserName(`${u.first_name} ${u.last_name}`);
            } catch (e) {}
          }
          setUserRole(role);
          setCurrentPage("dashboard");
        }}
      />
    );
  };

  return (
    <>
      <Toaster position="bottom-right" richColors />
      {/* Render the correct dashboard or login page */}
      {renderPage()}
    </>
  );
}