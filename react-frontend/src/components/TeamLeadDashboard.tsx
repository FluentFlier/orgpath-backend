import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { OrgPathLogo } from "./OrgPathLogo";
import { MemberDetailView } from "./MemberDetailView";
import { EvaluationWizard } from "./EvaluationWizard";
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
import { toast } from "sonner";

interface TeamLeadDashboardProps {
  onLogout?: () => void;
  teamLeadName?: string;
}

export function TeamLeadDashboard({ onLogout, teamLeadName = "Team Leader" }: TeamLeadDashboardProps) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [memberSearch, setMemberSearch] = useState("");
  const [selectedMemberDetail, setSelectedMemberDetail] = useState<number | null>(null);
  const [evaluatingMember, setEvaluatingMember] = useState<any | null>(null);

  // --- Real Data States ---
  const [user, setUser] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]); 
  const [loadingMembers, setLoadingMembers] = useState(true);

  const fetchMembers = async () => {
    setLoadingMembers(true);
    const token = sessionStorage.getItem("orgpath_token");
    try {
      const res = await fetch("http://localhost:8080/api/users", {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setMembers(Array.isArray(data) ? data.filter((u: any) => u.role === 'employee') : []);
      }
    } catch (err) {
      console.error("Failed to load members:", err);
    } finally {
      setLoadingMembers(false);
    }
  };

  useEffect(() => {
    const userStr = sessionStorage.getItem("orgpath_user");
    if (userStr) { setUser(JSON.parse(userStr)); }

    const token = sessionStorage.getItem("orgpath_token");
    const fetchDashboard = async () => {
      try {
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
    fetchMembers();
  }, []);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "team-members", label: "Team Members", icon: Users },
    { id: "performance", label: "Performance", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  const teamInfo = {
    name: user?.department || "Marketing & Growth",
    department: user?.department || "Marketing",
    teamLead: user ? `${user.first_name} ${user.last_name || ''}` : teamLeadName,
    leadRole: user?.title || "Team Director",
    healthScore: dashboardData?.healthScore || 92,
    color: "#06A119",
  };

  const teamMetrics = {
    avgOverallScore: 85,
    avgLeadershipScore: 82,
    avgCommunicationScore: 87,
    avgAdaptabilityScore: 85,
    avgCollaborationScore: 84,
    completionRate: 100,
    topPerformers: ["Arthur Gabster"],
    benchmarkLeadershipScore: 90,
    benchmarkCommunicationScore: 92,
    benchmarkAdaptabilityScore: 88,
    benchmarkCollaborationScore: 90,
  };

  const currentProjects = [
    { name: "Brand Refresh Campaign", status: "In Progress", completion: 78, assignedTo: ["Sophie Martin", "Jessica Hill", "Hannah Davis"], deadline: "2025-11-15" },
    { name: "Social Media Strategy", status: "Active", completion: 55, assignedTo: ["Sophie Martin", "Alex Turner", "Tyler Moore"], deadline: "2025-12-01" },
    { name: "Content Marketing Initiative", status: "Planning", completion: 30, assignedTo: ["Alex Turner", "Tyler Moore", "Emma Lopez"], deadline: "2025-12-20" },
  ];

  const colors = ["#106BB0", "#06A119", "#1B8784", "#1C986B", "#1C897E"];

  const filteredMembers = members.filter((member) => {
    if (!member) return false;
    const fullName = `${member.first_name || ''} ${member.last_name || ''}`.toLowerCase();
    const search = memberSearch.toLowerCase();
    return (
      fullName.includes(search) ||
      (member.title || '').toLowerCase().includes(search) ||
      (member.email || '').toLowerCase().includes(search)
    );
  });

  return (
    <>
      {/* MODALS - Rendered as siblings */}
      {selectedMemberDetail && (
        <MemberDetailView
          memberId={selectedMemberDetail}
          onClose={() => setSelectedMemberDetail(null)}
        />
      )}

      {evaluatingMember && (
        <EvaluationWizard 
          employee={evaluatingMember} 
          onClose={() => setEvaluatingMember(null)}
          onComplete={() => {
            setEvaluatingMember(null);
            fetchMembers(); // Refresh directory to see new ratings
          }}
        />
      )}
      
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className={`bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ${sidebarCollapsed ? "w-20" : "w-64"}`}>
          <div className={`border-b border-gray-200 ${sidebarCollapsed ? "p-4" : "p-6"}`}>
            {!sidebarCollapsed && <OrgPathLogo />}
            {sidebarCollapsed && (
              <div className="flex justify-center">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white" style={{ background: "linear-gradient(135deg, #106BB0 0%, #06A119 100%)" }}>
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
                    className={`w-full flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3"} px-4 py-3 rounded-lg transition-all ${isActive ? "bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200" : "hover:bg-gray-50"}`}
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

          <div className={`p-4 ${!sidebarCollapsed && "border-t border-gray-200"}`}>
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100 text-gray-700 transition-all">
              {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <><ChevronLeft className="w-5 h-5" /><span className="font-medium">Collapse</span></>}
            </button>
          </div>

          <div className="p-4 border-t border-gray-200">
            <button onClick={onLogout} className={`w-full flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3"} px-4 py-3 rounded-lg hover:bg-red-50 text-red-600 transition-all`}>
              <LogOut className="w-5 h-5" />
              {!sidebarCollapsed && <span className="font-medium">Logout</span>}
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
                <Input placeholder="Search..." className="pl-10 bg-gray-50 border-gray-200 text-slate-900" />
              </div>
              <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon" className="relative" onClick={() => toast.info("No new notifications.")}>
                  <Bell className="w-5 h-5 text-gray-600" />
                </Button>
                <div className="flex items-center gap-3 pl-4 border-l border-gray-200 cursor-pointer hover:bg-gray-50 p-2 rounded-lg transition-colors">
                  <Avatar>
                    <AvatarFallback className="text-white" style={{ backgroundColor: teamInfo.color }}>
                      {user?.first_name?.charAt(0)?.toUpperCase() || "T"}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium text-gray-900">{teamInfo.teamLead}</span>
                    <span className="text-xs text-gray-500">{teamInfo.leadRole}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>
          </header>

          {/* Gradient Banner */}
          <div className="relative h-20 flex items-center px-8" style={{ background: "linear-gradient(90deg, #06A119 0%, #1C986B 50%, #1B8784 100%)" }}>
            <div className="relative z-10">
              <h1 className="text-white text-2xl font-bold">{teamInfo.name.toUpperCase()} TEAM</h1>
              <p className="text-white/90 text-sm mt-1">{teamInfo.department} Department</p>
            </div>
          </div>

          <main className="flex-1 overflow-y-auto p-8">
            {/* Dashboard Tab */}
            {activeNav === "dashboard" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <Card className="border-2"><CardHeader className="pb-3"><CardDescription>Team Size</CardDescription><CardTitle className="text-3xl" style={{ color: teamInfo.color }}>{dashboardData?.teamSize || members.length || 0}</CardTitle></CardHeader><CardContent><div className="flex items-center gap-2 text-sm text-gray-600"><Users className="w-4 h-4" /><span>Active Members</span></div></CardContent></Card>
                  <Card className="border-2"><CardHeader className="pb-3"><CardDescription>Team Health Score</CardDescription><CardTitle className="text-3xl" style={{ color: teamInfo.color }}>{dashboardData?.healthScore || teamInfo.healthScore}%</CardTitle></CardHeader><CardContent><div className="flex items-center gap-2 text-sm text-green-600"><TrendingUp className="w-4 h-4" /><span>Excellent Performance</span></div></CardContent></Card>
                  <Card className="border-2"><CardHeader className="pb-3"><CardDescription>Avg Overall Score</CardDescription><CardTitle className="text-3xl" style={{ color: teamInfo.color }}>{dashboardData?.avgOverallScore || teamMetrics.avgOverallScore}%</CardTitle></CardHeader><CardContent><div className="flex items-center gap-2 text-sm text-gray-600"><Award className="w-4 h-4" /><span>Team Average</span></div></CardContent></Card>
                  <Card className="border-2"><CardHeader className="pb-3"><CardDescription>Assessment Completion</CardDescription><CardTitle className="text-3xl" style={{ color: teamInfo.color }}>{dashboardData?.completionRate || teamMetrics.completionRate}%</CardTitle></CardHeader><CardContent><div className="flex items-center gap-2 text-sm text-green-600"><CheckCircle2 className="w-4 h-4" /><span>All Complete</span></div></CardContent></Card>
                </div>

                <Card className="border-2">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div><CardTitle>Team Performance Breakdown</CardTitle><CardDescription>Average scores across key competencies</CardDescription></div>
                      <div className="flex items-center gap-2 text-sm"><div className="w-6 h-0.5 bg-purple-600 rounded-full"></div><span className="text-purple-600 font-medium">= Benchmark</span></div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {["Leadership", "Communication", "Adaptability", "Collaboration"].map((cat, idx) => {
                        const score = dashboardData?.performanceBreakdown?.[cat.toLowerCase()] || teamMetrics[`avg${cat}Score` as keyof typeof teamMetrics] || 85;
                        const bench = teamMetrics[`benchmark${cat}Score` as keyof typeof teamMetrics] || 90;
                        return (
                          <div key={idx}>
                            <div className="flex items-center justify-between mb-2">
                              <span className="font-medium text-gray-900">{cat}</span>
                              <span className="font-semibold" style={{ color: teamInfo.color }}>{score}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 relative overflow-hidden">
                              <div className="absolute left-0 h-3 rounded-l-full transition-all" style={{ width: `${score}%`, backgroundColor: teamInfo.color }} />
                              <div className="absolute h-3 rounded-r-full transition-all" style={{ left: `${score}%`, width: `${bench - score}%`, backgroundColor: "#9333ea" }} />
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className="border-2">
                    <CardHeader><CardTitle>Top Performers</CardTitle><CardDescription>Team members with highest assessment scores</CardDescription></CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {(dashboardData?.topPerformers || [{name: "Arthur Gabster", role: "Manager", initials: "AG"}]).map((perf: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-3 p-3 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg border border-green-100">
                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold" style={{ backgroundColor: teamInfo.color }}>{idx + 1}</div>
                            <Avatar className="w-10 h-10"><AvatarFallback className="text-white" style={{ backgroundColor: teamInfo.color }}>{perf.initials || perf.name.split(" ").map((n:string) => n[0]).join("")}</AvatarFallback></Avatar>
                            <div><p className="font-semibold text-gray-900">{perf.name}</p><p className="text-sm text-gray-600">{perf.role || "Team Member"}</p></div>
                            <div className="ml-auto"><Award className="w-5 h-5" style={{ color: teamInfo.color }} /></div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  <Card className="border-2">
                    <CardHeader><CardTitle>Current Projects</CardTitle><CardDescription>{(dashboardData?.projects || currentProjects).length} active projects</CardDescription></CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {(dashboardData?.projects || currentProjects).map((project: any, idx: number) => (
                          <div key={idx} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-gray-900">{project.name}</span>
                              <span className="px-2 py-1 rounded text-xs font-medium" style={{ backgroundColor: project.status === "In Progress" ? "#106BB020" : project.status === "Active" ? "#06A11920" : "#f59e0b20", color: project.status === "In Progress" ? "#106BB0" : project.status === "Active" ? "#06A119" : "#f59e0b" }}>{project.status}</span>
                            </div>
                            <div className="flex items-center justify-between text-sm text-gray-600">
                              <span>{project.deadline ? `Due: ${project.deadline}` : 'Active'}</span>
                              <span className="font-medium">{project.completion || project.progress}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2"><div className="h-2 rounded-full transition-all" style={{ width: `${project.completion || project.progress}%`, backgroundColor: teamInfo.color }} /></div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Team Members Tab */}
            {activeNav === "team-members" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div><h2 className="text-2xl font-bold text-gray-900">Team Members</h2><p className="text-gray-600 mt-1">Manage your team of {members.length} members</p></div>
                  <div className="relative w-80">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input placeholder="Search members..." value={memberSearch} onChange={(e) => setMemberSearch(e.target.value)} className="pl-10 bg-white border-gray-200 text-slate-900" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {loadingMembers ? (
                    <div className="col-span-full text-center py-12 text-gray-500">Loading team members...</div>
                  ) : filteredMembers.length === 0 ? (
                    <div className="col-span-full text-center py-12 text-gray-500">No team members found.</div>
                  ) : (
                    filteredMembers.map((member, idx) => {
                      const memberColor = colors[idx % colors.length];
                      
                      // Handle parsing numeric ratings to text logic
                      let perfScore = 85;
                      let displayRating = "Meets Expectations";

                      if (member.performance_rating) {
                        const rawRating = member.performance_rating.toString().toLowerCase();
                        if (rawRating === '5') {
                          perfScore = 95;
                          displayRating = "Exceeds Expectations";
                        } else if (rawRating === '4') {
                          perfScore = 90;
                          displayRating = "Strong Performer";
                        } else if (rawRating === '3') {
                          perfScore = 85;
                          displayRating = "Meets Expectations";
                        } else if (rawRating === '2') {
                          perfScore = 70;
                          displayRating = "Developing";
                        } else if (rawRating === '1') {
                          perfScore = 50;
                          displayRating = "Needs Improvement";
                        } else if (rawRating.includes("exceed")) {
                          perfScore = 95;
                          displayRating = "Exceeds Expectations";
                        } else if (rawRating.includes("meet")) {
                          perfScore = 85;
                          displayRating = "Meets Expectations";
                        } else if (rawRating.includes("develop") || rawRating.includes("need")) {
                          perfScore = 70;
                          displayRating = "Needs Development";
                        }
                      }

                      return (
                        <Card key={member.id} className="border-2 hover:shadow-lg transition-shadow flex flex-col h-full">
                          <CardHeader className="pb-3">
                            <div className="flex items-start gap-4">
                              <Avatar className="w-14 h-14">
                                <AvatarFallback className="text-white text-lg" style={{ backgroundColor: memberColor }}>
                                  {(member.first_name || 'E').charAt(0)}{(member.last_name || '').charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <CardTitle className="text-lg text-slate-900">{member.first_name} {member.last_name}</CardTitle>
                                <CardDescription className="mt-1 line-clamp-2">{member.title || "Employee"}</CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="space-y-4 flex-1 flex flex-col">
                            <div className="text-sm text-gray-600 flex items-center gap-2">
                              <Mail className="w-4 h-4" /> <span className="truncate">{member.email}</span>
                            </div>

                            <div className="pt-3 border-t border-gray-200 mt-auto">
                              <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-medium text-gray-700">Performance</span>
                                <span className="text-sm font-semibold text-right max-w-[150px] leading-tight" style={{ color: memberColor }}>{displayRating}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div className="h-2 rounded-full transition-all" style={{ width: `${perfScore}%`, backgroundColor: memberColor }} />
                              </div>
                            </div>

                            <div className="grid grid-cols-1 gap-2 pt-2">
                              <Button variant="outline" className="w-full border-slate-200 text-slate-700" onClick={() => setSelectedMemberDetail(member.id)}>
                                <Eye className="w-4 h-4 mr-2" /> View History
                              </Button>
                              <Button className="w-full bg-[#106BB0] text-white hover:bg-blue-700 shadow-md transition-all hover:scale-[1.02]" onClick={() => setEvaluatingMember(member)}>
                                <Award className="w-4 h-4 mr-2" /> Evaluate Member
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      );
                    })
                  )}
                </div>
              </div>
            )}

            {/* Performance Analytics Tabs */}
            {activeNav === "performance" && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Team Performance Analytics</h2>
                  <p className="text-gray-600 mt-1">Comprehensive performance metrics and insights</p>
                </div>

                <Tabs defaultValue="organizational" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-white border border-slate-200/60 rounded-2xl p-1.5 shadow-sm h-auto mb-10">
                    <TabsTrigger value="organizational" className="data-[state=active]:bg-[#106BB0]/5 data-[state=active]:text-[#106BB0] data-[state=active]:shadow-sm rounded-xl py-3 px-6 transition-all duration-300 ease-in-out hover:bg-slate-50 font-semibold text-slate-500 border border-transparent data-[state=active]:border-[#106BB0]/10">Organizational Effectiveness</TabsTrigger>
                    <TabsTrigger value="team" className="data-[state=active]:bg-[#1B8784]/5 data-[state=active]:text-[#1B8784] data-[state=active]:shadow-sm rounded-xl py-3 px-6 transition-all duration-300 ease-in-out hover:bg-slate-50 font-semibold text-slate-500 border border-transparent data-[state=active]:border-[#1B8784]/10">Team Effectiveness & HR</TabsTrigger>
                    <TabsTrigger value="succession" className="data-[state=active]:bg-[#06A119]/5 data-[state=active]:text-[#06A119] data-[state=active]:shadow-sm rounded-xl py-3 px-6 transition-all duration-300 ease-in-out hover:bg-slate-50 font-semibold text-slate-500 border border-transparent data-[state=active]:border-[#06A119]/10">Succession Metrics</TabsTrigger>
                  </TabsList>

                  {/* ORGANIZATIONAL TAB */}
                  <TabsContent value="organizational" className="space-y-10 mt-10">
                    <div className="bg-gradient-to-br from-white to-slate-50 p-12 rounded-[40px] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-64 h-64 bg-[#106BB0]/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
                      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#06A119]/5 rounded-full blur-3xl -ml-32 -mb-32"></div>
                      <div className="relative z-10 flex flex-col items-start">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-1 bg-gradient-to-r from-[#106BB0] to-[#06A119] rounded-full"></div>
                          <span className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Insights & Metrics</span>
                        </div>
                        <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none mb-6">
                          ORGANIZATIONAL<br/><span className="bg-gradient-to-r from-[#106BB0] to-[#06A119] bg-clip-text text-transparent">EFFECTIVENESS</span>
                        </h2>
                        <p className="text-slate-500 font-medium max-w-2xl text-lg leading-relaxed border-l-2 border-slate-200 pl-6">
                          Comprehensive performance analysis and organizational health monitoring. Tracking metrics across Q1 2026 to ensure sustainable growth and excellence.
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Completion Info */}
                      <Card className="border-2 border-slate-200/60 bg-white hover:border-[#106BB0]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8">
                          <CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest flex items-center gap-3"><div className="p-2 bg-[#106BB0]/10 rounded-xl text-[#106BB0]"><Users className="w-5 h-5" /></div> Completion Information</CardTitle>
                        </CardHeader>
                        <CardContent className="p-8">
                          <div className="space-y-8">
                              <div className="bg-slate-50/30 rounded-3xl p-8 border border-slate-100/50">
                                <div className="flex items-center justify-between mb-8">
                                  <div className="space-y-1"><span className="text-slate-400 font-black text-[10px] uppercase tracking-[0.2em]">Live Engagement</span><h3 className="text-2xl font-black text-slate-900">Total Completion</h3></div>
                                  <div className="flex items-baseline gap-1"><span className="text-8xl font-black bg-gradient-to-br from-[#106BB0] to-[#1B8784] bg-clip-text text-transparent">82</span><span className="text-2xl font-black text-slate-300">%</span></div>
                                </div>
                                <div className="grid grid-cols-2 gap-6">
                                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group/gender">
                                    <div className="flex items-center gap-3 mb-4"><div className="w-2 h-2 rounded-full bg-[#106BB0]"></div><span className="text-xs font-black text-slate-500 uppercase tracking-widest">Male Participation</span></div>
                                    <div className="flex items-end justify-between mb-3"><span className="text-4xl font-black text-slate-900 tracking-tight">47%</span><span className="text-[10px] font-black text-slate-300 uppercase">Target 50%</span></div>
                                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#106BB0] h-full rounded-full transition-all duration-1000" style={{ width: '47%' }}></div></div>
                                  </div>
                                  <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group/gender">
                                    <div className="flex items-center gap-3 mb-4"><div className="w-2 h-2 rounded-full bg-[#06A119]"></div><span className="text-xs font-black text-slate-500 uppercase tracking-widest">Female Participation</span></div>
                                    <div className="flex items-end justify-between mb-3"><span className="text-4xl font-black text-slate-900 tracking-tight">53%</span><span className="text-[10px] font-black text-slate-300 uppercase">Target 50%</span></div>
                                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden"><div className="bg-[#06A119] h-full rounded-full transition-all duration-1000" style={{ width: '53%' }}></div></div>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-8"><div className="w-1 h-6 bg-[#106BB0] rounded-full"></div><h3 className="text-sm font-black text-slate-900 uppercase tracking-[0.1em]">Role Distribution & Readiness</h3></div>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                                  {[{ role: 'New Graduate', count: 12, color: '#106BB0' }, { role: 'Junior Consultant', count: 7, color: '#1B8784' }, { role: 'Consultant', count: 14, color: '#06A119' }, { role: 'Senior Consultant', count: 22, color: '#106BB0' }, { role: 'Manager', count: 19, color: '#1B8784' }, { role: 'Executive', count: 23, color: '#06A119' }].map((item, idx) => (
                                    <div key={idx} className="space-y-3 group/item">
                                      <div className="flex items-center justify-between"><span className="text-[11px] font-black text-slate-500 uppercase tracking-tight group-hover/item:text-slate-900 transition-colors">{item.role}</span><span className="text-sm font-black text-slate-900">{item.count}</span></div>
                                      <div className="w-full bg-slate-50 rounded-full h-2 overflow-hidden border border-slate-100"><div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ width: `${(item.count / 23) * 100}%`, backgroundColor: item.color }}></div></div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                          </div>
                        </CardContent>
                      </Card>

                      <div className="space-y-6">
                        <Card className="border-2 border-slate-200/60 bg-white hover:border-[#1B8784]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                          <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8"><CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest flex items-center gap-3"><div className="p-2 bg-[#1B8784]/10 rounded-xl text-[#1B8784]"><Activity className="w-5 h-5" /></div>Organizational Health</CardTitle></CardHeader>
                          <CardContent className="p-8">
                            <div className="space-y-10">
                              {[{ label: 'Organizational Health', score: 81, stars: 4 }, { label: 'Collaboration & Communication', score: 92, stars: 5 }, { label: 'Adaptability', score: 67, stars: 3 }].map((item, idx) => (
                                <div key={idx} className="flex items-center justify-between group/health">
                                  <div className="flex-1"><div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 group-hover/health:text-slate-900 transition-colors">{item.label}</div><div className="flex items-center gap-1.5">{[...Array(5)].map((_, i) => (<span key={i} className={`text-2xl transition-all duration-300 ${i < Math.floor(item.stars) ? 'text-[#06A119]' : 'text-slate-200'}`}>★</span>))}</div></div>
                                  <div className="text-6xl font-black bg-gradient-to-r from-[#106BB0] to-[#06A119] bg-clip-text text-transparent group-hover/health:scale-110 transition-transform tracking-tighter">{item.score}%</div>
                                </div>
                              ))}
                            </div>
                          </CardContent>
                        </Card>
                        
                        <Card className="border-2 border-slate-200/60 bg-white hover:border-[#06A119]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                          <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8"><CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest flex items-center gap-3"><div className="p-2 bg-[#06A119]/10 rounded-xl text-[#06A119]"><TrendingUp className="w-5 h-5" /></div>Talent Density</CardTitle></CardHeader>
                          <CardContent className="p-8">
                            <div className="flex flex-col items-center">
                              <div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em] mb-2">Active Workforce</div>
                              <div className="text-8xl font-black text-slate-900 mb-10 tracking-tighter flex items-baseline">82<span className="text-lg font-black text-slate-300 ml-2 uppercase tracking-widest">Team</span></div>
                              <div className="grid grid-cols-2 gap-6 w-full">
                                <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 text-center hover:bg-white hover:shadow-md transition-all group/item"><div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">High Performing</div><div className="text-4xl font-black text-[#06A119] mb-1">28%</div><div className="text-[10px] font-bold text-slate-300 uppercase">23 Staff</div></div>
                                <div className="bg-slate-50/50 p-6 rounded-3xl border border-slate-100 text-center hover:bg-white hover:shadow-md transition-all group/item"><div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">High Potential</div><div className="text-4xl font-black text-[#106BB0] mb-1">12%</div><div className="text-[10px] font-bold text-slate-300 uppercase">10 Staff</div></div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="border-2 border-slate-200/60 bg-white hover:border-[#106BB0]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden">
                        <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8"><CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest flex items-center gap-3"><div className="p-2 bg-[#106BB0]/10 rounded-xl text-[#106BB0]"><Target className="w-5 h-5" /></div>Capability Assessment</CardTitle></CardHeader>
                        <CardContent className="p-8">
                          <div className="space-y-2 mb-8"><div className="text-[10px] font-black text-slate-300 uppercase tracking-[0.2em]">Workforce Readiness</div><div className="text-2xl font-black text-slate-900">Currently Capable vs Not Ready</div></div>
                          <div className="w-full bg-slate-50 rounded-full h-16 flex overflow-hidden shadow-[inset_0_2px_4px_rgba(0,0,0,0.05)] border border-slate-100 p-1.5">
                            <div className="bg-gradient-to-br from-[#106BB0] to-[#1B8784] h-full rounded-full flex items-center justify-center text-white font-black text-xl italic tracking-tighter transition-all duration-500 hover:scale-[1.02]" style={{ width: '46%' }}>46%</div>
                            <div className="bg-gradient-to-br from-[#06A119] to-[#1B8784] h-full rounded-full flex items-center justify-center text-white font-black text-xl italic tracking-tighter transition-all duration-500 hover:scale-[1.02] ml-1" style={{ width: '54%' }}>54%</div>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-2 border-slate-200/60 bg-white hover:border-[#106BB0]/30 hover:shadow-xl transition-all duration-500 rounded-[32px] group overflow-hidden p-0">
                        <div className="p-8 bg-slate-50/50 border-b border-slate-100">
                          <h2 className="text-5xl font-black text-slate-900 tracking-tighter flex items-center">RETENTION <span className="text-[#06A119] ml-3 italic">RATE</span></h2>
                        </div>
                        <div className="p-8">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center"><div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target HP</div><div className="text-lg font-black text-slate-900">85-95%</div></div>
                            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-center"><div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Target All</div><div className="text-lg font-black text-slate-900">70-85%</div></div>
                          </div>
                        </div>
                      </Card>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <Card className="border-2 border-gray-200 hover:border-[#1B8784] hover:shadow-2xl transition-all duration-500 rounded-[32px]">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50"><CardTitle className="text-[#106BB0] flex items-center gap-2">Internal Mobility Rate</CardTitle></CardHeader>
                        <CardContent className="pt-6">
                          <div className="space-y-5">
                            {[{ label: 'High Potential', rate: 22 }, { label: 'High Performers', rate: 18 }, { label: 'General Population', rate: 5 }].map((item, idx) => (
                              <div key={idx} className="p-2 rounded-lg">
                                <div className="flex items-center justify-between mb-2"><span className="font-bold text-gray-800">{item.label}</span><span className="text-3xl font-bold bg-gradient-to-r from-[#106BB0] to-[#06A119] bg-clip-text text-transparent">{item.rate}%</span></div>
                                <div className="w-full bg-gray-200 rounded-full h-4"><div className="h-4 rounded-full" style={{ width: `${item.rate * 2.5}%`, background: '#106BB0' }}></div></div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                      <Card className="border-2 border-gray-200 hover:border-[#06A119] hover:shadow-2xl transition-all duration-500 rounded-[32px]">
                        <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50"><CardTitle className="text-[#106BB0] flex items-center gap-2">Pay Equity Gap</CardTitle></CardHeader>
                        <CardContent className="pt-6">
                          <div className="space-y-4">
                            <div className="text-center text-sm font-bold text-gray-700">GAP</div>
                            <div className="w-full bg-gray-200 rounded-full h-12 flex overflow-hidden border-2 border-gray-300 shadow-lg">
                              <div className="bg-gradient-to-r from-[#06A119] to-[#1B8784] h-12 flex items-center justify-center text-white font-bold text-sm" style={{ width: '47%' }}>Female 47%</div>
                              <div className="bg-gradient-to-r from-[#106BB0] to-[#1B8784] h-12 flex items-center justify-center text-white font-bold text-sm" style={{ width: '53%' }}>Male 53%</div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>

                  {/* TEAM TAB */}
                  <TabsContent value="team" className="space-y-10 mt-10">
                    <div className="bg-gradient-to-br from-white to-slate-50 p-12 rounded-[40px] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                      <div className="relative z-10 flex flex-col items-start">
                        <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none mb-6 uppercase">TEAM EFFECTIVENESS</h2>
                        <p className="text-slate-500 font-medium max-w-2xl text-lg leading-relaxed border-l-2 border-slate-200 pl-6">Detailed breakdown of team participation, leadership competencies, and benchmarks.</p>
                      </div>
                    </div>
                    <Card className="border-2 border-slate-200/60 bg-white rounded-[32px]">
                      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8"><CardTitle className="text-slate-800 text-lg font-black uppercase">Completed by Level</CardTitle></CardHeader>
                      <CardContent className="p-8">
                        <div className="space-y-6">
                          {[{ role: 'New Graduate', count: 12, max: 25 }, { role: 'Manager', count: 19, max: 25 }, { role: 'Executive', count: 23, max: 25 }].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-6">
                              <div className="w-32 text-[10px] font-black text-slate-400 uppercase tracking-tight leading-tight">{item.role}</div>
                              <div className="flex-1 h-10 bg-slate-50 rounded-full relative flex items-center border p-1">
                                <div className="h-full rounded-full bg-[#00A651] flex items-center justify-end pr-3" style={{ width: `${(item.count / item.max) * 100}%` }}>
                                  <span className="text-white font-black text-xs italic tracking-tighter">{item.count}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  {/* SUCCESSION TAB */}
                  <TabsContent value="succession" className="space-y-10 mt-10">
                    <div className="bg-gradient-to-br from-white to-slate-50 p-12 rounded-[40px] border border-slate-200/60 shadow-sm relative overflow-hidden group">
                      <div className="relative z-10 flex flex-col items-start">
                        <h2 className="text-5xl font-black text-slate-900 tracking-tight leading-none mb-6 uppercase">SUCCESSION PLANNING</h2>
                        <p className="text-slate-500 font-medium max-w-2xl text-lg leading-relaxed border-l-2 border-slate-200 pl-6">Monitoring leadership readiness and successor density.</p>
                      </div>
                    </div>
                    <Card className="border-2 border-slate-200/60 bg-white rounded-[32px] overflow-hidden">
                      <CardHeader className="bg-slate-50/50 border-b border-slate-100 py-6 px-8"><CardTitle className="text-slate-800 text-lg font-black uppercase tracking-widest">Pipeline Health</CardTitle></CardHeader>
                      <CardContent className="p-8 space-y-10">
                        <div className="grid grid-cols-2 gap-8">
                          <div className="space-y-6">
                            <div className="flex flex-col gap-1">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Internal Successor Rate</span>
                              <div className="flex items-baseline gap-1">
                                <span className="text-7xl font-black bg-gradient-to-br from-[#106BB0] to-[#1B8784] bg-clip-text text-transparent tracking-tighter">63</span><span className="text-2xl font-black text-slate-200">%</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
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
                  <CardHeader><CardTitle>Team Information</CardTitle><CardDescription>Update team details and preferences</CardDescription></CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div><label className="text-sm font-medium text-gray-700">Team Name</label><Input value={teamInfo.name} className="mt-1" disabled /></div>
                      <div><label className="text-sm font-medium text-gray-700">Department</label><Input value={teamInfo.department} className="mt-1" disabled /></div>
                      <div><label className="text-sm font-medium text-gray-700">Team Lead</label><Input value={teamInfo.teamLead} className="mt-1" disabled /></div>
                      <div><label className="text-sm font-medium text-gray-700">Team Size</label><Input value={`${dashboardData?.teamSize || members.length || 0} members`} className="mt-1" disabled /></div>
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