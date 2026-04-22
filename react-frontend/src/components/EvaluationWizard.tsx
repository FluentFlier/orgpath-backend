import { useState } from "react";
import { 
  ArrowLeft, ChevronRight, Target, Lightbulb, Users, 
  LayoutGrid, MessageSquareText, CheckCircle2, Save
} from "lucide-react";
import { toast } from "sonner";

interface EvaluationWizardProps {
  employee: any;
  onClose: () => void;
  onComplete: () => void;
}

export function EvaluationWizard({ employee, onClose, onComplete }: EvaluationWizardProps) {
  const [activeTab, setActiveTab] = useState("performance");
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    performance_rating: 3,
    potential_category: "Expandable Potential",
    flight_risk: "Low",
    impact_of_loss: "Medium",
    final_notes: "",
  });

  const steps = [
    { id: "performance", name: "Performance", icon: Target },
    { id: "potential", name: "Potential", icon: Lightbulb },
    { id: "succession", name: "Succession & Risk", icon: Users },
    { id: "ninebox", name: "9-Box Preview", icon: LayoutGrid },
    { id: "finalize", name: "Finalize", icon: MessageSquareText },
  ];

  const performanceOptions = [
    { val: 5, label: "Exceeds Expectations", desc: "Consistently goes above and beyond the core job description in all areas. Delivers transformative results, sets stretch goals, and elevates the team's baseline." },
    { val: 4, label: "Strong Performer", desc: "Meets all expectations and frequently exceeds them in specific areas. Proactively solves problems and consistently delivers work that is higher quality or faster than expected." },
    { val: 3, label: "Meets Expectations", desc: "The backbone of the team. Consistently delivers high-quality work, meets all core requirements of the role, and requires minimal supervision." },
    { val: 2, label: "Developing / Inconsistent", desc: "Delivery is inconsistent. Often applies to new hires ramping up or employees mastering a new skill set. Needs regular coaching to achieve desired outcomes." },
    { val: 1, label: "Needs Improvement", desc: "Does not consistently meet core role expectations or deliver agreed-upon results. Requires heavy managerial guidance and a structured performance improvement plan." },
  ];

  const potentialOptions = [
    { val: "High Potential (HIPO)", desc: "Exhibits exceptional learning agility, strategic thinking, and emotional intelligence. Highly adaptable and capable of accelerating through multiple levels of leadership or taking on highly complex, cross-functional roles." },
    { val: "Expandable Potential", desc: "Demonstrates the ability to take on expanded responsibilities, lead complex projects, or make lateral moves into new domains. Shows strong learning agility and adaptability." },
    { val: "Well-Placed (Master)", desc: "Highly valuable in their current role. They possess deep expertise but show no current desire or observable agility to take on a significantly different or larger scope." },
    { val: "Mismatched", desc: "Not a good fit for the current role or organizational direction. Lacks necessary agility or capability to perform at expected levels. Action required." },
  ];

  const getNineBoxPosition = () => {
    const perf = formData.performance_rating;
    const pot = formData.potential_category;
    if (pot === "High Potential (HIPO)") {
      if (perf >= 5) return "Consistent Star";
      if (perf >= 3) return "Future Star";
      return "Rough Diamond";
    } else if (pot === "Expandable Potential") {
      if (perf >= 5) return "Current Star";
      if (perf >= 3) return "Key Player";
      return "Inconsistent";
    } else {
      if (perf >= 5) return "High Professional";
      if (perf >= 3) return "Effective";
      return "Underperformer";
    }
  };

  // --- THIS FUNCTION HAS BEEN UPDATED TO SHOW EXACT ERRORS ---
  const handleSave = async (isFinal = false) => {
    setLoading(true);
    const token = sessionStorage.getItem("orgpath_token");
    try {
      const res = await fetch("http://localhost:8080/api/evaluation", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ 
          employee_id: employee?.id, 
          status: isFinal ? "Completed" : "In Progress", 
          ...formData 
        })
      });
      if (res.ok) {
        toast.success(isFinal ? "Evaluation Submitted!" : "Draft Saved");
        if (isFinal) onComplete();
      } else {
        // This will print the exact reason the backend is failing
        const errText = await res.text();
        toast.error(`Backend Error ${res.status}: ${errText}`);
      }
    } catch (err: any) { 
      toast.error(`Network Error: ${err.message}`); 
    } finally { 
      setLoading(false); 
    }
  };

  const handleNext = () => {
    if (activeTab === "performance") setActiveTab("potential");
    else if (activeTab === "potential") setActiveTab("succession");
    else if (activeTab === "succession") setActiveTab("ninebox");
    else if (activeTab === "ninebox") setActiveTab("finalize");
  };

  const handleBack = () => {
    if (activeTab === "potential") setActiveTab("performance");
    else if (activeTab === "succession") setActiveTab("potential");
    else if (activeTab === "ninebox") setActiveTab("succession");
    else if (activeTab === "finalize") setActiveTab("ninebox");
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4 sm:p-8">
      <div className="bg-white w-full max-w-6xl max-h-full h-[850px] rounded-3xl shadow-2xl flex overflow-hidden border border-slate-200">
        
        {/* Sidebar */}
        <div className="w-72 bg-slate-900 text-white flex flex-col shrink-0 z-10">
          <div className="p-6 border-b border-slate-800">
            <div className="text-[10px] font-bold text-[#106BB0] uppercase tracking-widest mb-1">Talent Management</div>
            <div className="text-xl font-black italic tracking-tighter">MANAGER EVALUATION</div>
          </div>
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
            {steps.map((step) => {
              const isActive = activeTab === step.id;
              return (
                <button 
                  key={step.id} 
                  onClick={() => setActiveTab(step.id)} 
                  style={{ backgroundColor: isActive ? '#106BB0' : 'transparent' }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    isActive ? "text-white shadow-md" : "text-slate-400 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  <step.icon className="w-4 h-4" />
                  <span className="font-bold text-xs uppercase tracking-wider">{step.name}</span>
                </button>
              )
            })}
          </nav>
          <div className="p-6 border-t border-slate-800">
            <button onClick={onClose} className="w-full flex items-center justify-center gap-2 py-3 border-2 border-slate-700 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all uppercase tracking-widest">
              <ArrowLeft className="w-4 h-4" /> Exit Wizard
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col bg-slate-50 h-full overflow-hidden relative">
          <header className="h-20 bg-white border-b border-slate-200 px-10 flex items-center justify-between shadow-sm shrink-0 z-10">
            <div className="flex items-center gap-4">
              <div 
                className="h-12 w-12 rounded-xl flex items-center justify-center text-white font-black text-xl shadow-md"
                style={{ background: 'linear-gradient(135deg, #106BB0 0%, #06A119 100%)' }}
              >
                {employee?.first_name?.[0] || "E"}
              </div>
              <div>
                <h2 className="text-xl font-black text-slate-900 leading-tight">
                  {employee?.first_name || "Unknown"} {employee?.last_name || "Employee"}
                </h2>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-0.5">
                  {employee?.title || "Team Member"} • {employee?.department || "Department"}
                </p>
              </div>
            </div>
            <button className="font-bold text-xs px-5 py-2 border-2 border-slate-300 text-slate-700 hover:bg-slate-100 rounded-lg flex items-center transition-all" onClick={() => handleSave(false)} disabled={loading}>
              <Save className="w-3.5 h-3.5 mr-2" /> {loading ? "SAVING..." : "SAVE DRAFT"}
            </button>
          </header>

          <main className="flex-1 overflow-y-auto p-8 sm:p-12">
            <div className="max-w-3xl mx-auto">
              
              {/* Step 1: Performance */}
              {activeTab === "performance" && (
                <div className="space-y-6">
                  <div className="text-white p-8 rounded-2xl shadow-sm" style={{ backgroundColor: '#106BB0' }}>
                    <h3 className="text-2xl font-black italic mb-2 tracking-tight">01 PERFORMANCE RATING</h3>
                    <p className="text-white/80 text-sm font-medium">Select the rating that best reflects the employee's output over the last 12 months.</p>
                  </div>
                  
                  <div className="space-y-3">
                    {performanceOptions.map((opt) => {
                      const isSelected = formData.performance_rating === opt.val;
                      return (
                        <button
                          key={opt.val}
                          onClick={() => setFormData({...formData, performance_rating: opt.val})}
                          style={{
                            backgroundColor: isSelected ? '#F0F7FF' : '#ffffff',
                            borderColor: isSelected ? '#106BB0' : '#e2e8f0',
                          }}
                          className="w-full text-left p-4 rounded-xl border-2 transition-all flex items-center gap-5 hover:shadow-md"
                        >
                          <div 
                            style={{
                              backgroundColor: isSelected ? '#106BB0' : '#f1f5f9',
                              color: isSelected ? '#ffffff' : '#64748b'
                            }}
                            className="w-12 h-12 shrink-0 rounded-lg flex items-center justify-center text-xl font-black shadow-sm transition-colors"
                          >
                            {opt.val}
                          </div>
                          <div>
                            <h4 style={{ color: isSelected ? '#0d4f85' : '#1e293b' }} className="text-base font-bold mb-0.5">
                              {opt.label}
                            </h4>
                            <p style={{ color: isSelected ? '#106BB0' : '#64748b' }} className="text-sm font-medium">
                              {opt.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 2: Potential */}
              {activeTab === "potential" && (
                <div className="space-y-6">
                  <div className="text-white p-8 rounded-2xl shadow-sm" style={{ backgroundColor: '#06A119' }}>
                    <h3 className="text-2xl font-black italic mb-2 tracking-tight">02 POTENTIAL CATEGORY</h3>
                    <p className="text-white/80 text-sm font-medium">Determine the growth trajectory and learning agility of the employee.</p>
                  </div>
                  
                  <div className="space-y-3">
                    {potentialOptions.map((opt) => {
                      const isSelected = formData.potential_category === opt.val;
                      return (
                        <button
                          key={opt.val}
                          onClick={() => setFormData({...formData, potential_category: opt.val})}
                          style={{
                            backgroundColor: isSelected ? '#F0FDF4' : '#ffffff',
                            borderColor: isSelected ? '#06A119' : '#e2e8f0',
                          }}
                          className="w-full text-left p-5 rounded-xl border-2 transition-all flex items-center gap-4 hover:shadow-md"
                        >
                          <div>
                            <h4 style={{ color: isSelected ? '#047011' : '#1e293b' }} className="text-lg font-bold mb-1">
                              {opt.val}
                            </h4>
                            <p style={{ color: isSelected ? '#06A119' : '#64748b' }} className="text-sm font-medium leading-relaxed">
                              {opt.desc}
                            </p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Step 3: Succession */}
              {activeTab === "succession" && (
                <div className="space-y-6">
                  <div className="text-white p-8 rounded-2xl shadow-sm" style={{ backgroundColor: '#f59e0b' }}>
                    <h3 className="text-2xl font-black italic mb-2 tracking-tight">03 SUCCESSION & RISK</h3>
                    <p className="text-white/90 text-sm font-medium">Assess flight risk and impact of loss to the business unit.</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-4">Flight Risk Level</label>
                      <div className="flex flex-col gap-3">
                        {["Low", "Medium", "High"].map(level => {
                          const isSelected = formData.flight_risk === level;
                          return (
                            <button
                              key={level}
                              onClick={() => setFormData({...formData, flight_risk: level})}
                              style={{
                                backgroundColor: isSelected ? '#FFFBEB' : '#f8fafc',
                                borderColor: isSelected ? '#f59e0b' : '#e2e8f0',
                                color: isSelected ? '#b45309' : '#64748b'
                              }}
                              className="w-full py-4 rounded-xl border-2 font-bold text-sm transition-all hover:shadow-sm"
                            >
                              {level} Risk
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <label className="text-xs font-bold uppercase tracking-widest text-slate-500 block mb-4">Impact of Loss</label>
                      <div className="flex flex-col gap-3">
                        {["Low", "Medium", "High"].map(level => {
                          const isSelected = formData.impact_of_loss === level;
                          return (
                            <button
                              key={level}
                              onClick={() => setFormData({...formData, impact_of_loss: level})}
                              style={{
                                backgroundColor: isSelected ? '#FFFBEB' : '#f8fafc',
                                borderColor: isSelected ? '#f59e0b' : '#e2e8f0',
                                color: isSelected ? '#b45309' : '#64748b'
                              }}
                              className="w-full py-4 rounded-xl border-2 font-bold text-sm transition-all hover:shadow-sm"
                            >
                              {level} Impact
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: 9-Box Matrix Preview */}
              {activeTab === "ninebox" && (
                <div className="space-y-6">
                  <div className="text-white p-8 rounded-2xl shadow-sm" style={{ backgroundColor: '#9333ea' }}>
                    <h3 className="text-2xl font-black italic mb-2 tracking-tight">04 TALENT MATRIX</h3>
                    <p className="text-white/90 text-sm font-medium">Calculated position based on Performance and Potential ratings.</p>
                  </div>
                  
                  <div className="bg-white border border-slate-200 p-12 rounded-3xl flex flex-col items-center text-center shadow-sm">
                    <div className="text-xs font-bold uppercase tracking-widest mb-6" style={{ color: '#9333ea' }}>Current Mapping Outcome</div>
                    <div className="text-4xl font-black text-slate-900 italic tracking-tight leading-none mb-6 uppercase">
                      {getNineBoxPosition()}
                    </div>
                    <div className="w-16 h-1 rounded-full mb-6" style={{ background: 'linear-gradient(90deg, #106BB0 0%, #9333ea 100%)' }}></div>
                    <p className="text-slate-600 text-sm max-w-sm leading-relaxed font-medium">
                      This employee will be flagged as a <span className="text-slate-900 font-black">"{getNineBoxPosition()}"</span> in the company-wide organizational effectiveness dashboard.
                    </p>
                  </div>
                </div>
              )}

              {/* Step 5: Finalize Tab */}
              {activeTab === "finalize" && (
                <div className="space-y-6">
                  <div className="text-white p-8 rounded-2xl shadow-sm" style={{ backgroundColor: '#0D1B2A' }}>
                    <h3 className="text-2xl font-black italic mb-2 tracking-tight">05 FINAL NOTES</h3>
                    <p className="text-white/70 text-sm font-medium">Summarize your feedback and developmental focus for this employee.</p>
                  </div>
                  
                  <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
                    <textarea 
                      rows={8} 
                      placeholder="Enter detailed narrative feedback here..." 
                      className="w-full bg-slate-50 text-slate-900 text-sm font-medium p-4 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 resize-none transition-all" 
                      style={{ outlineColor: '#106BB0' }}
                      value={formData.final_notes} 
                      onChange={(e) => setFormData({...formData, final_notes: e.target.value})} 
                    />
                  </div>
                </div>
              )}
            </div>
          </main>

          <footer className="bg-white border-t border-slate-200 px-10 py-5 flex items-center justify-between shrink-0 z-20 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
            {activeTab !== "performance" ? (
              <button 
                onClick={handleBack} 
                className="flex items-center text-slate-600 hover:text-slate-900 font-bold text-xs uppercase tracking-widest h-12 px-6 rounded-lg border-2 border-slate-300 transition-all bg-white hover:bg-slate-50"
              >
                <ArrowLeft className="mr-2 w-4 h-4" /> BACK
              </button>
            ) : <div />}

            {activeTab === "finalize" ? (
              <button 
                onClick={() => handleSave(true)}
                style={{ backgroundColor: '#06A119', color: '#ffffff' }}
                className="flex items-center font-bold text-xs uppercase tracking-widest h-12 px-8 rounded-lg shadow-md transition-all hover:scale-105 border-2 border-[#06A119]"
              >
                SUBMIT EVALUATION <CheckCircle2 className="ml-3 w-4 h-4" />
              </button>
            ) : (
              <button 
                onClick={handleNext}
                style={{ backgroundColor: '#0D1B2A', color: '#ffffff' }}
                className="flex items-center font-bold text-xs uppercase tracking-widest h-12 px-8 rounded-lg shadow-md transition-all hover:scale-105 border-2 border-[#0D1B2A]"
              >
                NEXT STEP <ChevronRight className="ml-2 w-4 h-4" />
              </button>
            )}
          </footer>
        </div>
      </div>
    </div>
  );
}