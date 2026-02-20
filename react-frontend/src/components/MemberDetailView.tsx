import { useState } from "react";
import { X, ArrowLeft, Mail, Download, TrendingUp, Award, Users, Briefcase, Target, ClipboardCheck } from "lucide-react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { SuccessionPlanModal } from "./SuccessionPlanModal";

interface MemberDetailViewProps {
  memberId: number;
  onClose: () => void;
}

export function MemberDetailView({ memberId, onClose }: MemberDetailViewProps) {
  const [showSuccessionModal, setShowSuccessionModal] = useState(false);
  // For now, we'll hardcode Alex Turner's data
  // In a real app, this would fetch based on memberId
  
  const memberData = {
    id: 1,
    name: "Alex Turner",
    role: "Content Strategist",
    tenure: "2022 to Present",
    initials: "AT",
    email: "alex.t@orgpath.com",
    phone: "+1 (555) 234-5679",
    
    // Status Badges
    readiness: "Ready Now",
    riskOfLoss: "Low",
    diverseHire: "Yes",
    criticalRole: "Yes",
    performance: "Exceeds Expectations",
    potential: "High Potential",
    
    // Roles in line for
    rolesInLineFor: [
      { title: "Content Marketing Manager", readiness: "Ready Now" },
    ],
    
    // Internal Experience
    internalExperience: [
      { title: "Content Strategist", department: "Marketing", years: "(2022-2023)" },
      { title: "Senior Content Writer", department: "Marketing", years: "(2020-2022)" },
      { title: "Content Writer", department: "Marketing", years: "(2019-2020)" },
    ],
    
    // External Experience
    externalExperience: [
      { title: "Content Manager", company: "Digital Growth Agency", years: "(2017-2019)" },
      { title: "Copywriter", company: "Creative Solutions Inc", years: "(2015-2017)" },
    ],
    
    // Top Capabilities
    topCapabilities: [
      "Reasons Critically & Solves Problems",
      "Manages Risk",
      "Moves Data to Action",
      "Embraces Diversity",
      "Takes Ownership",
      "Develops Talent"
    ],
    capabilityScore: 89,
    
    // Feedback
    feedback: [
      {
        from: "Michael Chen",
        avatar: "MC",
        comment: "Alex is an exceptional content strategist, consistently delivering high-quality work and mentoring junior team members effectively."
      },
      {
        from: "Sarah Johnson",
        avatar: "SJ",
        comment: "Alex knows how to translate complex ideas into engaging content and always meets deadlines with excellent results."
      },
      {
        from: "Critical Role",
        avatar: "CR",
        comment: "Alex has been a key player in our content transformation. Their strategic thinking has helped elevate our brand messaging significantly."
      }
    ],
    
    sentimentAnalysis: 95,
    
    assessmentsCompleted: 2,
    assessments: [
      {
        type: "OrgInsights Assessment",
        date: "2025-10-21",
        overall: 78,
        leadership: 72,
        communication: 82,
        adaptability: 80,
        collaboration: 76,
      },
      {
        type: "360 Assessment",
        date: "2025-09-15",
        overall: 80,
        leadership: 75,
        communication: 84,
        adaptability: 81,
        collaboration: 78,
      },
    ],
    
    feedbackSummary: "Alex is an outstanding content strategist who has demonstrated exceptional leadership and technical skills. They have been instrumental in developing our content strategy and have shown great ability to mentor team members. Alex is ready for the next level of responsibility and would excel in a management role.",
    
    // Performance History
    performanceHistory: [
      { year: "FY 2025", rating: "Exceed Expectations" },
      { year: "FY 2024", rating: "Exceed Expectations" },
      { year: "FY 2023", rating: "Exceed Expectations" },
      { year: "FY 2022", rating: "Exceed Expectations" },
    ],
    
    // Potential History
    potentialHistory: [
      { year: "FY 2025", rating: "Exceed Expectations" },
      { year: "FY 2024", rating: "Exceed Expectations" },
      { year: "FY 2023", rating: "Exceed Expectations" },
      { year: "FY 2022", rating: "Exceed Expectations" },
    ],
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-sm z-50 overflow-y-auto animate-in fade-in duration-300">
      <div className="min-h-screen p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header with Close Button */}
          <div className="flex items-center justify-between mb-6 animate-in slide-in-from-top duration-500">
            <div className="flex gap-3">
              <Button
                variant="outline"
                onClick={onClose}
                className="bg-white hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Team Members
              </Button>
              <Button
                variant="outline"
                className="bg-white border-blue-200 text-[#106BB0] hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg"
                onClick={() => console.log("Downloading detailed report...")}
              >
                <Download className="w-4 h-4 mr-2" />
                Download Performance Report
              </Button>
            </div>
            <Button
              variant="ghost"
              onClick={onClose}
              className="bg-white hover:bg-red-50 hover:text-red-600 transition-all duration-300 hover:scale-105 shadow-lg"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>

          {/* Main Content */}
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden animate-in slide-in-from-bottom duration-700">
            {/* Profile Header Section */}
            <div className="bg-gradient-to-br from-[#106BB0]/5 via-[#F8FAFC] to-[#06A119]/5 p-8 relative overflow-hidden border-b border-slate-200/60">
              <div className="relative flex flex-col md:flex-row items-start md:items-center gap-6">
                <div className="group">
                  <Avatar className="w-36 h-36 border-4 border-white shadow-xl transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3">
                    <AvatarFallback className="text-5xl bg-[#1B8784] text-white">
                      {memberData.initials}
                    </AvatarFallback>
                  </Avatar>
                </div>
                
                <div className="flex-1 text-slate-900">
                  <div className="flex justify-between items-start">
                    <div>
                      <h1 className="text-4xl font-bold mb-2 animate-in slide-in-from-left duration-700">{memberData.name}</h1>
                      <p className="text-2xl mb-2 text-slate-600 animate-in slide-in-from-left duration-700 delay-100">{memberData.role}</p>
                      <p className="text-sm text-slate-500 animate-in slide-in-from-left duration-700 delay-200">({memberData.tenure})</p>
                    </div>
                    <div className="text-right animate-in slide-in-from-right duration-700">
                      <div className="text-sm text-slate-500 font-medium mb-1">Assessments Completed</div>
                      <div className="text-4xl font-bold text-[#06A119]">{memberData.assessmentsCompleted}</div>
                    </div>
                  </div>
                  
                  {/* Contact Info */}
                  <div className="flex flex-wrap gap-4 mt-4 animate-in slide-in-from-left duration-700 delay-300">
                    <div className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-full hover:bg-slate-50 transition-all duration-300 shadow-sm">
                      <Mail className="w-4 h-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-700">{memberData.email}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Badges */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-8 relative animate-in slide-in-from-bottom duration-700 delay-400">
                <div className="bg-white rounded-xl p-4 text-center border border-slate-200 hover:border-[#106BB0]/30 hover:shadow-md hover:scale-105 transition-all duration-300 group">
                  <div className="text-[10px] font-bold mb-1 text-slate-400 uppercase tracking-widest">Readiness</div>
                  <div className="text-sm font-bold text-slate-900 group-hover:scale-110 transition-transform duration-300">{memberData.readiness}</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-slate-200 hover:border-[#106BB0]/30 hover:shadow-md hover:scale-105 transition-all duration-300 group">
                  <div className="text-[10px] font-bold mb-1 text-slate-400 uppercase tracking-widest">Risk of Loss</div>
                  <div className="text-sm font-bold text-slate-900 group-hover:scale-110 transition-transform duration-300">{memberData.riskOfLoss}</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-slate-200 hover:border-[#106BB0]/30 hover:shadow-md hover:scale-105 transition-all duration-300 group">
                  <div className="text-[10px] font-bold mb-1 text-slate-400 uppercase tracking-widest">Diverse Hire</div>
                  <div className="text-sm font-bold text-slate-900 group-hover:scale-110 transition-transform duration-300">{memberData.diverseHire}</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-slate-200 hover:border-[#106BB0]/30 hover:shadow-md hover:scale-105 transition-all duration-300 group">
                  <div className="text-[10px] font-bold mb-1 text-slate-400 uppercase tracking-widest">Critical Role</div>
                  <div className="text-sm font-bold text-slate-900 group-hover:scale-110 transition-transform duration-300">{memberData.criticalRole}</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-slate-200 hover:border-[#106BB0]/30 hover:shadow-md hover:scale-105 transition-all duration-300 group">
                  <div className="text-[10px] font-bold mb-1 text-slate-400 uppercase tracking-widest">Performance</div>
                  <div className="text-sm font-bold text-slate-900 group-hover:scale-110 transition-transform duration-300">Exceeds</div>
                </div>
                <div className="bg-white rounded-xl p-4 text-center border border-slate-200 hover:border-[#106BB0]/30 hover:shadow-md hover:scale-105 transition-all duration-300 group">
                  <div className="text-[10px] font-bold mb-1 text-slate-400 uppercase tracking-widest">Potential</div>
                  <div className="text-sm font-bold text-slate-900 group-hover:scale-110 transition-transform duration-300">{memberData.potential}</div>
                </div>
              </div>
            </div>

            {/* Main Grid Layout */}
            <div className="p-8">
              {/* Detailed Assessments Section */}
              <div className="mb-8 space-y-6 bg-gradient-to-br from-[#106BB0]/5 to-[#06A119]/5 p-6 rounded-2xl border border-slate-200/60 shadow-sm">
                <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2 mb-4">
                  <ClipboardCheck className="w-6 h-6 text-[#1B8784]" />
                  Assessment Details
                </h3>
                {memberData.assessments.map((assessment, idx) => (
                  <Card key={idx} className="border-2 border-white bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                        <div>
                          <h4 className="text-xl font-bold text-slate-900">{assessment.type}</h4>
                          <p className="text-sm text-slate-500 font-medium">Completed: {assessment.date}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Overall Score</div>
                          <div className="text-4xl font-bold text-[#06A119]">{assessment.overall}%</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {/* Leadership */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm font-bold text-slate-700">
                            <span>Leadership</span>
                            <span>{assessment.leadership}%</span>
                          </div>
                          <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#06A119] rounded-full transition-all duration-1000"
                              style={{ width: `${assessment.leadership}%` }}
                            />
                          </div>
                        </div>

                        {/* Communication */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm font-bold text-slate-700">
                            <span>Communication</span>
                            <span>{assessment.communication}%</span>
                          </div>
                          <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#06A119] rounded-full transition-all duration-1000"
                              style={{ width: `${assessment.communication}%` }}
                            />
                          </div>
                        </div>

                        {/* Adaptability */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm font-bold text-slate-700">
                            <span>Adaptability</span>
                            <span>{assessment.adaptability}%</span>
                          </div>
                          <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#06A119] rounded-full transition-all duration-1000"
                              style={{ width: `${assessment.adaptability}%` }}
                            />
                          </div>
                        </div>

                        {/* Collaboration */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center text-sm font-bold text-slate-700">
                            <span>Collaboration</span>
                            <span>{assessment.collaboration}%</span>
                          </div>
                          <div className="h-2.5 w-full bg-slate-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#06A119] rounded-full transition-all duration-1000"
                              style={{ width: `${assessment.collaboration}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column */}
                <div className="space-y-6">
                  {/* Roles in line for */}
                  <Card className="border-2 border-gray-200 hover:border-[#06A119] hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-in slide-in-from-left duration-700 delay-500 group">
                    <CardHeader className="pb-3 bg-gradient-to-r from-transparent to-transparent group-hover:from-[#06A119]/5 group-hover:to-[#1B8784]/5 transition-all duration-500">
                      <div className="flex items-center gap-2">
                        <Target className="w-5 h-5 text-[#1B8784] group-hover:scale-110 transition-transform duration-300" />
                        <CardTitle className="text-[#1B8784] border-b-2 border-[#06A119] pb-2 inline-block group-hover:text-[#06A119] transition-colors duration-300">
                          Roles in line for
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      {memberData.rolesInLineFor.map((role, idx) => (
                        <div 
                          key={idx} 
                          className="border-2 border-gray-300 rounded-xl p-5 flex items-center justify-between hover:border-[#06A119] hover:shadow-lg transition-all duration-300 hover:bg-gradient-to-r hover:from-[#06A119]/5 hover:to-transparent group/role"
                        >
                          <span className="font-bold text-gray-800">{role.title}</span>
                          <span 
                            className="bg-[#06A119]/10 text-[#06A119] border border-[#06A119]/20 px-6 py-2 rounded-lg font-bold shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 cursor-pointer"
                            onClick={() => role.readiness === "Ready Now" && setShowSuccessionModal(true)}
                          >
                            {role.readiness}
                          </span>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {showSuccessionModal && (
                    <SuccessionPlanModal 
                      onClose={() => setShowSuccessionModal(false)} 
                      roleTitle="Content Marketing Manager"
                    />
                  )}

                  {/* Employee Feedback Section - Combined */}
                  <Card className="border-2 border-gray-200 hover:border-[#1B8784] hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-in slide-in-from-left duration-700 delay-600 group">
                    <CardHeader className="pb-3 bg-gradient-to-r from-transparent to-transparent group-hover:from-[#1B8784]/5 group-hover:to-[#06A119]/5 transition-all duration-500">
                      <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-[#1B8784] group-hover:scale-110 transition-transform duration-300" />
                        <CardTitle className="text-[#1B8784] border-b-2 border-[#1B8784] pb-2 inline-block group-hover:text-[#06A119] transition-colors duration-300">
                          Employee Feedback
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* Individual Feedback Items */}
                      <div className="space-y-3">
                        {memberData.feedback.map((item, idx) => (
                          <div key={idx} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-4 border border-gray-200 hover:border-[#1B8784] hover:shadow-lg hover:from-[#1B8784]/5 hover:to-white transition-all duration-300 hover:scale-[1.02]">
                            <div className="flex items-start gap-3">
                              <Avatar className="w-10 h-10 transition-transform duration-300 hover:scale-110">
                                <AvatarFallback className="bg-gradient-to-br from-[#1B8784] to-[#06A119] text-white text-sm">
                                  {item.avatar}
                                </AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <div className="font-bold mb-1 text-gray-900">{item.from}</div>
                                <div className="text-sm text-gray-700 leading-relaxed">{item.comment}</div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Sentiment Analysis Section */}
                      <div className="pt-4 border-t-2 border-gray-200">
                        <h3 className="text-[#1B8784] font-bold mb-3 flex items-center gap-2">
                          <TrendingUp className="w-5 h-5" />
                          Sentiment Analysis
                        </h3>
                        <div className="bg-gradient-to-r from-[#06A119]/10 to-[#106BB0]/10 border border-[#1B8784]/20 h-14 rounded-xl flex items-center justify-center text-[#1B8784] font-bold text-xl mb-4 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02]">
                          {memberData.sentimentAnalysis}% Positive
                        </div>
                      </div>

                      {/* Feedback Summary Section */}
                      <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-5 border border-gray-200 hover:border-[#1B8784] hover:shadow-lg transition-all duration-300 hover:scale-[1.01]">
                        <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                          <Award className="w-5 h-5 text-[#1B8784]" />
                          Feedback Summary
                        </h3>
                        <p className="text-sm text-gray-700 leading-relaxed">{memberData.feedbackSummary}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                  {/* Internal Experience */}
                  <Card className="border-2 border-gray-200 hover:border-[#1B8784] hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-in slide-in-from-right duration-700 delay-500 group">
                    <CardHeader className="pb-3 bg-gradient-to-r from-transparent to-transparent group-hover:from-[#1B8784]/5 group-hover:to-[#06A119]/5 transition-all duration-500">
                      <div className="flex items-center gap-2">
                        <Briefcase className="w-5 h-5 text-[#1B8784] group-hover:scale-110 transition-transform duration-300" />
                        <CardTitle className="text-[#1B8784] border-b-2 border-[#1B8784] pb-2 inline-block group-hover:text-[#06A119] transition-colors duration-300">
                          Internal Experience
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {memberData.internalExperience.map((exp, idx) => (
                        <div key={idx} className="flex justify-between items-start py-3 border-b border-gray-200 hover:bg-gradient-to-r hover:from-[#1B8784]/5 hover:to-transparent hover:border-[#1B8784] transition-all duration-300 px-2 rounded-lg">
                          <div>
                            <div className="font-bold text-gray-900">{exp.title}</div>
                            <div className="text-sm text-gray-600">{exp.department}</div>
                          </div>
                          <div className="text-sm font-semibold text-[#1B8784]">{exp.years}</div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Top Capabilities */}
                  <Card className="border-2 border-gray-200 hover:border-[#06A119] hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-in slide-in-from-right duration-700 delay-700 group">
                    <CardHeader className="pb-3 bg-gradient-to-r from-transparent to-transparent group-hover:from-[#06A119]/5 group-hover:to-[#1B8784]/5 transition-all duration-500">
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-[#1B8784] group-hover:scale-110 transition-transform duration-300" />
                        <CardTitle className="text-[#1B8784] border-b-2 border-[#1B8784] pb-2 inline-block group-hover:text-[#06A119] transition-colors duration-300">
                          Top Capabilities:
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-start justify-between gap-6">
                        <div className="flex-1 grid grid-cols-1 gap-3">
                          {memberData.topCapabilities.map((capability, idx) => (
                            <div 
                              key={idx} 
                              className="bg-gradient-to-br from-[#06A119]/5 to-[#106BB0]/5 text-[#1B8784] border border-[#1B8784]/20 px-6 py-3 rounded-full font-semibold text-center shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105 hover:bg-white"
                            >
                              {capability}
                            </div>
                          ))}
                        </div>
                        <div className="flex-shrink-0">
                          <div className="relative w-32 h-32 group/score">
                            <svg className="w-full h-full transform -rotate-90">
                              <circle cx="64" cy="64" r="56" fill="none" stroke="#e5e7eb" strokeWidth="12"/>
                              <circle 
                                cx="64" 
                                cy="64" 
                                r="56" 
                                fill="none" 
                                stroke="url(#gradient)" 
                                strokeWidth="12" 
                                strokeDasharray="351.68" 
                                strokeDashoffset={351.68 * (1 - memberData.capabilityScore / 100)}
                                strokeLinecap="round"
                                className="transition-all duration-1000"
                              />
                              <defs>
                                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                  <stop offset="0%" stopColor="#1B8784" />
                                  <stop offset="100%" stopColor="#06A119" />
                                </linearGradient>
                              </defs>
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center transition-transform duration-300 group-hover/score:scale-110">
                              <div className="text-xs font-bold text-gray-600 mb-1">Capability</div>
                              <div className="text-xs font-bold text-gray-600">Score</div>
                              <div className="text-3xl font-bold bg-gradient-to-r from-[#1B8784] to-[#06A119] bg-clip-text text-transparent mt-1">{memberData.capabilityScore}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Performance & Potential History */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Performance History */}
                <Card className="border-2 border-gray-200 hover:border-[#06A119] hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-in slide-in-from-bottom duration-700 delay-800 group">
                  <CardHeader className="pb-3 bg-gradient-to-r from-transparent to-transparent group-hover:from-[#06A119]/5 group-hover:to-[#1B8784]/5 transition-all duration-500">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-[#06A119] group-hover:scale-110 transition-transform duration-300" />
                      <CardTitle className="text-[#06A119] border-b-2 border-[#06A119] pb-2 inline-block group-hover:text-[#1B8784] transition-colors duration-300">
                        Performance History
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {memberData.performanceHistory.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between hover:bg-gray-50 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                        <span className="font-bold text-gray-900">{item.year}</span>
                        <span className="bg-[#06A119]/10 text-[#06A119] border border-[#06A119]/20 px-6 py-2 rounded-lg font-bold shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                          {item.rating}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Potential History */}
                <Card className="border-2 border-gray-200 hover:border-[#106BB0] hover:shadow-2xl transition-all duration-500 hover:scale-[1.02] animate-in slide-in-from-bottom duration-700 delay-900 group">
                  <CardHeader className="pb-3 bg-gradient-to-r from-transparent to-transparent group-hover:from-[#106BB0]/5 group-hover:to-[#1B8784]/5 transition-all duration-500">
                    <div className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-[#106BB0] group-hover:scale-110 transition-transform duration-300" />
                      <CardTitle className="text-[#106BB0] border-b-2 border-[#106BB0] pb-2 inline-block group-hover:text-[#1B8784] transition-colors duration-300">
                        Potential History
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {memberData.potentialHistory.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between hover:bg-gray-50 p-3 rounded-lg transition-all duration-300 hover:shadow-md hover:scale-[1.02]">
                        <span className="font-bold text-gray-900">{item.year}</span>
                        <span className="bg-[#106BB0]/10 text-[#106BB0] border border-[#106BB0]/20 px-6 py-2 rounded-lg font-bold shadow-sm hover:shadow-md transition-all duration-300 hover:scale-105">
                          {item.rating}
                        </span>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
