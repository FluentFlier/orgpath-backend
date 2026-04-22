import { useState, useEffect } from "react";
import { 
  LayoutDashboard, Grid3X3, Users, TrendingUp, AlertCircle, 
  Award, LogOut, Bell, Search, ChevronDown, Filter, ChevronRight, Briefcase
} from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Input } from "./ui/input";
import { OrgPathLogo } from "./OrgPathLogo";
import { toast } from "sonner";

interface CompanyDashboardProps {
  onLogout?: () => void;
  userName?: string;
}

export function CompanyDashboard({ onLogout, userName = "Arthur Gabster" }: CompanyDashboardProps) {
  const [activeNav, setActiveNav] = useState("ninebox");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [members, setMembers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch real employees from database
  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      const token = sessionStorage.getItem("orgpath_token");
      try {
        const res = await fetch("http://localhost:8080/api/users", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (res.ok) {
          const data = await res.json();
          // Filter to only employees
          const employees = Array.isArray(data) ? data.filter((u: any) => u.role === 'employee') : [];
          setMembers(employees);
        }
      } catch (err) {
        console.error("Failed to load members:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  // --- 9-BOX MATRIX LOGIC ---
  // Akeel's 9-Box Grid Mapping
  const boxDefinitions = {
    "Consistent Star": { color: "#9333ea", bg: "#faf5ff", desc: "Top talent. Exceptional readiness for next level." },
    "Future Star": { color: "#106BB0", bg: "#f0f9ff", desc: "Solid performers with a very high ceiling." },
    "Rough Diamond": { color: "#f59e0b", bg: "#fffbeb", desc: "High agility but needs performance alignment." },
    "Current Star": { color: "#06A119", bg: "#f0fdf4", desc: "High achievers mastering their domain." },
    "Key Player": { color: "#1B8784", bg: "#f0fdfa", desc: "The core of your team. Reliable." },
    "Inconsistent": { color: "#eab308", bg: "#fffbeb", desc: "Has capability, but execution is lacking." },
    "High Professional": { color: "#2563eb", bg: "#eff6ff", desc: "Well-Placed Master. Absolute experts." },
    "Effective": { color: "#0d9488", bg: "#f0fdfa", desc: "Steady, reliable employees." },
    "Underperformer": { color: "#e11d48", bg: "#fff1f2", desc: "Mismatched / Flag for Replacement." }
  };

  // Helper to categorize employees into the 9 boxes
  const categorizeEmployees = () => {
    const grid: Record<string, any[]> = {
      "Rough Diamond": [], "Future Star": [], "Consistent Star": [],
      "Inconsistent": [], "Key Player": [], "Current Star": [],
      "Underperformer": [], "Effective": [], "High Professional": []
    };

    // To make the demo look amazing, we mix real DB users with a few simulated ones
    const simulatedData = [
      ...members,
      { id: 101, first_name: "Sarah", last_name: "Jenkins", title: "Senior Analyst", performance_rating: "5", potential: "High Potential (HIPO)" },
      { id: 102, first_name: "David", last_name: "Kim", title: "Marketing Lead", performance_rating: "4", potential: "High Potential (HIPO)" },
      { id: 103, first_name: "Elena", last_name: "Rodriguez", title: "Developer", performance_rating: "3", potential: "Expandable Potential" },
      { id: 104, first_name: "Michael", last_name: "Chang", title: "Designer", performance_rating: "5", potential: "Well-Placed (Master)" },
      { id: 105, first_name: "Jessica", last_name: "Smith", title: "Accountant", performance_rating: "2", potential: "Mismatched" },
      { id: 106, first_name: "James", last_name: "Wilson", title: "Sales Rep", performance_rating: "4", potential: "Expandable Potential" },
      { id: 107, first_name: "Robert", last_name: "Brown", title: "Consultant", performance_rating: "3", potential: "Well-Placed (Master)" },
      { id: 108, first_name: "Linda", last_name: "Davis", title: "HR Rep", performance_rating: "2", potential: "High Potential (HIPO)" },
    ];

    simulatedData.forEach(emp => {
      let perf = 3; // Default
      const rawPerf = emp.performance_rating?.toString().toLowerCase() || "";
      if (rawPerf === "5" || rawPerf.includes("exceed")) perf = 5;
      else if (rawPerf === "4" || rawPerf.includes("strong")) perf = 4;
      else if (rawPerf === "2" || rawPerf.includes("develop")) perf = 2;
      else if (rawPerf === "1" || rawPerf.includes("need")) perf = 1;

      // Mock potential if missing from DB for demo purposes
      const pot = emp.potential || "Expandable Potential"; 

      let box = "Key Player";
      if (pot === "High Potential (HIPO)") {
        if (perf >= 5) box = "Consistent Star";
        else if (perf >= 3) box = "Future Star";
        else box = "Rough Diamond";
      } else if (pot === "Expandable Potential") {
        if (perf >= 5) box = "Current Star";
        else if (perf >= 3) box = "Key Player";
        else box = "Inconsistent";
      } else {
        if (perf >= 5) box = "High Professional";
        else if (perf >= 3) return "Effective";
        else box = "Underperformer";
      }

      if (grid[box]) grid[box].push(emp);
    });

    return grid;
  };

  const gridData = categorizeEmployees();
  const totalEmployees = Object.values(gridData).flat().length;

  const navItems = [
    { id: "dashboard", label: "Executive Summary", icon: LayoutDashboard },
    { id: "ninebox", label: "9-Box Talent Matrix", icon: Grid3X3 },
    { id: "succession", label: "Succession Risks", icon: AlertCircle },
    { id: "directory", label: "Company Directory", icon: Users },
  ];

  return (
    <div className="flex h-screen bg-slate-50 font-sans text-slate-900">
      
      {/* Sidebar */}
      <div className={`bg-slate-900 text-white flex flex-col transition-all duration-300 shadow-2xl z-20 ${sidebarCollapsed ? "w-20" : "w-64"}`}>
        <div className={`border-b border-slate-800 ${sidebarCollapsed ? "p-4" : "p-6"}`}>
          {!sidebarCollapsed ? (
            <div>
              <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Enterprise</div>
              <div className="text-xl font-black italic tracking-tighter">COMPANY DASHBOARD</div>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="w-10 h-10 rounded-lg flex items-center justify-center text-white bg-blue-600 font-bold">O</div>
            </div>
          )}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = activeNav === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                style={{ backgroundColor: isActive ? '#106BB0' : 'transparent' }}
                className={`w-full flex items-center ${sidebarCollapsed ? "justify-center" : "gap-3"} px-4 py-3 rounded-xl transition-all ${
                  isActive ? "text-white shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
                title={sidebarCollapsed ? item.label : ""}
              >
                <item.icon className="w-5 h-5" />
                {!sidebarCollapsed && <span className="font-bold text-sm">{item.label}</span>}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button onClick={onLogout} className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl hover:bg-red-900/50 text-red-400 hover:text-red-300 transition-all font-bold text-sm">
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && <span>Secure Logout</span>}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Header */}
        <header className="h-20 bg-white border-b border-slate-200 px-8 flex items-center justify-between shadow-sm shrink-0 z-10">
          <div className="flex items-center gap-4">
            <div className="bg-slate-100 p-2 rounded-lg">
              <Briefcase className="w-5 h-5 text-slate-600" />
            </div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">Enterprise Talent View</h1>
          </div>

          <div className="flex items-center gap-6">
            <div className="relative w-64 hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input placeholder="Search enterprise..." className="pl-9 bg-slate-50 border-slate-200 text-sm font-medium rounded-full h-10" />
            </div>

            <Button variant="ghost" size="icon" className="relative text-slate-600 hover:bg-slate-100 rounded-full">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-2 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </Button>

            <div className="flex items-center gap-3 pl-6 border-l border-slate-200 cursor-pointer">
              <div className="text-right hidden md:block">
                <div className="text-sm font-bold text-slate-900 leading-tight">{userName}</div>
                <div className="text-xs font-bold text-blue-600 uppercase tracking-widest">Executive HR</div>
              </div>
              <Avatar className="w-10 h-10 border-2 border-blue-100">
                <AvatarFallback className="bg-blue-600 text-white font-bold">AG</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        {/* Scrollable Canvas */}
        <main className="flex-1 overflow-y-auto p-8 bg-slate-50/50">
          
          {/* Dashboard Summary Tab */}
          {activeNav === "dashboard" && (
            <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
              <div className="flex items-end justify-between">
                <div>
                  <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Executive Summary</h2>
                  <p className="text-slate-500 font-medium mt-1">High-level overview of company-wide talent metrics.</p>
                </div>
                <Button style={{ backgroundColor: '#106BB0', color: 'white' }} className="font-bold shadow-md rounded-xl h-10 px-6">
                  <Download className="w-4 h-4 mr-2" /> Export Board Report
                </Button>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                  { label: "Total Headcount", val: totalEmployees, icon: Users, color: "#106BB0", trend: "+12%" },
                  { label: "Top Talent Pool", val: gridData["Consistent Star"].length + gridData["Future Star"].length, icon: Award, color: "#9333ea", trend: "+5%" },
                  { label: "Flight Risk Critical", val: "4", icon: AlertCircle, color: "#f59e0b", trend: "-2%" },
                  { label: "Org Health Score", val: "88%", icon: TrendingUp, color: "#06A119", trend: "+4%" },
                ].map((stat, i) => (
                  <Card key={i} className="border-0 shadow-md rounded-3xl overflow-hidden relative group">
                    <div className="absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-10 transition-transform group-hover:scale-110" style={{ backgroundColor: stat.color }}></div>
                    <CardContent className="p-6 relative z-10">
                      <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-2xl" style={{ backgroundColor: `${stat.color}15`, color: stat.color }}>
                          <stat.icon className="w-6 h-6" />
                        </div>
                        <div className="text-xs font-bold px-2 py-1 rounded-full bg-slate-100 text-slate-600">{stat.trend}</div>
                      </div>
                      <div className="text-4xl font-black text-slate-900 tracking-tighter mb-1">{stat.val}</div>
                      <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Quick Chart Placeholder */}
              <Card className="border-0 shadow-md rounded-3xl p-8">
                <div className="flex items-center justify-center h-64 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                    <p className="text-slate-500 font-bold">Departmental Performance Chart Rendering Engine</p>
                    <p className="text-sm text-slate-400">Navigate to the 9-Box Matrix for interactive talent mapping.</p>
                  </div>
                </div>
              </Card>
            </div>
          )}

          {/* THE 9-BOX MATRIX TAB (The Crown Jewel) */}
          {activeNav === "ninebox" && (
            <div className="max-w-[1400px] mx-auto space-y-6 animate-in fade-in duration-500">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white p-8 rounded-[32px] shadow-sm border border-slate-200">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                      <Grid3X3 className="w-5 h-5" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Enterprise 9-Box Matrix</h2>
                  </div>
                  <p className="text-slate-500 font-medium">Interactive cross-section of Performance vs. Potential across the entire organization.</p>
                </div>
                <div className="flex gap-3">
                  <Button variant="outline" className="font-bold border-2 rounded-xl text-slate-600 h-10">
                    <Filter className="w-4 h-4 mr-2" /> Filter Dept
                  </Button>
                </div>
              </div>

              {/* Grid Container */}
              <div className="relative">
                {/* Axis Labels */}
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 origin-center flex items-center justify-center w-[600px] h-10 pointer-events-none">
                  <div className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-4">
                    <span>Low</span>
                    <span className="w-32 h-0.5 bg-slate-300 rounded-full"></span>
                    <span className="text-slate-800">POTENTIAL RATING</span>
                    <span className="w-32 h-0.5 bg-slate-300 rounded-full"></span>
                    <span>High</span>
                  </div>
                </div>

                <div className="pl-12 pb-12 pt-4">
                  {/* The 3x3 Grid */}
                  <div className="grid grid-cols-3 grid-rows-3 gap-4 h-[750px]">
                    
                    {/* ROW 1: High Potential */}
                    {["Rough Diamond", "Future Star", "Consistent Star"].map((boxName) => (
                      <div key={boxName} className="rounded-3xl border-2 p-6 flex flex-col transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer" style={{ backgroundColor: boxDefinitions[boxName as keyof typeof boxDefinitions].bg, borderColor: `${boxDefinitions[boxName as keyof typeof boxDefinitions].color}40` }}>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-black uppercase tracking-tight" style={{ color: boxDefinitions[boxName as keyof typeof boxDefinitions].color }}>{boxName}</h3>
                          <span className="text-2xl font-black text-slate-900">{gridData[boxName].length}</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 h-8 leading-tight">
                          {boxDefinitions[boxName as keyof typeof boxDefinitions].desc}
                        </p>
                        <div className="flex-1 bg-white/60 rounded-2xl p-3 overflow-y-auto space-y-2 border border-white">
                          {gridData[boxName].map((emp, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                              <Avatar className="w-8 h-8 border border-slate-100">
                                <AvatarFallback className="text-xs font-bold text-white" style={{ backgroundColor: boxDefinitions[boxName as keyof typeof boxDefinitions].color }}>
                                  {emp.first_name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="overflow-hidden">
                                <div className="text-xs font-bold text-slate-800 truncate">{emp.first_name} {emp.last_name}</div>
                                <div className="text-[9px] text-slate-500 uppercase font-semibold truncate">{emp.title || 'Staff'}</div>
                              </div>
                            </div>
                          ))}
                          {gridData[boxName].length === 0 && (
                            <div className="h-full flex items-center justify-center text-xs font-bold text-slate-400 italic">Empty Quadrant</div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* ROW 2: Moderate Potential */}
                    {["Inconsistent", "Key Player", "Current Star"].map((boxName) => (
                      <div key={boxName} className="rounded-3xl border-2 p-6 flex flex-col transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer" style={{ backgroundColor: boxDefinitions[boxName as keyof typeof boxDefinitions].bg, borderColor: `${boxDefinitions[boxName as keyof typeof boxDefinitions].color}40` }}>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-black uppercase tracking-tight" style={{ color: boxDefinitions[boxName as keyof typeof boxDefinitions].color }}>{boxName}</h3>
                          <span className="text-2xl font-black text-slate-900">{gridData[boxName].length}</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 h-8 leading-tight">
                          {boxDefinitions[boxName as keyof typeof boxDefinitions].desc}
                        </p>
                        <div className="flex-1 bg-white/60 rounded-2xl p-3 overflow-y-auto space-y-2 border border-white">
                          {gridData[boxName].map((emp, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                              <Avatar className="w-8 h-8 border border-slate-100">
                                <AvatarFallback className="text-xs font-bold text-white" style={{ backgroundColor: boxDefinitions[boxName as keyof typeof boxDefinitions].color }}>
                                  {emp.first_name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="overflow-hidden">
                                <div className="text-xs font-bold text-slate-800 truncate">{emp.first_name} {emp.last_name}</div>
                                <div className="text-[9px] text-slate-500 uppercase font-semibold truncate">{emp.title || 'Staff'}</div>
                              </div>
                            </div>
                          ))}
                          {gridData[boxName].length === 0 && (
                            <div className="h-full flex items-center justify-center text-xs font-bold text-slate-400 italic">Empty Quadrant</div>
                          )}
                        </div>
                      </div>
                    ))}

                    {/* ROW 3: Low Potential */}
                    {["Underperformer", "Effective", "High Professional"].map((boxName) => (
                      <div key={boxName} className="rounded-3xl border-2 p-6 flex flex-col transition-all hover:shadow-xl hover:scale-[1.02] cursor-pointer" style={{ backgroundColor: boxDefinitions[boxName as keyof typeof boxDefinitions].bg, borderColor: `${boxDefinitions[boxName as keyof typeof boxDefinitions].color}40` }}>
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-black uppercase tracking-tight" style={{ color: boxDefinitions[boxName as keyof typeof boxDefinitions].color }}>{boxName}</h3>
                          <span className="text-2xl font-black text-slate-900">{gridData[boxName].length}</span>
                        </div>
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-4 h-8 leading-tight">
                          {boxDefinitions[boxName as keyof typeof boxDefinitions].desc}
                        </p>
                        <div className="flex-1 bg-white/60 rounded-2xl p-3 overflow-y-auto space-y-2 border border-white">
                          {gridData[boxName].map((emp, idx) => (
                            <div key={idx} className="flex items-center gap-3 bg-white p-2 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                              <Avatar className="w-8 h-8 border border-slate-100">
                                <AvatarFallback className="text-xs font-bold text-white" style={{ backgroundColor: boxDefinitions[boxName as keyof typeof boxDefinitions].color }}>
                                  {emp.first_name[0]}
                                </AvatarFallback>
                              </Avatar>
                              <div className="overflow-hidden">
                                <div className="text-xs font-bold text-slate-800 truncate">{emp.first_name} {emp.last_name}</div>
                                <div className="text-[9px] text-slate-500 uppercase font-semibold truncate">{emp.title || 'Staff'}</div>
                              </div>
                            </div>
                          ))}
                          {gridData[boxName].length === 0 && (
                            <div className="h-full flex items-center justify-center text-xs font-bold text-slate-400 italic">Empty Quadrant</div>
                          )}
                        </div>
                      </div>
                    ))}

                  </div>

                  {/* X-Axis Label */}
                  <div className="mt-8 flex items-center justify-center w-full h-10 pointer-events-none">
                    <div className="text-sm font-black uppercase tracking-[0.3em] text-slate-400 flex items-center gap-4">
                      <span>Low</span>
                      <span className="w-64 h-0.5 bg-slate-300 rounded-full"></span>
                      <span className="text-slate-800">PERFORMANCE RATING</span>
                      <span className="w-64 h-0.5 bg-slate-300 rounded-full"></span>
                      <span>High</span>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {activeNav !== "dashboard" && activeNav !== "ninebox" && (
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
              <div className="w-24 h-24 bg-slate-200 rounded-full flex items-center justify-center mb-6">
                <AlertCircle className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-black text-slate-800 mb-2">Module In Development</h3>
              <p className="text-slate-500 max-w-md font-medium">
                The {navItems.find(i => i.id === activeNav)?.label} module is scheduled for the next release sprint. Focus on the 9-Box Talent Matrix for this demo.
              </p>
              <Button 
                onClick={() => setActiveNav('ninebox')}
                className="mt-8 bg-[#106BB0] hover:bg-[#0d5994] text-white font-bold rounded-xl px-8"
              >
                Return to 9-Box Matrix
              </Button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}