import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { OrgPathLogo } from "./OrgPathLogo";
import { MemberDetailView } from "./MemberDetailView";
import {
  LayoutDashboard,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Bell,
  Search,
  ChevronDown,
  TrendingUp,
  Award,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  Mail,
  Target,
  CheckCircle2,
  Clock,
  AlertCircle,
  Activity,
  Briefcase,
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface TeamLeadDashboardProps {
  onLogout?: () => void;
  teamLeadName?: string;
}

export function TeamLeadDashboard({ onLogout, teamLeadName = "Michael Chen" }: TeamLeadDashboardProps) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");
  const [selectedMemberDetail, setSelectedMemberDetail] = useState<number | null>(null);

  // --- NEW: Real Data States ---
  const [user, setUser] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);

  // --- NEW: Fetch Data on Load ---
  useEffect(() => {
    // 1. Get real user name
    const userStr = sessionStorage.getItem("orgpath_user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }

    // 2. Fetch the team lead dashboard stats from our Node API
    const fetchDashboard = async () => {
      try {
        const token = sessionStorage.getItem("orgpath_token");
        const res = await fetch("http://localhost:8080/api/teamlead/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (res.ok) {
          const data = await res.json();
          setDashboardData(data);
        }
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
    };

    fetchDashboard();
  }, []);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "team-members", label: "Team Members", icon: Users },
    { id: "performance", label: "Performance", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Team Information - Marketing & Growth team as example
  const teamInfo = {
    name: "Marketing & Growth",
    department: "Marketing",
    teamLead: teamLeadName,
    leadRole: "Marketing Director",
    memberCount: 15,
    healthScore: 92,
    color: "#06A119",
  };

  // Team Members Data
  const teamMembers = [
    { id: 1, name: "Alex Turner", role: "Content Strategist", email: "alex.t@orgpath.com", phone: "+1 (555) 234-5679", status: "Active", joinDate: "2023-01-15", performance: 85 },
    { id: 2, name: "Sophie Martin", role: "Social Media Manager", email: "sophie.m@orgpath.com", phone: "+1 (555) 234-5680", status: "Active", joinDate: "2023-03-20", performance: 92 },
    { id: 3, name: "Emma Wilson", role: "SEO Specialist", email: "emma.w@orgpath.com", phone: "+1 (555) 234-5681", status: "Active", joinDate: "2023-02-10", performance: 88 },
    { id: 4, name: "Lucas Anderson", role: "Growth Hacker", email: "lucas.a@orgpath.com", phone: "+1 (555) 234-5682", status: "Active", joinDate: "2023-05-12", performance: 90 },
    { id: 5, name: "Ryan Cooper", role: "Digital Marketing Specialist", email: "ryan.c@orgpath.com", phone: "+1 (555) 234-5683", status: "Active", joinDate: "2023-04-08", performance: 87 },
    { id: 6, name: "Jessica Hill", role: "Brand Manager", email: "jessica.h@orgpath.com", phone: "+1 (555) 234-5684", status: "Active", joinDate: "2023-06-15", performance: 91 },
    { id: 7, name: "Brandon Scott", role: "Marketing Analyst", email: "brandon.s@orgpath.com", phone: "+1 (555) 234-5685", status: "Active", joinDate: "2023-07-01", performance: 84 },
    { id: 8, name: "Rachel Green", role: "Campaign Coordinator", email: "rachel.g@orgpath.com", phone: "+1 (555) 234-5686", status: "Active", joinDate: "2023-08-20", performance: 86 },
    { id: 9, name: "Tyler Moore", role: "Content Writer", email: "tyler.m@orgpath.com", phone: "+1 (555) 234-5687", status: "Active", joinDate: "2023-09-05", performance: 83 },
    { id: 10, name: "Hannah Davis", role: "Graphic Designer", email: "hannah.d@orgpath.com", phone: "+1 (555) 234-5688", status: "Active", joinDate: "2023-10-10", performance: 89 },
    { id: 11, name: "Jordan Baker", role: "Marketing Coordinator", email: "jordan.b@orgpath.com", phone: "+1 (555) 234-5689", status: "Active", joinDate: "2024-01-15", performance: 82 },
    { id: 12, name: "Olivia King", role: "Email Marketing Specialist", email: "olivia.k@orgpath.com", phone: "+1 (555) 234-5690", status: "Active", joinDate: "2024-02-20", performance: 88 },
    { id: 13, name: "Nathan Wright", role: "Video Producer", email: "nathan.w@orgpath.com", phone: "+1 (555) 234-5691", status: "Active", joinDate: "2024-03-12", performance: 85 },
    { id: 14, name: "Emma Lopez", role: "PR Specialist", email: "emma.l@orgpath.com", phone: "+1 (555) 234-5692", status: "Active", joinDate: "2024-04-08", performance: 87 },
    { id: 15, name: "Daniel Harris", role: "Marketing Assistant", email: "daniel.h@orgpath.com", phone: "+1 (555) 234-5693", status: "Active", joinDate: "2024-05-01", performance: 81 },
  ];

  // Team Performance Metrics
  const teamMetrics = {
    avgOverallScore: 85,
    avgLeadershipScore: 82,
    avgCommunicationScore: 87,
    avgAdaptabilityScore: 85,
    avgCollaborationScore: 84,
    completionRate: 100, // 15/15 members completed assessments
    topPerformers: ["Sophie Martin", "Lucas Anderson", "Jessica Hill"],
    benchmarkLeadershipScore: 90,
    benchmarkCommunicationScore: 92,
    benchmarkAdaptabilityScore: 88,
    benchmarkCollaborationScore: 90,
  };

  // Current Projects
  const currentProjects = [
    { name: "Brand Refresh Campaign", status: "In Progress", completion: 78, assignedTo: ["Sophie Martin", "Jessica Hill", "Hannah Davis"], deadline: "2025-11-15" },
    { name: "Social Media Strategy", status: "Active", completion: 55, assignedTo: ["Sophie Martin", "Alex Turner", "Tyler Moore"], deadline: "2025-12-01" },
    { name: "Content Marketing Initiative", status: "Planning", completion: 30, assignedTo: ["Alex Turner", "Tyler Moore", "Emma Lopez"], deadline: "2025-12-20" },
  ];

  // Filter team members based on search
  const filteredMembers = teamMembers.filter(
    (member) =>
      member.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      member.role.toLowerCase().includes(memberSearch.toLowerCase()) ||
      member.email.toLowerCase().includes(memberSearch.toLowerCase())
  );

  return (
    <>
      {selectedMemberDetail && (
        <MemberDetailView
          memberId={selectedMemberDetail}
          onClose={() => setSelectedMemberDetail(null)}
        />
      )}
      
      <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div
        className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${
          sidebarCollapsed ? "w-20" : "w-64"
        }`}
      >
        <div className={`border-b border-gray-200 ${sidebarCollapsed ? "p-4" : "p-6"}`}>
          {!sidebarCollapsed && <OrgPathLogo />}
          {sidebarCollapsed && (
            <div className="flex justify-center">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
                style={{ background: "linear-gradient(135deg, #106BB0 0%, #06A119 100%)" }}
              >
                <span className="text-lg font-bold">O</span>
              </div>
            </div>
          )}
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
                  className={`w-full flex items-center ${
                    sidebarCollapsed ? "justify-center" : "gap-3"
                  } px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? "bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200"
                      : "hover:bg-gray-50"
                  }`}
                  style={isActive ? { color: "#106BB0" } : { color: "#717182" }}
                  title={sidebarCollapsed ? item.label : ""}
                >
                  <Icon className="w-5 h-5" />
                  {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Toggle Button */}
        <div className={`p-4 ${!sidebarCollapsed && "border-t border-gray-200"}`}>
          <button
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-all"
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <>
                <ChevronLeft className="w-5 h-5" />
                <span className="font-medium">Collapse</span>
              </>
            )}
          </button>
        </div>

        {!sidebarCollapsed && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-all"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        )}

        {sidebarCollapsed && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={onLogout}
              className="w-full flex items-center justify-center px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-all"
              title="Logout"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex-1 max-w-md relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input placeholder="Search team members..." className="pl-10 bg-gray-50 border-gray-200" />
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <Avatar>
                  <AvatarFallback className="text-white" style={{ backgroundColor: teamInfo.color }}>
                    {/* DYNAMIC INITIALS */}
                    {user?.first_name?.charAt(0)?.toUpperCase() || teamInfo.teamLead.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  {/* DYNAMIC USER NAME */}
                  <span className="text-sm font-medium text-gray-900">
                    {user ? `${user.first_name} ${user.last_name || ''}` : teamInfo.teamLead}
                  </span>
                  <span className="text-xs text-gray-500">{teamInfo.leadRole}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          </div>
        </header>

        {/* Gradient Banner */}
        <div
          className="relative h-20 flex items-center px-8"
          style={{
            background: "linear-gradient(90deg, #06A119 0%, #1C986B 50%, #1B8784 100%)",
          }}
        >
          <div className="relative z-10">
            <h1 className="text-white text-2xl font-bold">{teamInfo.name.toUpperCase()} TEAM</h1>
            <p className="text-white/90 text-sm mt-1">{teamInfo.department} Department</p>
          </div>
          <div className="absolute inset-0 overflow-hidden opacity-30">
            {Array.from({ length: 50 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1.5 h-1.5 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {activeNav === "dashboard" && (
            <div className="space-y-6">
              {/* Team Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card className="border-2">
                  <CardHeader className="pb-3">
                    <CardDescription>Team Size</CardDescription>
                    <CardTitle className="text-3xl" style={{ color: teamInfo.color }}>
                      {dashboardData?.teamSize || teamInfo.memberCount}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Users className="w-4 h-4" />
                      <span>Active Members</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="pb-3">
                    <CardDescription>Team Health Score</CardDescription>
                    <CardTitle className="text-3xl" style={{ color: teamInfo.color }}>
                      {dashboardData?.healthScore || teamInfo.healthScore}%
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <TrendingUp className="w-4 h-4" />
                      <span>Excellent Performance</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="pb-3">
                    <CardDescription>Avg Overall Score</CardDescription>
                    <CardTitle className="text-3xl" style={{ color: teamInfo.color }}>
                      {dashboardData?.avgOverallScore || teamMetrics.avgOverallScore}%
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Award className="w-4 h-4" />
                      <span>Team Average</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader className="pb-3">
                    <CardDescription>Assessment Completion</CardDescription>
                    <CardTitle className="text-3xl" style={{ color: teamInfo.color }}>
                      {dashboardData?.completionRate || teamMetrics.completionRate}%
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center gap-2 text-sm text-green-600">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>All Complete</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Team Performance Breakdown */}
              <Card className="border-2">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>Team Performance Breakdown</CardTitle>
                      <CardDescription>Average scores across key competencies</CardDescription>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-6 h-0.5 bg-purple-600 rounded-full"></div>
                      <span className="text-purple-600 font-medium">= Benchmark</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Leadership</span>
                        <span className="font-semibold" style={{ color: teamInfo.color }}>
                          {dashboardData?.performanceBreakdown?.leadership || teamMetrics.avgLeadershipScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
                        <div
                          className="absolute left-0 h-3 rounded-l-full transition-all"
                          style={{
                            width: `${dashboardData?.performanceBreakdown?.leadership || teamMetrics.avgLeadershipScore}%`,
                            backgroundColor: teamInfo.color,
                          }}
                        />
                        <div
                          className="absolute h-3 rounded-r-full transition-all"
                          style={{
                            left: `${dashboardData?.performanceBreakdown?.leadership || teamMetrics.avgLeadershipScore}%`,
                            width: `${teamMetrics.benchmarkLeadershipScore - (dashboardData?.performanceBreakdown?.leadership || teamMetrics.avgLeadershipScore)}%`,
                            backgroundColor: "#9333ea",
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Communication</span>
                        <span className="font-semibold" style={{ color: teamInfo.color }}>
                          {dashboardData?.performanceBreakdown?.communication || teamMetrics.avgCommunicationScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
                        <div
                          className="absolute left-0 h-3 rounded-l-full transition-all"
                          style={{
                            width: `${dashboardData?.performanceBreakdown?.communication || teamMetrics.avgCommunicationScore}%`,
                            backgroundColor: teamInfo.color,
                          }}
                        />
                        <div
                          className="absolute h-3 rounded-r-full transition-all"
                          style={{
                            left: `${dashboardData?.performanceBreakdown?.communication || teamMetrics.avgCommunicationScore}%`,
                            width: `${teamMetrics.benchmarkCommunicationScore - (dashboardData?.performanceBreakdown?.communication || teamMetrics.avgCommunicationScore)}%`,
                            backgroundColor: "#9333ea",
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Adaptability</span>
                        <span className="font-semibold" style={{ color: teamInfo.color }}>
                          {dashboardData?.performanceBreakdown?.adaptability || teamMetrics.avgAdaptabilityScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
                        <div
                          className="absolute left-0 h-3 rounded-l-full transition-all"
                          style={{
                            width: `${dashboardData?.performanceBreakdown?.adaptability || teamMetrics.avgAdaptabilityScore}%`,
                            backgroundColor: teamInfo.color,
                          }}
                        />
                        <div
                          className="absolute h-3 rounded-r-full transition-all"
                          style={{
                            left: `${dashboardData?.performanceBreakdown?.adaptability || teamMetrics.avgAdaptabilityScore}%`,
                            width: `${teamMetrics.benchmarkAdaptabilityScore - (dashboardData?.performanceBreakdown?.adaptability || teamMetrics.avgAdaptabilityScore)}%`,
                            backgroundColor: "#9333ea",
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-gray-900">Collaboration</span>
                        <span className="font-semibold" style={{ color: teamInfo.color }}>
                          {dashboardData?.performanceBreakdown?.collaboration || teamMetrics.avgCollaborationScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
                        <div
                          className="absolute left-0 h-3 rounded-l-full transition-all"
                          style={{
                            width: `${dashboardData?.performanceBreakdown?.collaboration || teamMetrics.avgCollaborationScore}%`,
                            backgroundColor: teamInfo.color,
                          }}
                        />
                        <div
                          className="absolute h-3 rounded-r-full transition-all"
                          style={{
                            left: `${dashboardData?.performanceBreakdown?.collaboration || teamMetrics.avgCollaborationScore}%`,
                            width: `${teamMetrics.benchmarkCollaborationScore - (dashboardData?.performanceBreakdown?.collaboration || teamMetrics.avgCollaborationScore)}%`,
                            backgroundColor: "#9333ea",
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers & Current Projects */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Top Performers</CardTitle>
                    <CardDescription>Team members with highest assessment scores</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {(dashboardData?.topPerformers ? dashboardData.topPerformers.map((p:any) => p.name) : teamMetrics.topPerformers).map((name: string, idx: number) => {
                        const member = teamMembers.find((m) => m.name === name);
                        return (
                          <div
                            key={idx}
                            className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100"
                          >
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
                              style={{ backgroundColor: teamInfo.color }}
                            >
                              {idx + 1}
                            </div>
                            <Avatar className="w-10 h-10">
                              <AvatarFallback
                                className="text-white"
                                style={{ backgroundColor: teamInfo.color }}
                              >
                                {name.split(" ").map((n) => n[0]).join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold text-gray-900">{name}</p>
                              <p className="text-sm text-gray-600">{member?.role || "Team Member"}</p>
                            </div>
                            <div className="ml-auto">
                              <Award className="w-5 h-5" style={{ color: teamInfo.color }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-2">
                  <CardHeader>
                    <CardTitle>Current Projects</CardTitle>
                    <CardDescription>{(dashboardData?.projects || currentProjects).length} active projects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {(dashboardData?.projects || currentProjects).map((project: any, idx: number) => (
                        <div key={idx} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="font-medium text-gray-900">{project.name}</span>
                            <span
                              className="px-2 py-1 rounded text-xs font-medium"
                              style={{
                                backgroundColor:
                                  project.status === "In Progress"
                                    ? "#106BB020"
                                    : project.status === "Active"
                                    ? "#06A11920"
                                    : "#f59e0b20",
                                color:
                                  project.status === "In Progress"
                                    ? "#106BB0"
                                    : project.status === "Active"
                                    ? "#06A119"
                                    : "#f59e0b",
                              }}
                            >
                              {project.status}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm text-gray-600">
                            <span>{project.deadline ? `Due: ${project.deadline}` : 'Active'}</span>
                            <span className="font-medium">{project.completion || project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="h-2 rounded-full transition-all"
                              style={{
                                width: `${project.completion || project.progress}%`,
                                backgroundColor: teamInfo.color,
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* THE SECTIONS BELOW (TEAM MEMBERS & PERFORMANCE) ARE UNTOUCHED AND INTACT! */}
          {/* ========================================================================= */}

          {activeNav === "team-members" && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Team Members</h2>
                  <p className="text-gray-600 mt-1">
                    Manage your team of {teamInfo.memberCount} members
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder="Search members..."
                      value={memberSearch}
                      onChange={(e) => setMemberSearch(e.target.value)}
                      className="pl-10 bg-white border-gray-200"
                    />
                  </div>
                </div>
              </div>

              {/* Team Members Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredMembers.map((member) => (
                  <Card key={member.id} className="border-2 hover:shadow-lg transition-shadow flex flex-col h-full">
                    <CardHeader className="pb-3">
                      <div className="flex items-start gap-4">
                        <Avatar className="w-14 h-14">
                          <AvatarFallback
                            className="text-white text-lg"
                            style={{ backgroundColor: teamInfo.color }}
                          >
                            {member.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <CardTitle className="text-lg">{member.name}</CardTitle>
                          <CardDescription className="mt-1 line-clamp-2 min-h-[2.5rem]">{member.role}</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3 flex-1 flex flex-col">
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="w-4 h-4" />
                          <span className="truncate">{member.email}</span>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-200 mt-auto">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm font-medium text-gray-700">Performance</span>
                          <span className="text-sm font-semibold" style={{ color: teamInfo.color }}>
                            {member.performance}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="h-2 rounded-full transition-all"
                            style={{
                              width: `${member.performance}%`,
                              backgroundColor: teamInfo.color,
                            }}
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2 pt-2">
                        <Button
                          variant="outline"
                          className="w-full"
                          style={{ borderColor: teamInfo.color, color: teamInfo.color }}
                          onClick={() => setSelectedMemberDetail(member.id)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button
                          variant="ghost"
                          className="w-full text-xs text-gray-500 hover:text-gray-900 h-8"
                          onClick={() => console.log(`Downloading report for ${member.name}`)}
                        >
                          <Download className="w-3 h-3 mr-2" />
                          Download Report
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {activeNav === "performance" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Team Performance Analytics</h2>
                <p className="text-gray-600 mt-1">Comprehensive performance metrics and insights</p>
              </div>

              <Tabs defaultValue="organizational" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-white border border-slate-200/60 rounded-2xl p-1.5 shadow-sm h-auto mb-10">
                  <TabsTrigger 
                    value="organizational"
                    className="data-[state=active]:bg-[#106BB0]/5 data-[state=active]:text-[#106BB0] data-[state=active]:shadow-sm rounded-xl py-3 px-6 transition-all duration-300 ease-in-out hover:bg-slate-50 font-semibold text-slate-500 border border-transparent data-[state=active]:border-[#106BB0]/10"
                  >
                    Organizational Effectiveness
                  </TabsTrigger>
                  <TabsTrigger 
                    value="team"
                    className="data-[state=active]:bg-[#1B8784]/5 data-[state=active]:text-[#1B8784] data-[state=active]:shadow-sm rounded-xl py-3 px-6 transition-all duration-300 ease-in-out hover:bg-slate-50 font-semibold text-slate-500 border border-transparent data-[state=active]:border-[#1B8784]/10"
                  >
                    Team Effectiveness & HR
                  </TabsTrigger>
                  <TabsTrigger 
                    value="succession"
                    className="data-[state=active]:bg-[#06A119]/5 data-[state=active]:text-[#06A119] data-[state=active]:shadow-sm rounded-xl py-3 px-6 transition-all duration-300 ease-in-out hover:bg-slate-50 font-semibold text-slate-500 border border-transparent data-[state=active]:border-[#06A119]/10"
                  >
                    Succession Metrics
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="organizational" className="space-y-10 mt-10">
                  {/* Header Section */}
                  <div className="bg-gradient-to-br from-white to-slate-50 p-12 rounded-[40px] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#106BB0]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#06A119]/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
                    
                    <div className="relative z-10 flex flex-col items-start">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-1 bg-gradient-to-r from-[#106BB0] to-[#06A119] rounded-full"></div>
                        <span className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Insights & Metrics</span>
                      </div>
                      <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none mb-6">
                        ORGANIZATIONAL<br/>
                        <span className="bg-gradient-to-r from-[#106BB0] to-[#06A119] bg-clip-text text-transparent">EFFECTIVENESS</span>
                      </h2>
                      <p className="text-slate-500 font-medium max-w-2xl text-lg leading-relaxed border-l-2 border-slate-200 pl-6">
                        Comprehensive performance analysis and organizational health monitoring. 
                        Tracking metrics across Q1 2026 to ensure sustainable growth and excellence.
                      </p>
                    </div>
                  </div>

                  {/* Completion Information and Health Check */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Completion Information */}
                    <Card className="border-2 border-slate-200/60 bg-white hover:border-[#106BB0]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
                        <CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest flex items-center gap-3">
                          <div className="p-2 bg-[#106BB0]/10 rounded-xl text-[#106BB0]">
                            <Users className="w-5 h-5" />
                          </div>
                          Completion Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="space-y-8">
                            <div className="bg-slate-50/30 rounded-3xl p-8 border border-slate-100/50">
                              <div className="flex items-center justify-between mb-8">
                                <div className="space-y-1">
                                  <span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">Live Engagement</span>
                                  <h3 className="text-2xl font-black text-slate-900">Total Completion</h3>
                                </div>
                                <div className="flex items-baseline gap-1">
                                  <span className="text-8xl font-black bg-gradient-to-br from-[#106BB0] to-[#1B8784] bg-clip-text text-transparent">82</span>
                                  <span className="text-2xl font-black text-slate-300">%</span>
                                </div>
                              </div>
                              <div className="grid grid-cols-2 gap-6">
                                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group/gender">
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-[#106BB0]"></div>
                                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Male Participation</span>
                                  </div>
                                  <div className="flex items-end justify-between mb-3">
                                    <span className="text-4xl font-black text-slate-900 tracking-tight">47%</span>
                                    <span className="text-[10px] font-black text-slate-300 uppercase">Target 50%</span>
                                  </div>
                                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-[#106BB0] h-full rounded-full transition-all duration-1000" style={{ width: '47%' }}></div>
                                  </div>
                                </div>
                                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group/gender">
                                  <div className="flex items-center gap-3 mb-4">
                                    <div className="w-2 h-2 rounded-full bg-[#06A119]"></div>
                                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest">Female Participation</span>
                                  </div>
                                  <div className="flex items-end justify-between mb-3">
                                    <span className="text-4xl font-black text-slate-900 tracking-tight">53%</span>
                                    <span className="text-[10px] font-black text-slate-300 uppercase">Target 50%</span>
                                  </div>
                                  <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-[#06A119] h-full rounded-full transition-all duration-1000" style={{ width: '53%' }}></div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* Role Breakdown */}
                            <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                              <div className="flex items-center gap-3 mb-8">
                                <div className="w-1 h-6 bg-[#106BB0] rounded-full"></div>
                                <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.1em]">Role Distribution & Readiness</h3>
                              </div>
                              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                {[
                                  { role: 'New Graduate', count: 12, color: '#106BB0' },
                                  { role: 'Junior Consultant', count: 7, color: '#1B8784' },
                                  { role: 'Consultant', count: 14, color: '#06A119' },
                                  { role: 'Senior Consultant', count: 22, color: '#106BB0' },
                                  { role: 'Manager', count: 19, color: '#1B8784' },
                                  { role: 'Executive', count: 23, color: '#06A119' }
                                ].map((item, idx) => (
                                  <div key={idx} className="space-y-3 group/item">
                                    <div className="flex items-center justify-between">
                                      <span className="text-[11px] font-black text-slate-500 uppercase tracking-tight group-hover/item:text-slate-900 transition-colors">{item.role}</span>
                                      <span className="text-sm font-black text-slate-900">{item.count}</span>
                                    </div>
                                    <div className="w-full bg-slate-50 rounded-full h-2 overflow-hidden border border-slate-100">
                                      <div 
                                        className="h-full rounded-full transition-all duration-1000 ease-out"
                                        style={{ 
                                          width: `${(item.count / 23) * 100}%`,
                                          backgroundColor: item.color
                                        }}
                                      ></div>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Health Check and Performance/Potential */}
                    <div className="space-y-6">
                      {/* Health Check */}
                      <Card className="border-2 border-slate-200/60 bg-white hover:border-[#1B8784]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
                          <CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest flex items-center gap-3">
                            <div className="p-2 bg-[#1B8784]/10 rounded-xl text-[#1B8784]">
                              <Activity className="w-5 h-5" />
                            </div>
                            Organizational Health
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                          <div className="space-y-10">
                            {[
                              { label: 'Organizational Health', score: 81, stars: 4 },
                              { label: 'Collaboration & Communication', score: 92, stars: 5 },
                              { label: 'Adaptability', score: 67, stars: 3 }
                            ].map((item, idx) => (
                              <div key={idx} className="flex items-center justify-between group/health">
                                <div className="flex-1">
                                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 group-hover/health:text-slate-900 transition-colors">{item.label}</div>
                                  <div className="flex items-center gap-1.5">
                                    {[...Array(5)].map((_, i) => (
                                      <span key={i} className={`text-2xl transition-all duration-300 ${i < Math.floor(item.stars) ? 'text-[#06A119]' : 'text-slate-200'}`}>
                                        ★
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div className="text-6xl font-black bg-gradient-to-r from-[#106BB0] to-[#06A119] bg-clip-text text-transparent group-hover/health:scale-110 transition-transform tracking-tighter">{item.score}%</div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>

                      {/* Talent Density Analysis */}
                      <Card className="border-2 border-slate-200/60 bg-white hover:border-[#06A119]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
                          <CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest flex items-center gap-3">
                            <div className="p-2 bg-[#06A119]/10 rounded-xl text-[#06A119]">
                              <TrendingUp className="w-5 h-5" />
                            </div>
                            Talent Density
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                          <div className="flex flex-col items-center">
                            <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">Active Workforce</div>
                            <div className="text-8xl font-black text-slate-900 mb-10 tracking-tighter flex items-baseline">
                              640
                              <span className="text-lg font-black text-slate-300 ml-2 uppercase tracking-widest">Team</span>
                            </div>
                            
                            <div className="grid grid-cols-2 gap-6 w-full">
                              <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 text-center hover:bg-white hover:shadow-md transition-all group/item">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">High Performing</div>
                                <div className="text-4xl font-black text-[#06A119] mb-1">28%</div>
                                <div className="text-[10px] font-bold text-slate-300 uppercase">179 Staff</div>
                              </div>
                              <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 text-center hover:bg-white hover:shadow-md transition-all group/item">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">High Potential</div>
                                <div className="text-4xl font-black text-[#106BB0] mb-1">4%</div>
                                <div className="text-[10px] font-bold text-slate-300 uppercase">26 Staff</div>
                              </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-100 w-full flex justify-center gap-6">
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Benchmark: 10-30%</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Industry: Top Tier</span>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>

                  {/* Currently Capable and Retention Rate */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="border-2 border-slate-200/60 bg-white hover:border-[#106BB0]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
                        <CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest flex items-center gap-3">
                          <div className="p-2 bg-[#106BB0]/10 rounded-xl text-[#106BB0]">
                            <Target className="w-5 h-5" />
                          </div>
                          Capability Assessment
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="space-y-2 mb-8">
                          <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Workforce Readiness</div>
                          <div className="text-2xl font-black text-slate-900">Currently Capable vs Not Ready</div>
                        </div>
                        <div className="w-full bg-slate-50 rounded-full h-16 flex overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] border border-slate-100 p-1.5">
                          <div className="bg-gradient-to-br from-[#106BB0] to-[#1B8784] h-full rounded-full flex items-center justify-center text-white font-black text-xl italic tracking-tighter transition-all duration-500 hover:scale-[1.02]" style={{ width: '46%' }}>
                            46%
                          </div>
                          <div className="bg-gradient-to-br from-[#06A119] to-[#1B8784] h-full rounded-full flex items-center justify-center text-white font-black text-xl italic tracking-tighter transition-all duration-500 hover:scale-[1.02] ml-1" style={{ width: '54%' }}>
                            54%
                          </div>
                        </div>
                        <div className="flex justify-center gap-12 mt-8">
                          <div className="flex items-center gap-3 group/leg">
                            <div className="w-3 h-3 bg-gradient-to-br from-[#106BB0] to-[#1B8784] rounded-full shadow-sm group-hover/leg:scale-125 transition-transform"></div>
                            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest group-hover/leg:text-slate-900 transition-colors">NOT READY (NO)</span>
                          </div>
                          <div className="flex items-center gap-3 group/leg">
                            <div className="w-3 h-3 bg-gradient-to-br from-[#06A119] to-[#1B8784] rounded-full shadow-sm group-hover/leg:scale-125 transition-transform"></div>
                            <span className="text-[11px] font-black text-slate-500 uppercase tracking-widest group-hover/leg:text-slate-900 transition-colors">CAPABLE (YES)</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-slate-200/60 bg-white hover:border-[#106BB0]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden p-0">
                      <div className="p-8 bg-slate-50/50 border-b border-slate-100">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#106BB0]"></div>
                          <div className="w-1.5 h-1.5 rounded-full bg-[#06A119]"></div>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Workforce Stability</span>
                        </div>
                        <h2 className="text-5xl font-black text-slate-900 tracking-tighter flex items-center">
                          RETENTION <span className="text-[#06A119] ml-3 italic">RATE</span>
                        </h2>
                      </div>

                      <div className="p-8">
                        <div className="grid grid-cols-2 gap-12 items-center mb-10">
                          {/* High Potential Gauge */}
                          <div className="flex flex-col items-center">
                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">High Potential</span>
                            <div className="relative w-48 h-48">
                              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                <circle cx="50" cy="50" r="44" fill="transparent" stroke="#F1F5F9" strokeWidth="10" />
                                <circle 
                                  cx="50" 
                                  cy="50" 
                                  r="44" 
                                  fill="none" 
                                  stroke="#06A119" 
                                  strokeWidth="10" 
                                  strokeDasharray="276.46" 
                                  strokeDashoffset={276.46 * (1 - 0.91)} 
                                  strokeLinecap="round" 
                                  className="transition-all duration-1000 ease-in-out"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex items-baseline">
                                  <span className="text-6xl font-black text-slate-900">91</span>
                                  <span className="text-xl font-black text-slate-300 ml-1">%</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* All Employees Gauge */}
                          <div className="flex flex-col items-center">
                            <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6">All Employees</span>
                            <div className="relative w-48 h-48">
                              <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                                <circle cx="50" cy="50" r="44" fill="transparent" stroke="#F1F5F9" strokeWidth="10" />
                                <circle 
                                  cx="50" 
                                  cy="50" 
                                  r="44" 
                                  fill="none" 
                                  stroke="#106BB0" 
                                  strokeWidth="10" 
                                  strokeDasharray="276.46" 
                                  strokeDashoffset={276.46 * (1 - 0.73)} 
                                  strokeLinecap="round" 
                                  className="transition-all duration-1000 ease-in-out"
                                />
                              </svg>
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="flex items-baseline">
                                  <span className="text-6xl font-black text-slate-900">73</span>
                                  <span className="text-xl font-black text-slate-300 ml-1">%</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target HP</div>
                            <div className="text-lg font-black text-slate-900">85-95%</div>
                          </div>
                          <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target All</div>
                            <div className="text-lg font-black text-slate-900">70-85%</div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </div>

                  {/* Internal Mobility and Pay Equity */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="border-2 border-gray-200 hover:border-[#1B8784] hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 group-hover:from-blue-100 group-hover:to-green-100 transition-all duration-500 rounded-t-lg">
                        <CardTitle className="text-[#106BB0] group-hover:text-[#1B8784] transition-colors duration-300 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                          Internal Mobility Rate
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-5">
                          {[
                            { label: 'High Potential', rate: 22 },
                            { label: 'High Performers', rate: 18 },
                            { label: 'General Population', rate: 5 }
                          ].map((item, idx) => (
                            <div key={idx} className="hover:bg-gradient-to-r hover:from-green-50/50 hover:to-transparent p-2 rounded-lg transition-all duration-300 hover:scale-[1.02] group/mobility">
                              <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-gray-800 group-hover/mobility:text-[#1B8784] transition-colors">{item.label}</span>
                                <span className="text-3xl font-bold bg-gradient-to-r from-[#106BB0] to-[#06A119] bg-clip-text text-transparent">{item.rate}%</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-4 overflow-hidden shadow-inner">
                                <div 
                                  className="h-4 rounded-full transition-all duration-1000 ease-out hover:shadow-lg"
                                  style={{ 
                                    width: `${item.rate * 2.5}%`,
                                    background: idx === 0 ? 'linear-gradient(to right, #06A119, #1B8784)' : idx === 1 ? 'linear-gradient(to right, #1B8784, #06A119)' : 'linear-gradient(to right, #106BB0, #1B8784)'
                                  }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-4 border-t-2 text-xs text-center text-gray-600 font-medium">
                          Benchmark: High Potential (20-35%) | High Performers (10-20%) | General (5-15%)
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-gray-200 hover:border-[#06A119] hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50 group-hover:from-blue-100 group-hover:to-green-100 transition-all duration-500 rounded-t-lg">
                        <CardTitle className="text-[#106BB0] group-hover:text-[#1B8784] transition-colors duration-300 flex items-center gap-2">
                          <Target className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                          Pay Equity Gap
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="space-y-4">
                          <div className="text-center text-sm font-bold text-gray-700">GAP</div>
                          <div className="w-full bg-gray-200 rounded-full h-12 flex overflow-hidden border-2 border-gray-300 shadow-lg hover:shadow-2xl transition-all duration-300">
                            <div className="bg-gradient-to-r from-[#06A119] to-[#1B8784] h-12 flex items-center justify-center text-white font-bold text-sm transition-all duration-500 hover:scale-105" style={{ width: '47%' }}>
                              Female 47%
                            </div>
                            <div className="bg-gradient-to-r from-[#106BB0] to-[#1B8784] h-12 flex items-center justify-center text-white font-bold text-sm transition-all duration-500 hover:scale-105" style={{ width: '53%' }}>
                              Male 53%
                            </div>
                          </div>
                          <div className="text-center pt-2">
                            <span className="text-xs text-gray-600">Benchmark: </span>
                            <span className="text-xs font-bold">&lt;5%</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Hidden Talent and Ready for Promotion */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="border-2 border-gray-200 hover:border-[#106BB0] bg-gradient-to-br from-blue-50/80 to-purple-50/80 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 pr-6">
                            <h3 className="text-2xl font-bold text-[#106BB0] mb-3 group-hover:text-[#1B8784] transition-colors duration-300 flex items-center gap-2">
                              <Eye className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                              Undiscovered Hidden Talent
                            </h3>
                            <p className="text-sm text-gray-700 leading-relaxed">
                              People who scored higher than their expected benchmark but have not been flagged for high performance or high potential. (For Managers, they also scored high in engagement)
                            </p>
                          </div>
                          <div className="text-8xl font-bold bg-gradient-to-r from-[#106BB0] to-[#1B8784] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">23</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-gray-200 hover:border-[#06A119] bg-gradient-to-br from-green-50/80 to-blue-50/80 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group">
                      <CardContent className="pt-6">
                        <div className="flex items-center justify-between">
                          <div className="flex-1 pr-6">
                            <h3 className="text-2xl font-bold text-[#06A119] mb-3 group-hover:text-[#1B8784] transition-colors duration-300 flex items-center gap-2">
                              <Award className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                              Ready For Promotion
                            </h3>
                            <p className="text-sm text-gray-700 mb-2 leading-relaxed">
                              People who have been in their role for at least 18 months, been meeting or exceeding performance expectations and have hit the benchmark for their level.
                            </p>
                            <p className="text-xs text-gray-600">
                              <span className="font-bold">NOTE:</span> If a person is not provided a new experience/role every 18-24 months, they <span className="text-red-600 font-bold">become a flight risk</span>.
                            </p>
                          </div>
                          <div className="text-8xl font-bold bg-gradient-to-r from-[#06A119] to-[#1B8784] bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">14</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Top and Lowest Categories */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="border-2 border-gray-200 hover:border-[#1B8784] bg-gradient-to-br from-blue-50/80 to-green-50/80 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-[#1B8784] mb-2 group-hover:text-[#06A119] transition-colors duration-300">TOP SCORING CATEGORY</h3>
                          <p className="text-sm text-gray-600 mb-6 font-medium">Your organization ranked highest in:</p>
                          <div className="flex items-center justify-center gap-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                            <Award className="w-20 h-20 text-[#1B8784] group-hover:text-[#06A119] transition-colors duration-300" />
                            <div className="text-4xl font-bold bg-gradient-to-r from-[#1B8784] to-[#06A119] bg-clip-text text-transparent">EMBRACES AGILITY</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-gray-200 hover:border-[#106BB0] bg-gradient-to-br from-purple-50/80 to-blue-50/80 hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group">
                      <CardContent className="pt-6">
                        <div className="text-center">
                          <h3 className="text-2xl font-bold text-[#1B8784] mb-2 group-hover:text-[#106BB0] transition-colors duration-300">LOWEST SCORING CATEGORY</h3>
                          <p className="text-sm text-gray-600 mb-6 font-medium">Your organization ranked lowest in:</p>
                          <div className="flex items-center justify-center gap-4 mb-4 group-hover:scale-110 transition-transform duration-300">
                            <AlertCircle className="w-20 h-20 text-[#1B8784] group-hover:text-[#106BB0] transition-colors duration-300" />
                            <div className="text-4xl font-bold bg-gradient-to-r from-[#1B8784] to-[#106BB0] bg-clip-text text-transparent">LIMITS RISK</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Top and Lowest Business Areas */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card className="border-2 border-gray-200 hover:border-[#06A119] hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group">
                      <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 group-hover:from-green-100 group-hover:to-blue-100 transition-all duration-500 rounded-t-lg">
                        <CardTitle className="text-[#06A119] group-hover:text-[#1B8784] transition-colors duration-300 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                          TOP RANKED BUSINESS AREA
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4 mb-6 group-hover:scale-105 transition-transform duration-300">
                          <div className="w-20 h-20 bg-gradient-to-br from-[#06A119] to-[#1B8784] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-2xl transition-all duration-300">
                            <span className="text-4xl text-white font-bold">$</span>
                          </div>
                          <div className="text-2xl font-bold bg-gradient-to-r from-[#06A119] to-[#1B8784] bg-clip-text text-transparent">BUSINESS DEVELOPMENT</div>
                        </div>
                        <div className="space-y-3">
                          {[
                            { letter: 'L', score: 80 },
                            { letter: 'E', score: 90 },
                            { letter: 'A', score: 71 },
                            { letter: 'D', score: 96 },
                            { letter: 'S', score: 86 }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 hover:bg-green-50/50 p-2 rounded-lg transition-all duration-300 hover:scale-[1.02] group/bar">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#06A119] to-[#1B8784] text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-md group-hover/bar:shadow-xl transition-all duration-300">
                                {item.letter}
                              </div>
                              <div className="flex-1 bg-gray-200 rounded-full h-8 flex overflow-hidden shadow-inner">
                                <div 
                                  className="bg-gradient-to-r from-[#06A119] to-[#1B8784] h-8 flex items-center justify-end pr-3 text-white font-bold text-sm transition-all duration-1000 ease-out hover:shadow-xl"
                                  style={{ width: `${item.score}%` }}
                                >
                                  {item.score}%
                                </div>
                                <div 
                                  className="bg-gradient-to-r from-[#1e3a5f] to-[#2c4f7c] h-8"
                                  style={{ width: `${100 - item.score}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-gray-200 hover:border-[#106BB0] hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] group">
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 group-hover:from-blue-100 group-hover:to-purple-100 transition-all duration-500 rounded-t-lg">
                        <CardTitle className="text-[#106BB0] group-hover:text-[#1B8784] transition-colors duration-300 flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                          LOWEST RANKED BUSINESS AREA
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4 mb-6 group-hover:scale-105 transition-transform duration-300">
                          <Users className="w-20 h-20 text-[#106BB0] group-hover:text-[#1B8784] transition-colors duration-300" />
                          <div className="text-2xl font-bold bg-gradient-to-r from-[#106BB0] to-[#1B8784] bg-clip-text text-transparent">HUMAN RESOURCES</div>
                        </div>
                        <div className="space-y-3">
                          {[
                            { letter: 'L', score: 80 },
                            { letter: 'E', score: 90 },
                            { letter: 'A', score: 71 },
                            { letter: 'D', score: 96 },
                            { letter: 'S', score: 86 }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 hover:bg-blue-50/50 p-2 rounded-lg transition-all duration-300 hover:scale-[1.02] group/bar">
                              <div className="w-10 h-10 bg-gradient-to-br from-[#106BB0] to-[#1B8784] text-white rounded-lg flex items-center justify-center font-bold text-lg shadow-md group-hover/bar:shadow-xl transition-all duration-300">
                                {item.letter}
                              </div>
                              <div className="flex-1 bg-gray-200 rounded-full h-8 flex overflow-hidden shadow-inner">
                                <div 
                                  className="bg-gradient-to-r from-[#106BB0] to-[#1B8784] h-8 flex items-center justify-end pr-3 text-white font-bold text-sm transition-all duration-1000 ease-out hover:shadow-xl"
                                  style={{ width: `${item.score}%` }}
                                >
                                  {item.score}%
                                </div>
                                <div 
                                  className="bg-[#1e3a5f] h-7"
                                  style={{ width: `${100 - item.score}%` }}
                                ></div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Enterprise Benchmark Table Redesign - Based on Image but high-end style */}
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-1.5 h-6 bg-gradient-to-b from-[#106BB0] to-[#06A119] rounded-full"></div>
                      <h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.2em]">Enterprise Benchmark Analysis</h3>
                    </div>
                    
                    <div className="bg-white border-2 border-slate-200/60 rounded-[40px] shadow-sm overflow-hidden">
                      {/* Header Row */}
                      <div className="grid grid-cols-[1fr_1.2fr_1fr] border-b border-slate-100 bg-slate-50/50">
                        <div className="p-8 text-center border-r border-slate-100">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1">Performance Highs</span>
                          <h3 className="font-black text-lg text-slate-900 leading-tight uppercase tracking-tighter">
                            Highest Scoring Area
                          </h3>
                        </div>
                        <div className="p-8 text-center border-r border-slate-100">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1">Standardized Metrics</span>
                          <h3 className="font-black text-lg text-slate-900 leading-tight uppercase tracking-tighter">
                            Enterprise Benchmark
                          </h3>
                        </div>
                        <div className="p-8 text-center">
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] block mb-1">Performance Lows</span>
                          <h3 className="font-black text-lg text-slate-900 leading-tight uppercase tracking-tighter">
                            Lowest Scoring Area
                          </h3>
                        </div>
                      </div>

                      {/* Data Rows */}
                      {[
                        { high: { name: 'FINANCE', score: 81 }, benchmark: { name: 'LIMITS RISK', score: 81 }, low: { name: 'HUMAN RESOURCES', score: 28 } },
                        { high: { name: 'MARKETING', score: 92 }, benchmark: { name: 'EMBRACES AGILITY', score: 86 }, low: { name: 'COMPLIANCE', score: 48 } },
                        { high: { name: 'PROJECT MGMT OFFICE', score: 74 }, benchmark: { name: 'ACHIEVES EXCELLENCE', score: 70 }, low: { name: 'ACCOUNTS RECEIVABLE', score: 40 } },
                        { high: { name: 'BUSINESS DEVELOPMENT', score: 96 }, benchmark: { name: 'DEVELOPS RELATIONSHIPS', score: 83 }, low: { name: 'FINANCE', score: 46 } },
                        { high: { name: 'HUMAN RESOURCES', score: 88 }, benchmark: { name: 'SETS PURPOSE', score: 72 }, low: { name: 'INFO TECHNOLOGY', score: 43 } }
                      ].map((row, idx) => (
                        <div key={idx} className="grid grid-cols-[1fr_1.2fr_1fr] border-b border-slate-50 last:border-b-0 group">
                          {/* Highest Scoring Column */}
                          <div className="p-8 border-r border-slate-50 flex flex-col justify-center bg-white group-hover:bg-slate-50/30 transition-colors">
                            <div className="text-center font-black text-[10px] mb-4 text-slate-400 uppercase tracking-widest">{row.high.name}</div>
                            <div className="flex items-center gap-4">
                              <div className="flex-1 h-10 bg-slate-50 rounded-full flex overflow-hidden border border-slate-100 p-1">
                                <div 
                                  className="bg-gradient-to-r from-[#06A119] to-[#1B8784] h-full rounded-full shadow-sm transition-all duration-1000"
                                  style={{ width: `${row.high.score}%` }}
                                ></div>
                              </div>
                              <div className="font-black text-3xl text-slate-900 w-16 leading-none italic tracking-tighter">{row.high.score}%</div>
                            </div>
                          </div>

                          {/* Enterprise Benchmark Column */}
                          <div className="p-8 border-r border-slate-50 flex items-center justify-between bg-slate-50/20 px-10 group-hover:bg-slate-50 transition-colors">
                            <div className="font-black text-sm text-slate-500 leading-tight uppercase tracking-widest max-w-[140px]">{row.benchmark.name}</div>
                            <div className="font-black text-6xl text-slate-900 leading-none tracking-tighter italic">{row.benchmark.score}%</div>
                          </div>

                          {/* Lowest Scoring Column */}
                          <div className="p-8 flex flex-col justify-center bg-white group-hover:bg-slate-50/30 transition-colors">
                            <div className="text-center font-black text-[10px] mb-4 text-slate-400 uppercase tracking-widest">{row.low.name}</div>
                            <div className="flex items-center gap-4">
                              <div className="flex-1 h-10 bg-slate-50 rounded-full flex overflow-hidden border border-slate-100 p-1">
                                <div 
                                  className="bg-gradient-to-r from-[#106BB0] to-[#1B8784] h-full rounded-full shadow-sm transition-all duration-1000"
                                  style={{ width: `${row.low.score}%` }}
                                ></div>
                              </div>
                              <div className="font-black text-3xl text-slate-900 w-16 leading-none italic tracking-tighter">{row.low.score}%</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="team" className="space-y-10 mt-10">
                  {/* Header Section */}
                  <div className="bg-gradient-to-br from-white to-slate-50 p-12 rounded-[40px] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#1B8784]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#06A119]/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
                    
                    <div className="relative z-10 flex flex-col items-start">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-1 bg-gradient-to-r from-[#1B8784] to-[#06A119] rounded-full"></div>
                        <span className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Departmental Insights</span>
                      </div>
                      <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none mb-6 uppercase">
                        TEAM EFFECTIVENESS<br/>
                        <span className="bg-gradient-to-r from-[#1B8784] to-[#06A119] bg-clip-text text-transparent">HUMAN RESOURCES</span>
                      </h2>
                      <p className="text-slate-500 font-medium max-w-2xl text-lg leading-relaxed border-l-2 border-slate-200 pl-6">
                        Detailed breakdown of team participation, leadership competencies, and performance benchmarks for the Human Resources business area.
                      </p>
                    </div>
                  </div>

                  {/* Row 1: Completed by Level, Health Check, and HR Business Area */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Completed by Level */}
                    <Card className="border-2 border-slate-200/60 bg-white hover:border-[#1B8784]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
                        <CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest flex items-center gap-3">
                          <div className="p-2 bg-[#1B8784]/10 rounded-xl text-[#1B8784]">
                            <Users className="w-5 h-5" />
                          </div>
                          Completed by Level
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="space-y-6">
                          {[
                            { role: 'New Graduate', count: 12, max: 25 },
                            { role: 'Junior Consultant', count: 7, max: 25 },
                            { role: 'Consultant', count: 14, max: 25 },
                            { role: 'Senior Consultant', count: 22, max: 25 },
                            { role: 'Manager', count: 19, max: 25 },
                            { role: 'Executive', count: 23, max: 25 }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-6 group/level">
                              <div className="w-32 text-[10px] font-black text-slate-400 uppercase tracking-tight group-hover/level:text-slate-900 transition-colors leading-tight">
                                {item.role}
                              </div>
                              <div className="flex-1 h-10 bg-slate-50 rounded-full relative overflow-hidden flex items-center border border-slate-100 p-1 shadow-[inset_0_1px_2px_rgba(0,0,0,0.05)]">
                                <div 
                                  className="h-full rounded-full bg-gradient-to-r from-[#00A651] to-[#00894F] flex items-center justify-end pr-3 relative shadow-sm"
                                  style={{ width: `${(item.count / item.max) * 100}%` }}
                                >
                                  {/* Start Glow Circle */}
                                  <div className="absolute left-1 top-1 w-6 h-6 rounded-full bg-[#00EB6F]/20 flex items-center justify-center">
                                    <div className="w-4 h-4 rounded-full bg-[#00EB6F] shadow-[0_0_8px_#00EB6F]"></div>
                                  </div>
                                  <span className="text-white font-black text-xs italic tracking-tighter relative z-10 drop-shadow-sm">{item.count}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Health Check */}
                    <Card className="border-2 border-slate-200/60 bg-white hover:border-[#06A119]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
                        <CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest flex items-center gap-3">
                          <div className="p-2 bg-[#06A119]/10 rounded-xl text-[#06A119]">
                            <Activity className="w-5 h-5" />
                          </div>
                          Team Health Monitor
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="space-y-10">
                          {[
                            { label: 'Organizational Health', score: 81, stars: 4 },
                            { label: 'Collaboration & Communication', score: 92, stars: 5 },
                            { label: 'Adaptability', score: 67, stars: 3 }
                          ].map((item, idx) => (
                            <div key={idx} className="flex items-center justify-between group/health">
                              <div className="flex-1">
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 group-hover/health:text-slate-900 transition-colors">{item.label}</div>
                                <div className="flex items-center gap-1.5">
                                  {[...Array(5)].map((_, i) => (
                                    <span key={i} className={`text-2xl transition-all duration-300 ${i < Math.floor(item.stars) ? 'text-[#06A119]' : 'text-slate-100'}`}>
                                      ★
                                    </span>
                                  ))}
                                </div>
                              </div>
                              <div className="text-6xl font-black bg-gradient-to-r from-[#106BB0] to-[#06A119] bg-clip-text text-transparent group-hover/health:scale-110 transition-transform tracking-tighter">{item.score}%</div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* HR Business Area Overview */}
                    <Card className="border-2 border-slate-200/60 bg-white hover:border-[#106BB0]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
                        <CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest flex items-center gap-3">
                          <div className="p-2 bg-[#106BB0]/10 rounded-xl text-[#106BB0]">
                            <Briefcase className="w-5 h-5" />
                          </div>
                          HR Business Area
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-4">
                        <div className="border border-slate-200 rounded-[24px] overflow-hidden bg-white shadow-sm">
                          <div className="grid grid-cols-2 bg-slate-50 border-b border-slate-200">
                            <div className="p-4 text-center border-r border-slate-200 flex flex-col justify-center min-h-[70px]">
                              <span className="text-[11px] font-black text-[#0D1B2A] uppercase tracking-wider leading-[1.2]">
                                HUMAN RESOURCES<br/>BUSINESS AREA
                              </span>
                            </div>
                            <div className="p-4 text-center flex flex-col justify-center min-h-[70px]">
                              <span className="text-[11px] font-black text-[#0D1B2A] uppercase tracking-wider leading-[1.2]">
                                ENTERPRISE<br/>BENCHMARK
                              </span>
                            </div>
                          </div>
                          {[
                            { area: 'FINANCE', score: 81, bLabel: 'LIMITS RISK', bScore: 81 },
                            { area: 'MARKETING', score: 92, bLabel: 'EMBRACES AGILITY', bScore: 86 },
                            { area: 'PROJECT MANAGEMENT OFFICE', score: 74, bLabel: 'ACHIEVES EXCELLENCE', bScore: 70 },
                            { area: 'BUSINESS DEVELOPMENT', score: 96, bLabel: 'DEVELOPS RELATIONSHIPS', bScore: 83 },
                            { area: 'HUMAN RESOURCES', score: 88, bLabel: 'SETS PURPOSE', bScore: 72 }
                          ].map((item, idx) => (
                            <div key={idx} className="grid grid-cols-2 border-b border-slate-200 last:border-0 hover:bg-slate-50/50 transition-colors">
                              {/* Left Column */}
                              <div className="p-4 border-r border-slate-200 flex items-center justify-center">
                                <div className="w-full h-8 bg-[#0D1B2A] rounded-sm overflow-hidden flex shadow-[inset_0_1px_2px_rgba(0,0,0,0.1)]">
                                  <div className="h-full bg-[#06A119] shadow-[0_0_10px_rgba(6,161,25,0.3)]" style={{ width: `${item.score}%` }}></div>
                                </div>
                              </div>
                              {/* Right Column */}
                              <div className="p-4 flex items-center justify-between gap-4">
                                <div className="text-[11px] font-black text-slate-900 uppercase leading-[1.3] max-w-[120px] tracking-tight">{item.bLabel}</div>
                                <div className="text-2xl font-black text-slate-900 italic tracking-tighter">{item.bScore}%</div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Row 2: Are Staff At Expected Levels */}
                  <Card className="border-2 border-slate-200/60 bg-white hover:border-[#1B8784]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
                      <CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest flex items-center gap-3">
                        <div className="p-2 bg-[#1B8784]/10 rounded-xl text-[#1B8784]">
                          <Target className="w-5 h-5" />
                        </div>
                        Are Staff At Expected Levels?
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-10 px-12">
                      <div className="space-y-8">
                        {[
                          { category: 'Overall Business Area', yes: 56 },
                          { category: 'Compensation', yes: 35 },
                          { category: 'Employee Benefits', yes: 63 },
                          { category: 'Labour Relations', yes: 44 },
                          { category: 'Recruitment', yes: 44 },
                          { category: 'Training & Development', yes: 54 }
                        ].map((item, idx) => (
                          <div key={idx} className="flex items-center gap-10 group/bar">
                            <div className="w-56 text-[11px] font-black text-slate-400 uppercase tracking-[0.1em] leading-tight group-hover/bar:text-slate-900 transition-colors">
                              {item.category}
                            </div>
                            <div className="flex-1 h-12 bg-slate-50 rounded-full relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] border border-slate-100 p-1.5 overflow-hidden flex items-center">
                              <div 
                                className="h-full rounded-full bg-gradient-to-r from-[#06A119] via-[#108A2B] to-[#1B8784] flex items-center justify-center relative transition-all duration-1000 ease-out shadow-sm"
                                style={{ width: `${item.yes}%` }}
                              >
                                <span className="text-white font-black text-lg italic tracking-tighter drop-shadow-sm">
                                  {item.yes}%
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Row 3: Leadership Team Scores */}
                  <Card className="border-2 border-slate-200/60 bg-white hover:border-[#06A119]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
                      <CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest flex items-center gap-3">
                        <div className="p-2 bg-[#06A119]/10 rounded-xl text-[#06A119]">
                          <Award className="w-5 h-5" />
                        </div>
                        Leadership Team Scores (AVP+)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b-2 border-slate-100">
                            <th className="p-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50 rounded-tl-2xl">Name</th>
                            <th className="p-5 text-center text-[11px] font-black text-[#106BB0] uppercase tracking-widest bg-slate-50/50">Limits Risk</th>
                            <th className="p-5 text-center text-[11px] font-black text-[#06A119] uppercase tracking-widest bg-slate-50/50">Embraces Agility</th>
                            <th className="p-5 text-center text-[11px] font-black text-[#1B8784] uppercase tracking-widest bg-slate-50/50">Achieves Excellence</th>
                            <th className="p-5 text-center text-[11px] font-black text-[#106BB0] uppercase tracking-widest bg-slate-50/50">Develops Rel.</th>
                            <th className="p-5 text-center text-[11px] font-black text-[#06A119] uppercase tracking-widest bg-slate-50/50 rounded-tr-2xl">Sets Purpose</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            { name: 'Ahmed, Uzair', scores: ['Needs Development', 'Needs Development', 'Needs Development', 'Needs Development', 'Needs Development'] },
                            { name: 'Harjot Kaur', scores: ['At or exceeds level', 'At or exceeds level', 'At or exceeds level', 'At or exceeds level', 'At or exceeds level'] },
                            { name: 'Jashanpreet Kaur', scores: ['At or exceeds level', 'At or exceeds level', 'At or exceeds level', 'At or exceeds level', 'At or exceeds level'] },
                            { name: 'Nozica, Nadia', scores: ['Needs Development', 'Needs Development', 'At or exceeds level', 'At or exceeds level', 'Needs Development'] },
                            { name: 'Singh, Manpreet', scores: ['At or exceeds level', 'At or exceeds level', 'At or exceeds level', 'At or exceeds level', 'At or exceeds level'] }
                          ].map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors group/row">
                              <td className="p-5 font-black text-slate-900 text-sm italic">{row.name}</td>
                              {row.scores.map((score, scoreIdx) => (
                                <td key={scoreIdx} className="p-4">
                                  <div className={`p-3 text-center text-[10px] font-black uppercase tracking-tighter transition-all duration-300 rounded-xl shadow-sm ${score === 'At or exceeds level' ? 'bg-gradient-to-br from-[#06A119] to-[#1B8784] text-white' : score === 'Needs Development' ? 'bg-[#106BB0] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                    {score}
                                  </div>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>

                  {/* Row 4: Team Scores */}
                  <Card className="border-2 border-slate-200/60 bg-white hover:border-[#106BB0]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                    <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
                      <CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest flex items-center gap-3">
                        <div className="p-2 bg-[#106BB0]/10 rounded-xl text-[#106BB0]">
                          <Users className="w-5 h-5" />
                        </div>
                        Team Effectiveness Scores
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-8 overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b-2 border-slate-100">
                            <th className="p-5 text-left text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50/50 rounded-tl-2xl">Name</th>
                            <th className="p-5 text-center text-[11px] font-black text-[#106BB0] uppercase tracking-widest bg-slate-50/50">Limits Risk</th>
                            <th className="p-5 text-center text-[11px] font-black text-[#06A119] uppercase tracking-widest bg-slate-50/50">Embraces Agility</th>
                            <th className="p-5 text-center text-[11px] font-black text-[#1B8784] uppercase tracking-widest bg-slate-50/50">Achieves Excellence</th>
                            <th className="p-5 text-center text-[11px] font-black text-[#106BB0] uppercase tracking-widest bg-slate-50/50">Develops Rel.</th>
                            <th className="p-5 text-center text-[11px] font-black text-[#06A119] uppercase tracking-widest bg-slate-50/50 rounded-tr-2xl">Sets Purpose</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {[
                            { name: 'Akeel Mohamed', scores: ['Needs Development', 'At or exceeds level', 'At or exceeds level', 'At or exceeds level', 'Needs Development'] },
                            { name: 'Gagandeep Kaur - 167', scores: ['At or exceeds level', 'Needs Development', 'At or exceeds level', 'Needs Development', 'Needs Development'] },
                            { name: 'Harmandeep Harmandeep', scores: ['Needs Development', 'At or exceeds level', 'Needs Development', 'At or exceeds level', 'Needs Development'] },
                            { name: 'Harmandeep Singh', scores: ['Needs Development', 'At or exceeds level', 'Needs Development', 'Needs Development', 'Needs Development'] },
                            { name: 'Harpalav Kaur', scores: ['Needs Development', 'At or exceeds level', 'At or exceeds level', 'Needs Development', 'Needs Development'] },
                            { name: 'Inderpreet Singh', scores: ['Needs Development', 'At or exceeds level', 'At or exceeds level', 'Needs Development', 'At or exceeds level'] },
                            { name: 'Kaur, Mehakpreet', scores: ['At or exceeds level', 'Needs Development', 'Needs Development', 'Needs Development', 'At or exceeds level'] },
                            { name: 'Momand, Nadia', scores: ['Needs Development', 'Needs Development', 'Needs Development', 'Needs Development', 'Needs Development'] },
                            { name: 'Pivato, Julian', scores: ['Needs Development', 'At or exceeds level', 'Needs Development', 'Needs Development', 'At or exceeds level'] },
                            { name: 'Sharma, Aashna', scores: ['At or exceeds level', 'Needs Development', 'At or exceeds level', 'Needs Development', 'Needs Development'] }
                          ].map((row, idx) => (
                            <tr key={idx} className="hover:bg-slate-50/50 transition-colors group/row">
                              <td className="p-5 font-black text-slate-900 text-sm italic">{row.name}</td>
                              {row.scores.map((score, scoreIdx) => (
                                <td key={scoreIdx} className="p-4">
                                  <div className={`p-3 text-center text-[10px] font-black uppercase tracking-tighter transition-all duration-300 rounded-xl shadow-sm ${score === 'At or exceeds level' ? 'bg-gradient-to-br from-[#06A119] to-[#1B8784] text-white' : score === 'Needs Development' ? 'bg-[#106BB0] text-white' : 'bg-slate-100 text-slate-400'}`}>
                                    {score}
                                  </div>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </CardContent>
                  </Card>

                  {/* Row 5: Analysis Grids */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="border-2 border-slate-200/60 bg-white hover:border-[#1B8784]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                      <CardContent className="p-10 text-center">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-8 block">Top Category Vector</span>
                        <div className="flex flex-col items-center gap-6">
                          <div className="w-32 h-32 bg-slate-50 rounded-[40px] flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                            <Award className="w-16 h-16 text-[#06A119]" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">DEVELOPS<br/><span className="bg-gradient-to-r from-[#06A119] to-[#1B8784] bg-clip-text text-transparent italic">RELATIONSHIPS</span></h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">HIGHEST SCORING TEAM CATEGORY</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-slate-200/60 bg-white hover:border-[#106BB0]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                      <CardContent className="p-10 text-center">
                        <span className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em] mb-8 block">Critical Improvement Vector</span>
                        <div className="flex flex-col items-center gap-6">
                          <div className="w-32 h-32 bg-slate-50 rounded-[40px] flex items-center justify-center border border-slate-100 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                            <AlertCircle className="w-16 h-16 text-[#106BB0]" />
                          </div>
                          <div className="space-y-2">
                            <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none">EMBRACES<br/><span className="bg-gradient-to-r from-[#106BB0] to-[#1B8784] bg-clip-text text-transparent italic">AGILITY</span></h3>
                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">LOWEST SCORING TEAM CATEGORY</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Row 6: Talent Insights */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <Card className="border-2 border-slate-200/60 bg-white hover:border-[#106BB0]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
                        <CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest flex items-center gap-3">
                          <div className="p-2 bg-[#106BB0]/10 rounded-xl text-[#106BB0]">
                            <Eye className="w-5 h-5" />
                          </div>
                          Undiscovered Talent
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-10">
                        <p className="text-slate-500 font-medium leading-relaxed border-l-2 border-slate-100 pl-6 mb-8">
                          High performance candidates identified via assessment benchmarks.
                        </p>
                        <div className="grid grid-cols-1 gap-4">
                          {['INDERPREET SINGH', 'NADIA MOMAND', 'JULIAN PIVATO'].map((name, idx) => (
                            <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-black text-xs uppercase tracking-widest text-slate-900 flex items-center justify-between hover:bg-white hover:shadow-md transition-all">
                              {name}
                              <div className="w-2 h-2 rounded-full bg-[#106BB0]"></div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border-2 border-slate-200/60 bg-white hover:border-[#06A119]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
                        <CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest flex items-center gap-3">
                          <div className="p-2 bg-[#06A119]/10 rounded-xl text-[#06A119]">
                            <Award className="w-5 h-5" />
                          </div>
                          Promotion Readiness
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-10">
                        <p className="text-slate-500 font-medium leading-relaxed border-l-2 border-slate-100 pl-6 mb-8">
                          Staff meeting all criteria for advancement.
                        </p>
                        <div className="grid grid-cols-1 gap-4">
                          {['AASHNA SHARMA', 'GAGANDEEP KAUR', 'HARPALAV KAUR'].map((name, idx) => (
                            <div key={idx} className="bg-slate-50 p-5 rounded-2xl border border-slate-100 font-black text-xs uppercase tracking-widest text-slate-900 flex items-center justify-between hover:bg-white hover:shadow-md transition-all">
                              {name}
                              <div className="w-2 h-2 rounded-full bg-[#06A119]"></div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="succession" className="space-y-10 mt-10">
                  {/* Header Section */}
                  <div className="bg-gradient-to-br from-white to-slate-50 p-12 rounded-[40px] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#06A119]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#106BB0]/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
                    
                    <div className="relative z-10 flex flex-col items-start">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-12 h-1 bg-gradient-to-r from-[#06A119] to-[#106BB0] rounded-full"></div>
                        <span className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Pipeline Strategy</span>
                      </div>
                      <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none mb-6 uppercase">
                        SUCCESSION<br/>
                        <span className="bg-gradient-to-r from-[#06A119] to-[#1B8784] bg-clip-text text-transparent">PLANNING</span>
                      </h2>
                      <p className="text-slate-500 font-medium max-w-2xl text-lg leading-relaxed border-l-2 border-slate-200 pl-6">
                        Monitoring leadership readiness and successor density. Ensuring long-term organizational stability through proactive talent management.
                      </p>
                    </div>
                  </div>

                  {/* Main Metrics Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Pipeline Health */}
                    <Card className="border-2 border-slate-200/60 bg-white hover:border-[#1B8784]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
                        <CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest flex items-center gap-3">
                          <div className="p-2 bg-[#1B8784]/10 rounded-xl text-[#1B8784]">
                            <TrendingUp className="w-6 h-6" />
                          </div>
                          Pipeline Health
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8 space-y-10">
                        {/* Three metric boxes */}
                        <div className="grid grid-cols-3 gap-6">
                          {[
                            { label: 'No Plans', val: 12 },
                            { label: 'Vacant Key', val: 12 },
                            { label: 'Vacant Crit', val: 12 }
                          ].map((item, i) => (
                            <div key={i} className="bg-slate-50 border border-slate-100 rounded-3xl p-6 text-center hover:bg-white hover:shadow-md transition-all group/box">
                              <div className="text-[10px] font-black mb-3 text-slate-400 uppercase tracking-widest leading-tight">{item.label}</div>
                              <div className="text-5xl font-black text-slate-900 tracking-tighter italic">{item.val}</div>
                            </div>
                          ))}
                        </div>

                        {/* Internal vs External and Diverse Rate */}
                        <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Internal Successor Rate</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-7xl font-black bg-gradient-to-br from-[#106BB0] to-[#1B8784] bg-clip-text text-transparent tracking-tighter">63</span>
                                <span className="text-2xl font-black text-slate-200">%</span>
                              </div>
                            </div>
                            <div className="flex gap-3">
                              <div className="bg-[#106BB0] text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight">INT (61)</div>
                              <div className="bg-slate-200 text-slate-500 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight">EXT (64)</div>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target</div>
                              <div className="text-xl font-black text-slate-900">≥ 70%</div>
                            </div>
                          </div>

                          <div className="space-y-6">
                            <div className="flex flex-col gap-1 text-right">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Diverse Successor Rate</span>
                              <div className="flex items-baseline gap-1 justify-end">
                                <span className="text-7xl font-black bg-gradient-to-br from-[#06A119] to-[#1B8784] bg-clip-text text-transparent tracking-tighter">33</span>
                                <span className="text-2xl font-black text-slate-200">%</span>
                              </div>
                            </div>
                            <div className="flex gap-3 justify-end">
                              <div className="bg-[#06A119] text-white px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight">DIV</div>
                              <div className="bg-slate-200 text-slate-500 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-tight">NON</div>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center">
                              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target</div>
                              <div className="text-xl font-black text-slate-900">40-60%</div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Succession Risk Metrics */}
                    <Card className="border-2 border-slate-200/60 bg-white hover:border-[#1B8784]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
                        <CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest flex items-center gap-3">
                          <div className="p-2 bg-[#1B8784]/10 rounded-xl text-[#1B8784]">
                            <AlertCircle className="w-6 h-6" />
                          </div>
                          Succession Risk Analysis
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="space-y-6">
                          {[
                            { label: 'Key Positions Risk', sublabel: 'Key & Critical Positions no Successors', value: '31%', benchmark: 'Index', benchValue: '< 20%', isGood: false },
                            { label: 'Successor Readiness Risk', sublabel: '% of roles with no Ready Now Successors', value: '22%', benchmark: 'Risk', benchValue: '< 30%', isGood: true },
                            { label: 'Successor Attrition Rate', sublabel: '% of successors that have left the company', value: '12%', benchmark: 'Rate', benchValue: '< 10%', isGood: false },
                            { label: 'Time to Fill Critical Positions', sublabel: 'Average hiring speed for critical organizational roles', value: '130', unit: 'Days', benchmark: 'Speed', benchValue: '< 90 Days', isGood: false },
                            { label: 'Single Role Incumbents', sublabel: 'Roles with only one successor and no back-ups', value: '20%', count: '(15)', benchmark: 'Incumbents', benchValue: '< 25%', isGood: true }
                          ].map((item, idx) => (
                            <div key={idx} className="bg-slate-50/30 border border-slate-100 rounded-3xl p-8 flex items-center justify-between group/risk hover:bg-white hover:shadow-md transition-all">
                              <div className="flex-1">
                                <div className="font-black text-xl text-slate-900 uppercase tracking-tighter mb-2 group-hover/risk:text-[#1B8784] transition-colors">{item.label}</div>
                                <p className="text-sm text-slate-400 font-medium leading-relaxed max-w-md">{item.sublabel}</p>
                              </div>
                              <div className="flex items-center gap-10">
                                <div className="flex items-baseline gap-1">
                                  <span className="text-7xl font-black bg-gradient-to-r from-[#1B8784] to-[#106BB0] bg-clip-text text-transparent italic tracking-tighter">{item.value}</span>
                                  {item.unit && <span className="text-xl font-black text-slate-300 uppercase italic">{item.unit}</span>}
                                </div>
                                <div className={`w-32 p-4 rounded-2xl border-2 text-center transition-all ${item.isGood ? 'border-[#06A119] bg-[#06A119]/5' : 'border-slate-200 bg-slate-50'}`}>
                                  <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.benchmark}</div>
                                  <div className="text-lg font-black text-slate-900">{item.benchValue}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Advanced Succession Metrics */}
                    <Card className="border-2 border-slate-200/60 bg-white hover:border-[#106BB0]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
                        <CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest flex items-center gap-3">
                          <div className="p-2 bg-[#106BB0]/10 rounded-xl text-[#106BB0]">
                            <TrendingUp className="w-6 h-6" />
                          </div>
                          Advanced Pipeline Analytics
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {[
                            { title: 'Stale Successor', desc: 'Ready in 1-2 years or 2+ years for more than 24 months', value: '18%', benchmark: '< 20%' },
                            { title: 'Blocked Mobility', desc: 'Successor is ready but current incumbent is stable (Low risk)', value: '35%', benchmark: '< 30%' },
                            { title: 'Cross-Functional', desc: 'Successor nominated for roles in multiple distinct functions', value: '25%', benchmark: '> 30%' },
                            { title: 'Stretch Index', desc: 'Average gap between target role level and current level', value: '1.8', unit: 'Lvls', benchmark: '≥ 2.0' },
                            { title: 'Successor Overload', desc: 'Individual nominated as successor for 3 or more distinct roles', value: '12%', benchmark: '< 10%' },
                            { title: 'Ghost Roles', desc: 'Critical roles with no identified successors for 12+ months', value: '7%', benchmark: '≥ 2.0' }
                          ].map((item, idx) => (
                            <div key={idx} className="bg-slate-50 border border-slate-100 p-8 rounded-[32px] flex flex-col items-center text-center hover:bg-white hover:shadow-lg transition-all group/adv">
                              <h4 className="text-lg font-black text-slate-900 uppercase tracking-tighter mb-4 group-hover/adv:text-[#106BB0] transition-colors">{item.title}</h4>
                              <p className="text-[11px] text-slate-400 font-medium leading-relaxed mb-8 h-12">{item.desc}</p>
                              <div className="flex items-baseline gap-1 mb-8">
                                <span className="text-6xl font-black bg-gradient-to-br from-[#106BB0] to-[#1B8784] bg-clip-text text-transparent italic tracking-tighter">{item.value}</span>
                                {item.unit && <span className="text-lg font-black text-slate-300 uppercase">{item.unit}</span>}
                              </div>
                              <div className="bg-white border border-slate-100 rounded-2xl px-6 py-2 shadow-sm">
                                <span className="text-[10px] font-black text-slate-300 uppercase mr-2 tracking-widest">Bench:</span>
                                <span className="text-xs font-black text-slate-900">{item.benchmark}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}

          {activeNav === "settings" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Team Settings</h2>
                <p className="text-gray-600 mt-1">Manage your team preferences and configurations</p>
              </div>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Team Information</CardTitle>
                  <CardDescription>Update team details and preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700">Team Name</label>
                      <Input value={teamInfo.name} className="mt-1" disabled />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Department</label>
                      <Input value={teamInfo.department} className="mt-1" disabled />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Team Lead</label>
                      <Input value={teamInfo.teamLead} className="mt-1" disabled />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700">Team Size</label>
                      <Input value={`${dashboardData?.teamSize || teamInfo.memberCount} members`} className="mt-1" disabled />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2">
                <CardHeader>
                  <CardTitle>Notification Preferences</CardTitle>
                  <CardDescription>Manage how you receive team updates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Bell className="w-12 h-12 mx-auto mb-3 opacity-20" />
                    <p>Notification settings will be configured here</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
    </>
  );
}