import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Building2, Users, User } from "lucide-react";

export function RoleGuide() {
  return (
    <div className="max-w-4xl mx-auto p-8 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Access Your Dashboard</h2>
        <p className="text-gray-600">Choose your role during login to access the appropriate dashboard</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <CardTitle>Company Manager</CardTitle>
            <CardDescription>Highest level access</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• View all teams</li>
              <li>• Company-wide analytics</li>
              <li>• All employee assessments</li>
              <li>• Organizational metrics</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-2 border-green-300 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <CardTitle style={{ color: "#06A119" }}>Team Lead</CardTitle>
            <CardDescription>Team management access</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• View your team members</li>
              <li>• Team assessment scores</li>
              <li>• Team performance metrics</li>
              <li>• Project tracking</li>
            </ul>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-purple-600" />
            </div>
            <CardTitle>Employee</CardTitle>
            <CardDescription>Individual access</CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• Personal assessments</li>
              <li>• Individual metrics</li>
              <li>• Development plans</li>
              <li>• Team overview</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-green-50">
        <CardHeader>
          <CardTitle>How to Access Team Lead Dashboard</CardTitle>
        </CardHeader>
        <CardContent>
          <ol className="space-y-3 text-gray-700">
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">1</span>
              <span>Click "Get Started" from the landing page</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">2</span>
              <span>Go to the "Login" tab</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm">3</span>
              <span>Enter any username and password (demo mode)</span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm">4</span>
              <span><strong>Select "Team Lead" from the "Login As" dropdown</strong></span>
            </li>
            <li className="flex gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm">5</span>
              <span>Click "Login" to access the Team Lead Dashboard</span>
            </li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
