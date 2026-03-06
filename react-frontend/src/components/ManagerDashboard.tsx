import { useState, useEffect } from "react";
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
  Award,
  AlertTriangle,
  Eye,
  Sparkles,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface ManagerDashboardProps {
  onLogout?: () => void;
}

export function ManagerDashboard({ onLogout }: ManagerDashboardProps) {
  const [activeNav, setActiveNav] = useState("dashboard");
  const [activeTab, setActiveTab] = useState("overview");
  const [employeeSearch, setEmployeeSearch] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // --- Real Data States ---
  const [user, setUser] = useState<any>(null);
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [employees, setEmployees] = useState<any[]>([]); 
  const [loadingEmployees, setLoadingEmployees] = useState(true); // Default to true

  // --- Fetch Data on Load ---
  useEffect(() => {
    const userStr = sessionStorage.getItem("orgpath_user");
    if (userStr) {
      setUser(JSON.parse(userStr));
    }

    const token = sessionStorage.getItem("orgpath_token");

    const fetchDashboard = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/company/dashboard", {
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

    const fetchEmployees = async () => {
      try {
        const res = await fetch("http://localhost:8080/api/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          // Filter to only show employees safely
          const onlyEmployees = (data || []).filter((u: any) => u.role === 'employee');
          setEmployees(onlyEmployees);
        }
      } catch (err) {
        console.error("Failed to load employees:", err);
      } finally {
        setLoadingEmployees(false);
      }
    };

    fetchDashboard();
    fetchEmployees();
  }, []);

  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "teams", label: "Teams", icon: Building2 },
    { id: "employees", label: "Employees", icon: Users },
    { id: "analytics", label: "Analytics", icon: BarChart3 },
    { id: "settings", label: "Settings", icon: Settings },
  ];

  // Organizational Health Metrics (Wired to Backend)
  const healthMetrics = [
    { name: "Organizational Health", score: dashboardData?.health?.org ?? 81, stars: 4 },
    { name: "Collaboration & Communication", score: dashboardData?.health?.collab ?? 92, stars: 4.5 },
    { name: "Adaptability", score: dashboardData?.health?.adaptability ?? 67, stars: 3 },
  ];

  // Completion by Level (Wired to Backend)
  const completionByLevel = [
    { role: "New Graduate", count: dashboardData?.roles?.graduate ?? 12, max: 50, color: "#06A119" },
    { role: "Junior Consultant", count: dashboardData?.roles?.junior ?? 7, max: 50, color: "#06A119" },
    { role: "Consultant", count: dashboardData?.roles?.consultant ?? 14, max: 50, color: "#06A119" },
    { role: "Senior Consultant", count: dashboardData?.roles?.senior ?? 22, max: 50, color: "#1B8784" },
    { role: "Manager", count: dashboardData?.roles?.manager ?? 19, max: 50, color: "#1B8784" },
    { role: "Executive", count: dashboardData?.roles?.executive ?? 23, max: 50, color: "#1B8784" },
  ];

  // Team Effectiveness by Department
  const teamEffectiveness = [
    { dept: "Finance", health: 81, collaboration: 84, adaptability: 78 },
    { dept: "Marketing", health: 92, collaboration: 89, adaptability: 91 },
    { dept: "HR", health: 80, collaboration: 73, adaptability: 86 },
    { dept: "Project Management", health: 74, collaboration: 76, adaptability: 72 },
    { dept: "Business Development", health: 96, collaboration: 94, adaptability: 93 },
  ];

  const mobilityRates = [
    { category: "High Potential", rate: 22, benchmark: "24-28%" },
    { category: "High Performers", rate: 18, benchmark: "16-20%" },
    { category: "General Population", rate: 5, benchmark: "5-10%" },
  ];

  const colors = ["#106BB0", "#06A119", "#1B8784", "#1C986B", "#1C897E"];

  // SAFE Filtering
  const filteredEmployees = employees.filter((emp) => {
    if (!emp) return false;
    const fullName = `${emp.first_name || ''} ${emp.last_name || ''}`.toLowerCase();
    const search = employeeSearch.toLowerCase();
    return (
      fullName.includes(search) ||
      (emp.title || '').toLowerCase().includes(search) ||
      (emp.department || '').toLowerCase().includes(search)
    );
  });

  // SAFE Unique Departments calculation
  const uniqueDepartments = Array.isArray(employees) && employees.length > 0 
    ? new Set(employees.map(e => e?.department || 'Unassigned')).size 
    : 0;

  return (
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
              <Input placeholder="Search..." className="pl-10 bg-gray-50 border-gray-200" />
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </Button>

              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <Avatar>
                  <AvatarFallback className="text-white" style={{ backgroundColor: "#106BB0" }}>
                    {user?.first_name?.charAt(0)?.toUpperCase() || "C"}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900">
                    {user ? `${user.first_name} ${user.last_name || ''}` : "Company Manager"}
                  </span>
                  <span className="text-xs text-gray-500">Executive Level</span>
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
            background: "linear-gradient(90deg, #116CB1 0%, #1B8784 33%, #1C986B 66%, #1C897E 100%)",
          }}
        >
          <div className="relative z-10">
            <h1 className="text-white text-2xl font-bold">ORGANIZATIONAL EFFECTIVENESS</h1>
          </div>
        </div>

        {/* Dashboard Content */}
        <main className="flex-1 overflow-y-auto p-8">
          {activeNav === "employees" ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">All Employees</h2>
                  <p className="text-gray-600 mt-1">
                    Manage and view all employees across the organization
                  </p>
                </div>
                <Button style={{ backgroundColor: "#06A119", color: "white" }}>
                  <Users className="w-4 h-4 mr-2" />
                  Add Employee
                </Button>
              </div>

              {/* Search Bar */}
              <Card>
                <CardContent className="pt-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="text"
                      placeholder="Search employees by name, role, or department..."
                      value={employeeSearch}
                      onChange={(e) => setEmployeeSearch(e.target.value)}
                      className="pl-10 pr-4 py-3 w-full"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Employee Stats */}
              <div className="grid grid-cols-4 gap-4">
                <Card className="border-2 border-blue-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Total Employees</p>
                        <p className="text-3xl font-bold" style={{ color: "#106BB0" }}>
                          {employees.length}
                        </p>
                      </div>
                      <Users className="w-10 h-10" style={{ color: "#106BB0" }} />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-green-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Active</p>
                        <p className="text-3xl font-bold" style={{ color: "#06A119" }}>
                          {employees.length}
                        </p>
                      </div>
                      <CheckCircle2 className="w-10 h-10" style={{ color: "#06A119" }} />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-teal-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Departments</p>
                        <p className="text-3xl font-bold" style={{ color: "#1B8784" }}>
                          {uniqueDepartments}
                        </p>
                      </div>
                      <Building2 className="w-10 h-10" style={{ color: "#1B8784" }} />
                    </div>
                  </CardContent>
                </Card>
                <Card className="border-2 border-purple-200">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-gray-600">Avg Performance</p>
                        <p className="text-3xl font-bold text-purple-600">
                          {dashboardData?.health?.org ?? 81}%
                        </p>
                      </div>
                      <Award className="w-10 h-10 text-purple-600" />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Employees List */}
              <Card>
                <CardHeader>
                  <CardTitle style={{ color: "#106BB0" }}>Employee Directory</CardTitle>
                  <CardDescription>
                    {filteredEmployees.length} {filteredEmployees.length === 1 ? "employee" : "employees"} found
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {loadingEmployees ? (
                    <div className="text-center py-12 text-gray-500">Loading real employees...</div>
                  ) : (
                    <div className="space-y-3">
                      {filteredEmployees.map((emp, index) => {
                        const empColor = colors[index % colors.length];
                        return (
                          <div
                            key={emp.id}
                            className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:shadow-md transition-all"
                          >
                            <Avatar className="w-14 h-14">
                              <AvatarFallback
                                className="text-white text-lg"
                                style={{ backgroundColor: empColor }}
                              >
                                {(emp.first_name || 'E').charAt(0)}{(emp.last_name || '').charAt(0)}
                              </AvatarFallback>
                            </Avatar>

                            <div className="flex-1 grid grid-cols-5 gap-4 items-center">
                              <div>
                                <p className="font-semibold text-gray-900">{emp.first_name} {emp.last_name}</p>
                                <p className="text-sm text-gray-600">{emp.email}</p>
                              </div>

                              <div>
                                <p className="text-sm text-gray-500">Role</p>
                                <p className="text-sm font-medium text-gray-900">{emp.title || 'Employee'}</p>
                              </div>

                              <div>
                                <p className="text-sm text-gray-500">Department</p>
                                <div className="flex items-center gap-1">
                                  <Building2 className="w-3 h-3" style={{ color: empColor }} />
                                  <span className="text-sm font-medium text-gray-900">{emp.department || 'General'}</span>
                                </div>
                              </div>

                              <div>
                                <p className="text-sm text-gray-500">Rating</p>
                                <p className="text-sm font-medium text-gray-900">{emp.performance_rating || 'N/A'}</p>
                              </div>

                              <div>
                                <span
                                  className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium"
                                  style={{
                                    backgroundColor: "#06A11920",
                                    color: "#06A119",
                                  }}
                                >
                                  <CheckCircle2 className="w-3 h-3" />
                                  Active
                                </span>
                              </div>
                            </div>

                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                style={{ borderColor: empColor, color: empColor }}
                              >
                                <Eye className="w-4 h-4 mr-1" />
                                View Details
                              </Button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}

                  {filteredEmployees.length === 0 && !loadingEmployees && (
                    <div className="text-center py-12 text-gray-500">
                      <Users className="w-16 h-16 mx-auto mb-3 text-gray-300" />
                      <p className="text-lg">No employees found</p>
                      <p className="text-sm">Try adjusting your search criteria</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          ) : (
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="teams">Team Effectiveness</TabsTrigger>
                <TabsTrigger value="talent">Talent Management</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle style={{ color: "#106BB0" }}>Completion Information</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-sm font-medium text-gray-600">Total Completion</span>
                            <span className="text-4xl font-bold">{dashboardData?.completion?.total ?? 82}</span>
                          </div>
                          <div className="space-y-2 mb-4">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Male</span>
                              <span className="font-medium">{dashboardData?.completion?.male ?? 47}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all"
                                style={{ width: `${dashboardData?.completion?.male ?? 47}%`, backgroundColor: "#106BB0" }}
                              />
                            </div>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-600">Female</span>
                              <span className="font-medium">{dashboardData?.completion?.female ?? 53}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="h-2 rounded-full transition-all"
                                style={{ width: `${dashboardData?.completion?.female ?? 53}%`, backgroundColor: "#06A119" }}
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          {completionByLevel.map((level, idx) => (
                            <div key={idx} className="flex items-center justify-between">
                              <span className="text-sm text-gray-600 w-40">{level.role}</span>
                              <div className="flex-1 mx-4">
                                <div
                                  className="h-6 rounded flex items-center justify-end px-2 transition-all"
                                  style={{
                                    backgroundColor: level.color,
                                    width: `${(level.count / level.max) * 100}%`,
                                    minWidth: "40px",
                                  }}
                                >
                                  <span className="text-white text-sm font-medium">{level.count}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle style={{ color: "#106BB0" }}>Health Check</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-8 pb-10">
                      <div className="space-y-12">
                        {healthMetrics.map((metric, idx) => (
                          <div key={idx} className="flex items-center justify-between hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-transparent p-4 rounded-xl transition-all duration-300 hover:scale-[1.02] group/health">
                            <div className="flex-1">
                              <div className="text-xl font-bold text-gray-900 mb-3 group-hover/health:text-[#1B8784] transition-colors">{metric.name}</div>
                              <div className="flex items-center gap-2">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <span
                                    key={i}
                                    className={`text-3xl transition-all duration-300 group-hover/health:scale-125 ${i < Math.floor(metric.stars) ? 'text-[#06A119]' : 'text-gray-300'}`}
                                  >
                                    ★
                                  </span>
                                ))}
                              </div>
                            </div>
                            <div className="text-6xl font-extrabold bg-gradient-to-r from-[#106BB0] to-[#06A119] bg-clip-text text-transparent group-hover/health:scale-110 transition-transform">{metric.score}%</div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle style={{ color: "#106BB0" }}>
                        High Performance/High Potential vs Total Employee Population
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="flex justify-center">
                      <div className="relative w-64 h-64">
                        <div
                          className="absolute inset-0 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#106BB0" }}
                        >
                          <div className="text-center text-white">
                            <div className="text-xs mb-1">Total Employee Population</div>
                            <div className="text-3xl font-bold">82</div>
                          </div>
                        </div>
                        <div
                          className="absolute inset-[15%] rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#06A119" }}
                        >
                          <div className="text-center text-white">
                            <div className="text-xs mb-1">High Performing</div>
                            <div className="text-2xl font-bold">28%</div>
                            <div className="text-xs">(23)</div>
                          </div>
                        </div>
                        <div
                          className="absolute inset-[35%] rounded-full flex items-center justify-center"
                          style={{ backgroundColor: "#1B8784" }}
                        >
                          <div className="text-center text-white">
                            <div className="text-xs mb-1">High Potential</div>
                            <div className="text-xl font-bold">{dashboardData?.highPotential?.percent ?? 12}%</div>
                            <div className="text-xs">({dashboardData?.highPotential?.count ?? 10})</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle style={{ color: "#106BB0" }}>Currently Capable vs Not Ready</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex h-12 rounded-lg overflow-hidden">
                          <div
                            className="flex items-center justify-center text-white font-bold transition-all"
                            style={{ width: `${dashboardData?.capability?.notReady ?? 46}%`, backgroundColor: "#106BB0" }}
                          >
                            {dashboardData?.capability?.notReady ?? 46}%
                          </div>
                          <div
                            className="flex items-center justify-center text-white font-bold transition-all"
                            style={{ width: `${dashboardData?.capability?.capable ?? 54}%`, backgroundColor: "#06A119" }}
                          >
                            {dashboardData?.capability?.capable ?? 54}%
                          </div>
                        </div>
                        <div className="flex justify-center gap-8 text-sm">
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#106BB0" }}></div>
                            <span>NO</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="w-4 h-4 rounded" style={{ backgroundColor: "#06A119" }}></div>
                            <span>YES</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle style={{ color: "#106BB0" }}>Retention Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-around items-center">
                        <div className="text-center">
                          <div className="relative w-32 h-32 mb-2">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke="#06A119"
                                strokeWidth="8"
                                strokeDasharray={`${2 * Math.PI * 40 * ((dashboardData?.retention ?? 91) / 100)} ${2 * Math.PI * 40}`}
                                strokeLinecap="round"
                                transform="rotate(-90 50 50)"
                                className="transition-all duration-1000"
                              />
                              <text x="50" y="50" textAnchor="middle" dy="0.3em" className="text-2xl font-bold" fill="#000">
                                {dashboardData?.retention ?? 91}%
                              </text>
                            </svg>
                          </div>
                          <div className="text-sm font-medium text-gray-900">High Potential</div>
                          <div className="text-xs text-gray-500">Benchmark: 85-95%</div>
                        </div>
                        <div className="text-center">
                          <div className="relative w-32 h-32 mb-2">
                            <svg className="w-full h-full" viewBox="0 0 100 100">
                              <circle cx="50" cy="50" r="40" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                              <circle
                                cx="50"
                                cy="50"
                                r="40"
                                fill="none"
                                stroke="#106BB0"
                                strokeWidth="8"
                                strokeDasharray={`${2 * Math.PI * 40 * 0.73} ${2 * Math.PI * 40}`}
                                strokeLinecap="round"
                                transform="rotate(-90 50 50)"
                              />
                              <text x="50" y="50" textAnchor="middle" dy="0.3em" className="text-2xl font-bold" fill="#000">
                                73%
                              </text>
                            </svg>
                          </div>
                          <div className="text-sm font-medium text-gray-900">All Employees</div>
                          <div className="text-xs text-gray-500">Benchmark: 70-80%</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle style={{ color: "#106BB0" }}>Internal Mobility Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {mobilityRates.map((item, idx) => (
                          <div key={idx} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium text-gray-900">{item.category}</span>
                              <span className="text-2xl font-bold">{item.rate}%</span>
                            </div>
                            <div className="text-xs text-gray-500">Benchmark: {item.benchmark}</div>
                            {idx < mobilityRates.length - 1 && <div className="border-t pt-2"></div>}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle style={{ color: "#106BB0" }}>Pay Equity Gap</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex h-12 rounded-lg overflow-hidden border-2 border-gray-200">
                          <div
                            className="flex items-center justify-center text-white font-bold relative"
                            style={{ width: "47%", backgroundColor: "#06A119" }}
                          >
                            Female 47%
                          </div>
                          <div className="flex items-center justify-center absolute left-1/2 -translate-x-1/2 z-10">
                            <div className="bg-white border-2 border-gray-800 rounded px-2 py-1 text-xs font-bold">
                              GAP 3%
                            </div>
                          </div>
                          <div
                            className="flex items-center justify-center text-white font-bold"
                            style={{ width: "53%", backgroundColor: "#106BB0" }}
                          >
                            Male 53%
                          </div>
                        </div>
                        <div className="text-center text-xs text-gray-500">
                          Benchmark: &lt;3% Gap
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="teams" className="space-y-6">
                <div className="grid grid-cols-1 gap-6">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader className="bg-gradient-to-r from-blue-50 to-green-50">
                        <CardTitle style={{ color: "#106BB0" }}>TOP SCORING CATEGORY</CardTitle>
                        <CardDescription>Your organization ranked highest in:</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-20 h-20 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "#06A11920" }}
                          >
                            <Award className="w-10 h-10" style={{ color: "#06A119" }} />
                          </div>
                          <div className="text-2xl font-bold">EMBRACES AGILITY</div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
                        <CardTitle style={{ color: "#dc2626" }}>LOWEST SCORING CATEGORY</CardTitle>
                        <CardDescription>Your organization ranked lowest in:</CardDescription>
                      </CardHeader>
                      <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-20 h-20 rounded-full flex items-center justify-center"
                            style={{ backgroundColor: "#dc262620" }}
                          >
                            <AlertTriangle className="w-10 h-10" style={{ color: "#dc2626" }} />
                          </div>
                          <div className="text-2xl font-bold">LIMITS RISK</div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  <Card>
                    <CardHeader>
                      <CardTitle style={{ color: "#106BB0" }}>Business Area Performance</CardTitle>
                      <CardDescription>Effectiveness scores across all departments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {teamEffectiveness.map((team, idx) => (
                          <div key={idx} className="space-y-3">
                            <div className="flex items-center justify-between">
                              <h4 className="font-bold text-lg">{team.dept}</h4>
                              <div className="flex gap-4 text-sm">
                                <span className="text-gray-600">Health: {team.health}%</span>
                                <span className="text-gray-600">Collab: {team.collaboration}%</span>
                                <span className="text-gray-600">Adapt: {team.adaptability}%</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full"
                                  style={{ width: `${team.health}%`, backgroundColor: "#106BB0" }}
                                />
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full"
                                  style={{ width: `${team.collaboration}%`, backgroundColor: "#06A119" }}
                                />
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="h-2 rounded-full"
                                  style={{ width: `${team.adaptability}%`, backgroundColor: "#1B8784" }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="lg:col-span-2">
                    <CardHeader>
                      <CardTitle style={{ color: "#106BB0" }}>Enterprise Benchmark Comparison</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="border-2 border-gray-200 rounded-lg p-4">
                          <h4 className="font-bold text-center mb-4">HIGHEST SCORING BUSINESS AREA</h4>
                          <div className="text-center mb-4">
                            <div
                              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-2"
                              style={{ backgroundColor: "#06A11920" }}
                            >
                              <span className="text-2xl">💰</span>
                            </div>
                            <div className="font-bold">FINANCE</div>
                          </div>
                          <div
                            className="h-8 rounded flex items-center justify-center text-white font-bold mb-1"
                            style={{ backgroundColor: "#06A119", width: "81%" }}
                          >
                            81%
                          </div>
                          <div className="text-xs text-gray-500 mb-2">MARKETING</div>
                          <div
                            className="h-8 rounded flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: "#06A119", width: "92%" }}
                          >
                            92%
                          </div>
                        </div>

                        <div className="border-2 border-gray-200 rounded-lg p-4">
                          <h4 className="font-bold text-center mb-4">ENTERPRISE BENCHMARK</h4>
                          <div className="space-y-3">
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold">LIMITS RISK</span>
                                <span className="font-bold">81%</span>
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <span className="font-bold">EMBRACES AGILITY</span>
                                <span className="font-bold">86%</span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="border-2 border-gray-200 rounded-lg p-4">
                          <h4 className="font-bold text-center mb-4">LOWEST SCORING BUSINESS AREA</h4>
                          <div className="text-center mb-4">
                            <div
                              className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-2"
                              style={{ backgroundColor: "#106BB020" }}
                            >
                              <Users className="w-8 h-8" style={{ color: "#106BB0" }} />
                            </div>
                            <div className="font-bold">HUMAN RESOURCES</div>
                          </div>
                          <div
                            className="h-8 rounded flex items-center justify-center text-white font-bold mb-1"
                            style={{ backgroundColor: "#106BB0", width: "28%" }}
                          >
                            28%
                          </div>
                          <div className="text-xs text-gray-500 mb-2">COMPLIANCE</div>
                          <div
                            className="h-8 rounded flex items-center justify-center text-white font-bold"
                            style={{ backgroundColor: "#106BB0", width: "48%" }}
                          >
                            48%
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="talent" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle style={{ color: "#106BB0" }}>Talent Pipeline Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Sparkles className="w-6 h-6" style={{ color: "#106BB0" }} />
                            <span className="font-medium">Hidden Talent</span>
                          </div>
                          <span className="text-2xl font-bold" style={{ color: "#106BB0" }}>
                            23
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Award className="w-6 h-6" style={{ color: "#06A119" }} />
                            <span className="font-medium">Ready for Promotion</span>
                          </div>
                          <span className="text-2xl font-bold" style={{ color: "#06A119" }}>
                            14
                          </span>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <Eye className="w-6 h-6" style={{ color: "#f59e0b" }} />
                            <span className="font-medium">Blind Spots</span>
                          </div>
                          <span className="text-2xl font-bold" style={{ color: "#f59e0b" }}>
                            8
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle style={{ color: "#106BB0" }}>Action Required</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start gap-3 p-3 border-l-4 border-red-500 bg-red-50">
                          <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">High Flight Risk</p>
                            <p className="text-xs text-gray-600">
                              5 employees not provided new role in 18-24 months
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 border-l-4 border-amber-500 bg-amber-50">
                          <Eye className="w-5 h-5 text-amber-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">Review Required</p>
                            <p className="text-xs text-gray-600">
                              12 employees showing performance decline
                            </p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3 p-3 border-l-4 border-blue-500 bg-blue-50">
                          <Award className="w-5 h-5 text-blue-600 mt-0.5" />
                          <div>
                            <p className="font-medium text-sm">Recognition Needed</p>
                            <p className="text-xs text-gray-600">
                              23 high performers without recent recognition
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          )}
        </main>
      </div>
    </div>
  );
}