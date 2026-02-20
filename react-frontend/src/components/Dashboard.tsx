import { useState, useEffect } from "react";
import { AssessmentForm } from "./AssessmentForm";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { OrgPathLogo } from "./OrgPathLogo";
import {
  LayoutDashboard,
  Users,
  Building2,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  TrendingUp,
  ClipboardList,
  FileText,
  Download
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";

interface DashboardProps {
  onLogout?: () => void;
}

export function Dashboard({ onLogout }: DashboardProps) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [isTakingAssessment, setIsTakingAssessment] = useState(false);
  
  // --- NEW: State for real data ---
  const [user, setUser] = useState<any>(null);
  const [assessments, setAssessments] = useState<any[]>([]);
  const [isDownloading, setIsDownloading] = useState<number | null>(null);

  // --- NEW: Fetch User & Assessments on Load ---
  useEffect(() => {
    // Get real user name
    const userStr = sessionStorage.getItem("orgpath_user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
    // Fetch past assessments
    fetchAssessments();
  }, []);

  const fetchAssessments = async () => {
    const token = sessionStorage.getItem("orgpath_token");
    if (!token) return;

    try {
      const res = await fetch("http://localhost:8080/api/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.assessments) {
        setAssessments(data.assessments);
      }
    } catch (err) {
      console.error("Failed to load assessments:", err);
    }
  };

  // --- NEW: Download PDF Logic ---
  const downloadReport = async (id: number) => {
    const token = sessionStorage.getItem("orgpath_token");
    setIsDownloading(id);
    try {
      const res = await fetch(`http://localhost:8080/api/assessment/${id}/report`, {
        headers: { "Authorization": `Bearer ${token}` }
      });
      if (!res.ok) throw new Error("Failed to download PDF");

      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `OrgPath-Report-${id}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err: any) {
      alert(err.message);
    } finally {
      setIsDownloading(null);
    }
  };

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "organization", label: "Organization", icon: Building2 },
    { id: "employees", label: "Employees", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <OrgPathLogo />
        </div>
        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeNav === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveNav(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive ? "bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200" : "hover:bg-gray-50"
                  }`}
                  style={isActive ? { color: "#106BB0" } : { color: "#717182" }}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-all">
            <LogOut className="w-5 h-5" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input placeholder="Search..." className="pl-10 bg-gray-50 border-gray-200" />
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
              </Button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <Avatar>
                  <AvatarFallback className="text-white" style={{ backgroundColor: "#106BB0" }}>
                    {user?.first_name?.charAt(0)?.toUpperCase() || "E"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  {/* DYNAMIC USER NAME HERE */}
                  <span className="text-sm font-medium text-gray-900">
                    {user ? `${user.first_name} ${user.last_name || ''}` : "Employee"}
                  </span>
                  <span className="text-xs text-gray-500">Individual Contributor</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Gradient Banner */}
        <div className="relative h-20 flex items-center px-8" style={{ background: "linear-gradient(90deg, #116CB1 0%, #1B8784 33%, #1C986B 66%, #1C897E 100%)" }}>
          <div className="relative z-10">
            {/* DYNAMIC WELCOME MESSAGE HERE */}
            <h1 className="text-white text-2xl font-semibold">Welcome back, {user?.first_name || "there"}!</h1>
            <p className="text-white/90 text-sm mt-1">Ready to continue your growth journey?</p>
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {isTakingAssessment ? (
            <AssessmentForm 
              onCancel={() => setIsTakingAssessment(false)}
              onComplete={() => {
                setIsTakingAssessment(false);
                fetchAssessments(); // Refresh the list immediately!
              }} 
            />
          ) : (
            <div className="space-y-8">
              
              {/* My Assessments Section - REPLACES RECENT ACTIVITY */}
              <Card className="border-gray-200 shadow-md">
                <CardHeader className="flex flex-row justify-between items-center bg-slate-50 border-b">
                  <div>
                    <CardTitle className="text-[#106BB0] flex items-center gap-2">
                      <FileText className="w-5 h-5" /> My Assessments
                    </CardTitle>
                    <CardDescription>View and download your past performance reports</CardDescription>
                  </div>
                  <Button 
                    onClick={() => setIsTakingAssessment(true)}
                    style={{ backgroundColor: "#06A119", color: "white" }}
                  >
                    <ClipboardList className="w-4 h-4 mr-2" /> Start New Assessment
                  </Button>
                </CardHeader>
                <CardContent className="p-6">
                  {assessments.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      <FileText className="w-12 h-12 mx-auto mb-3 opacity-20" />
                      <p>You haven't completed any assessments yet.</p>
                      <p className="text-sm">Click the button above to get started!</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {assessments.map((a) => (
                        <div key={a.id} className="border-2 border-gray-100 rounded-xl p-5 flex items-center justify-between hover:border-blue-200 hover:shadow-sm transition-all">
                          <div>
                            <h4 className="font-bold text-gray-900">Assessment #{a.id}</h4>
                            <p className="text-sm text-gray-500 mb-2">
                              Completed: {new Date(a.created_at).toLocaleDateString()}
                            </p>
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              Score: {a.score ? (parseFloat(a.score) * 100).toFixed(0) + "%" : "Pending"}
                            </span>
                          </div>
                          
                          <Button 
                            variant="outline" 
                            onClick={() => downloadReport(a.id)}
                            disabled={isDownloading === a.id}
                            className="border-[#106BB0] text-[#106BB0] hover:bg-blue-50"
                          >
                            {isDownloading === a.id ? "Downloading..." : (
                              <><Download className="w-4 h-4 mr-2" /> Download PDF</>
                            )}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

            </div>
          )}
        </main>
      </div>
    </div>
  );
}