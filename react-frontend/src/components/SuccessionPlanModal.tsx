import { motion, AnimatePresence } from "motion/react";
import { X, ArrowLeft, CheckCircle2, Award, Briefcase, Users, TrendingUp, Calendar, AlertCircle } from "lucide-react";
import { Button } from "./ui/button";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Card, CardContent } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import akeelImg from 'figma:asset/f91fa6344c1073754b0fe384b1be2c371328fd0f.png';

interface SuccessionPlanModalProps {
  onClose: () => void;
  roleTitle: string;
}

export function SuccessionPlanModal({ onClose, roleTitle }: SuccessionPlanModalProps) {
  const successors = [
    {
      name: "Lisa Hutchinson",
      currentRole: "Director of Marketing Operations",
      readiness: "Ready Now",
      score: 94,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&auto=format&fit=crop",
      diverse: true,
      strengths: ["Strategic Vision", "Team Leadership", "Data Analysis"],
      internalExp: [
        { title: "Head of Digital Marketing", years: "2021-2023" },
        { title: "Senior Marketing Manager", years: "2018-2021" }
      ],
      externalExp: [
        { title: "Marketing Director", company: "Growth Co", years: "2015-2018" },
        { title: "Brand Strategist", company: "Creative Agency", years: "2012-2015" }
      ]
    },
    {
      name: "Marcus Sterling",
      currentRole: "Senior Content Lead",
      readiness: "Ready 1-2 Years",
      score: 82,
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&auto=format&fit=crop",
      diverse: false,
      strengths: ["Content Strategy", "Brand Voice", "Creative Direction"],
      internalExp: [
        { title: "Content Strategist", years: "2022-Present" },
        { title: "Senior Copywriter", years: "2020-2022" }
      ],
      externalExp: [
        { title: "Content Manager", company: "Digital Hub", years: "2017-2020" },
        { title: "Writer", company: "Freelance", years: "2015-2017" }
      ]
    },
    {
      name: "Sarah Jenkins",
      currentRole: "Digital Strategy Manager",
      readiness: "Ready Now",
      score: 89,
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&auto=format&fit=crop",
      diverse: true,
      strengths: ["Project Management", "Stakeholder Relations", "Innovation"],
      internalExp: [
        { title: "Digital Product Manager", years: "2021-2023" },
        { title: "Strategy Analyst", years: "2019-2021" }
      ],
      externalExp: [
        { title: "Tech Consultant", company: "Solutions Ltd", years: "2016-2019" },
        { title: "Junior Analyst", company: "Global Firm", years: "2014-2016" }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-6xl max-h-[95vh] overflow-hidden rounded-[2.5rem] shadow-2xl flex flex-col border border-slate-200">
        
        {/* Header */}
        <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-white">
          <div className="flex items-center gap-6">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onClose}
              className="text-slate-600 hover:text-slate-900 border-slate-200 rounded-xl px-4 py-5 hover:bg-slate-50 transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 tracking-tight">Succession Planning</h2>
              <p className="text-sm text-slate-500 font-medium">{roleTitle}</p>
            </div>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onClose}
            className="rounded-full text-slate-400 hover:text-red-500 hover:bg-red-50"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-10 space-y-12">
          
          {/* Primary Target Card - Replicating screenshot layout */}
          <div className="bg-[#F8FAFC] p-10 rounded-[2.5rem] border border-slate-200/60 shadow-sm">
            <div className="flex flex-col md:flex-row gap-10 items-center">
              <div className="relative">
                <motion.div 
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ 
                    duration: 0.8, 
                    ease: "easeOut"
                  }}
                  className="w-44 h-44 rounded-full overflow-hidden border-4 border-white shadow-2xl bg-white flex items-center justify-center"
                >
                  <ImageWithFallback 
                    src={akeelImg} 
                    alt="Akeel Mohamed"
                    className="w-full h-full object-cover"
                  />
                </motion.div>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.6, type: "spring" }}
                  className="absolute -bottom-2 -right-2 bg-[#106BB0] text-white p-3 rounded-full shadow-xl border-4 border-white z-10"
                >
                  <Briefcase className="w-5 h-5" />
                </motion.div>
              </div>
              
              <div className="flex-1 text-center md:text-left space-y-6">
                <div>
                  <h3 className="text-4xl font-extrabold text-[#0D1B2A] mb-1 tracking-tight">Akeel Mohamed</h3>
                  <p className="text-xl text-slate-500 font-medium">Founder / CEO (Current Role Holder)</p>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 flex flex-col items-center md:items-start min-w-[160px] shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <AlertCircle className="w-3 h-3 text-orange-500" />
                      Risk of leaving
                    </span>
                    <span className="text-sm font-bold text-orange-600 uppercase">Medium</span>
                  </div>
                  
                  <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 flex flex-col items-center md:items-start min-w-[160px] shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-[#106BB0]" />
                      Est. Retirement
                    </span>
                    <span className="text-sm font-bold text-slate-900 uppercase">2030</span>
                  </div>

                  <div className="bg-white px-6 py-4 rounded-2xl border border-slate-200 flex flex-col items-center md:items-start min-w-[160px] shadow-sm hover:shadow-md transition-shadow">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-[#06A119]" />
                      Ready Successor
                    </span>
                    <span className="text-sm font-bold text-[#06A119] uppercase">High</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Identified Successors Section */}
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <h4 className="text-xl font-bold text-slate-900 flex items-center gap-3">
                <Users className="w-6 h-6 text-[#1B8784]" />
                Identified Successors
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {successors.map((s, idx) => (
                <Card key={idx} className="group overflow-hidden border-2 border-slate-100 hover:border-[#106BB0]/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 bg-white rounded-[2.5rem] flex flex-col h-full">
                  <CardContent className="p-0 flex flex-col h-full">
                    <div className="p-8 text-center border-b border-slate-50 relative bg-gradient-to-b from-slate-50/50 to-white">
                      <div className="mb-6 relative inline-block">
                        <Avatar className="w-24 h-24 border-4 border-white shadow-xl group-hover:scale-110 transition-transform duration-500 rounded-3xl overflow-hidden">
                          <ImageWithFallback src={s.image} alt={s.name} />
                          <AvatarFallback className="bg-slate-100 text-slate-400">{s.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        {s.diverse && (
                          <div className="absolute -top-2 -right-2 bg-emerald-500 text-white p-1.5 rounded-full border-4 border-white shadow-lg">
                            <CheckCircle2 className="w-3 h-3" />
                          </div>
                        )}
                      </div>
                      <h5 className="font-extrabold text-[#0D1B2A] text-xl mb-1">{s.name}</h5>
                      <p className="text-sm text-slate-500 font-medium mb-4 line-clamp-1">{s.currentRole}</p>
                      
                      <div className="flex items-center justify-center">
                        <span className={`text-[10px] font-black uppercase tracking-widest px-4 py-2 rounded-xl border shadow-sm ${
                          s.readiness === 'Ready Now' 
                          ? 'bg-emerald-50 border-emerald-100 text-emerald-700' 
                          : 'bg-blue-50 border-blue-100 text-blue-700'
                        }`}>
                          {s.readiness}
                        </span>
                      </div>
                    </div>

                    <div className="p-8 flex-1 space-y-8">
                      {/* Experience Sections */}
                      <div className="grid grid-cols-1 gap-6">
                        <div>
                          <div className="text-[10px] font-black text-[#06A119] uppercase tracking-widest mb-3 flex items-center gap-2">
                            <div className="w-1 h-3 bg-[#06A119] rounded-full" />
                            Internal Experience
                          </div>
                          <div className="space-y-3">
                            {s.internalExp.map((exp, i) => (
                              <div key={i} className="flex justify-between items-start text-xs">
                                <span className="font-bold text-slate-700 max-w-[140px] leading-tight">{exp.title}</span>
                                <span className="text-slate-400 font-medium shrink-0 ml-2">{exp.years}</span>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <div className="text-[10px] font-black text-[#106BB0] uppercase tracking-widest mb-3 flex items-center gap-2">
                            <div className="w-1 h-3 bg-[#106BB0] rounded-full" />
                            External Experience
                          </div>
                          <div className="space-y-3">
                            {s.externalExp.map((exp, i) => (
                              <div key={i} className="flex flex-col gap-0.5 text-xs">
                                <div className="flex justify-between items-start">
                                  <span className="font-bold text-slate-700 leading-tight">{exp.title}</span>
                                  <span className="text-slate-400 font-medium shrink-0 ml-2">{exp.years}</span>
                                </div>
                                <span className="text-[10px] text-slate-400 font-bold uppercase">{exp.company}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Strengths */}
                      <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Key Strengths</p>
                        <div className="flex flex-wrap gap-2">
                          {s.strengths.map((str, i) => (
                            <span key={i} className="text-[10px] font-bold bg-slate-50 text-slate-600 px-3 py-1.5 rounded-xl border border-slate-100 shadow-sm">
                              {str}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Score Block */}
                    <div className="px-8 pb-8 flex items-center justify-end gap-3 mt-auto">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Score</span>
                      <div className="w-14 h-14 rounded-2xl bg-[#0D1B2A] flex items-center justify-center text-white text-xl font-black italic shadow-xl group-hover:scale-110 transition-transform">
                        {s.score}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-10 py-8 bg-slate-50 border-t border-slate-100 flex justify-end gap-4">
          <Button variant="outline" onClick={onClose} className="rounded-2xl border-slate-200 text-slate-600 hover:bg-white hover:text-slate-900 shadow-sm py-6 px-8">
            Close Panel
          </Button>
          <Button className="rounded-2xl bg-[#106BB0] hover:bg-[#0d5992] text-white shadow-xl shadow-blue-900/10 px-10 py-6 font-bold">
            Initiate Transition Plan
          </Button>
        </div>

      </div>
    </div>
  );
}
