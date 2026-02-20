import { Users, TrendingUp, Award, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

interface TeamOverviewSectionProps {
  teamInfo: {
    memberCount: number;
    healthScore: number;
    color: string;
  };
  teamMetrics: {
    avgOverallScore: number;
    completionRate: number;
  };
}

export function TeamOverviewSection({ teamInfo, teamMetrics }: TeamOverviewSectionProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="border-2">
        <CardHeader className="pb-3">
          <CardDescription>Team Size</CardDescription>
          <CardTitle className="text-3xl" style={{ color: teamInfo.color }}>
            {teamInfo.memberCount}
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
            {teamInfo.healthScore}%
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
            {teamMetrics.avgOverallScore}%
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
            {teamMetrics.completionRate}%
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
  );
}
