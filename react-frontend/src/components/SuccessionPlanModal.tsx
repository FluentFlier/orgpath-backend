import { useState } from "react";
import { 
  X, Target, UserPlus, Calendar, TrendingUp, 
  Briefcase, BookOpen, Save, ShieldAlert
} from "lucide-react";
import { toast } from "sonner";

interface SuccessionPlanModalProps {
  onClose: () => void;
  roleTitle: string;
}

export function SuccessionPlanModal({ onClose, roleTitle }: SuccessionPlanModalProps) {
  const [loading, setLoading] = useState(false);
  
  // State mapping exactly to the sponsor's 'Succession Table Fields.csv'
  const [formData, setFormData] = useState({
    targetRole: roleTitle,
    incumbentName: "Sarah Jenkins", // The person currently in the target role
    targetDate: "Q3 2026",
    readinessLevel: "Ready Now",
    skillGaps: "Needs additional exposure to cross-functional P&L management and international compliance regulations before fully transitioning.",
    assignedMentor: "Arthur Gabster"
  });

  const handleSave = async () => {
    setLoading(true);
    // Simulate API delay
    setTimeout(() => {
      setLoading(false);
      toast.success("Succession Plan officially logged to enterprise matrix!");
      onClose();
    }, 800);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[110] flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-300">
      
      {/* Modal Container */}
      <div className="bg-white w-full max-w-3xl max-h-full rounded-[32px] shadow-2xl flex flex-col overflow-hidden border border-slate-200 animate-in zoom-in-95 duration-500">
        
        {/* Header */}
        <header className="bg-slate-900 text-white p-8 relative overflow-hidden shrink-0">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#106BB0]/20 rounded-full blur-3xl -mr-20 -mt-20 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#06A119]/20 rounded-full blur-3xl -ml-20 -mb-20 pointer-events-none"></div>
          
          <div className="relative z-10 flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#106BB0] to-[#1B8784] flex items-center justify-center shadow-lg border border-white/10">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div>
                <div className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-1">Talent Pipeline</div>
                <h2 className="text-2xl font-black tracking-tight leading-none mb-1">Succession Planning</h2>
                <p className="text-slate-400 text-sm font-medium">Map target roles and development timelines.</p>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-10 h-10 bg-white/10 hover:bg-red-500/80 rounded-full flex items-center justify-center transition-colors text-slate-300 hover:text-white backdrop-blur-md"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Scrollable Form Body */}
        <div className="flex-1 overflow-y-auto p-8 bg-slate-50">
          <div className="space-y-8">
            
            {/* Target Role Section */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#106BB0] flex items-center gap-2 border-b border-slate-100 pb-4">
                <Briefcase className="w-4 h-4" /> Role Identification
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Target Role Name</label>
                  <input 
                    type="text"
                    value={formData.targetRole}
                    onChange={(e) => setFormData({...formData, targetRole: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#106BB0]/20 focus:border-[#106BB0] transition-all"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Current Incumbent</label>
                  <div className="relative">
                    <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text"
                      value={formData.incumbentName}
                      onChange={(e) => setFormData({...formData, incumbentName: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#106BB0]/20 focus:border-[#106BB0] transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline & Readiness */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#06A119] flex items-center gap-2 border-b border-slate-100 pb-4">
                <TrendingUp className="w-4 h-4" /> Timeline & Readiness
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Target Readiness Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                      type="text"
                      placeholder="e.g., Q4 2025"
                      value={formData.targetDate}
                      onChange={(e) => setFormData({...formData, targetDate: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold pl-10 pr-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06A119]/20 focus:border-[#06A119] transition-all"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Current Readiness Level</label>
                  <select 
                    value={formData.readinessLevel}
                    onChange={(e) => setFormData({...formData, readinessLevel: e.target.value})}
                    className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#06A119]/20 focus:border-[#06A119] transition-all appearance-none cursor-pointer"
                  >
                    <option value="Ready Now">Ready Now</option>
                    <option value="Ready 1-2 Years">Ready 1-2 Years</option>
                    <option value="Ready 3-5 Years">Ready 3-5 Years</option>
                    <option value="Emergency Backup Only">Emergency Backup Only</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Development Plan */}
            <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-sm font-black uppercase tracking-widest text-[#1B8784] flex items-center gap-2 border-b border-slate-100 pb-4">
                <BookOpen className="w-4 h-4" /> Action Plan
              </h3>
              
              <div>
                <label className="text-xs font-bold uppercase text-slate-500 block mb-2 flex items-center gap-2">
                  Identified Skill Gaps <ShieldAlert className="w-3 h-3 text-amber-500" />
                </label>
                <textarea 
                  rows={4}
                  value={formData.skillGaps}
                  onChange={(e) => setFormData({...formData, skillGaps: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B8784]/20 focus:border-[#1B8784] transition-all resize-none leading-relaxed"
                  placeholder="Describe the experiences or skills needed to close the gap..."
                />
              </div>

              <div>
                <label className="text-xs font-bold uppercase text-slate-500 block mb-2">Assigned Executive Mentor</label>
                <input 
                  type="text"
                  value={formData.assignedMentor}
                  onChange={(e) => setFormData({...formData, assignedMentor: e.target.value})}
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-bold px-4 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1B8784]/20 focus:border-[#1B8784] transition-all"
                />
              </div>
            </div>

          </div>
        </div>

        {/* Footer Actions */}
        <footer className="bg-white border-t border-slate-200 p-6 flex justify-end gap-4 shrink-0">
          <button 
            onClick={onClose}
            className="px-6 py-3 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-100 transition-colors uppercase tracking-widest"
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            disabled={loading}
            className="px-8 py-3 rounded-xl text-sm font-bold text-white bg-[#06A119] hover:bg-[#058a15] shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 flex items-center gap-2 uppercase tracking-widest disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {loading ? "Saving..." : "Save Succession Plan"} <Save className="w-4 h-4" />
          </button>
        </footer>

      </div>
    </div>
  );
}