import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { OrgPathLogo } from "./OrgPathLogo";
import { ForgotPasswordDialog } from "./ForgotPasswordDialog";
import recaptchaImage from "figma:asset/0501155e0f325996fa05ee0df08493b90073f143.png";

interface AuthPageProps {
  onSuccess?: (role: "company" | "lead" | "employee") => void;
}

export function AuthPage({ onSuccess }: AuthPageProps) {
  const [activeTab, setActiveTab] = useState("login");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Login form state
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Register form state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [referralCode, setReferralCode] = useState("");

  // --- REAL LOGIN LOGIC ---
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ identifier: username, password }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");

      // Save the real token
      sessionStorage.setItem("orgpath_token", data.token);
      sessionStorage.setItem("orgpath_user", JSON.stringify(data.user));

      if (onSuccess) {
        onSuccess(data.user.role);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // --- REAL REGISTER LOGIC ---
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (registerPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          password: registerPassword,
          referralCode,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Registration failed");

      // Save the real token
      sessionStorage.setItem("orgpath_token", data.token);
      sessionStorage.setItem("orgpath_user", JSON.stringify(data.user));

      if (onSuccess) {
        onSuccess(data.user.role);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header with Logo */}
      <div className="px-8 py-6 flex items-center justify-between">
        <OrgPathLogo />
      </div>

      {/* Gradient Banner */}
      <div
        className="relative h-24 flex items-center px-8"
        style={{
          background: "linear-gradient(90deg, #116CB1 0%, #1B8784 33%, #1C986B 66%, #1C897E 100%)",
        }}
      >
        <h1 className="text-white" style={{ fontSize: "32px" }}>
          {activeTab === "login" ? "Login" : "Register"}
        </h1>
      </div>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-8 py-12">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Create Account</TabsTrigger>
          </TabsList>

          {/* Display API Errors */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-lg text-center font-medium">
              {error}
            </div>
          )}

          {/* Login Tab */}
          <TabsContent value="login">
            <div className="text-center mb-8">
              <h2 className="mb-2 font-bold" style={{ fontSize: "24px" }}>Welcome back</h2>
              <p className="text-muted-foreground">
                Enter your credentials to access your account
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="username"
                  type="email"
                  placeholder="Enter your email"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="bg-white border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="bg-white border-gray-300"
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  className="hover:underline"
                  style={{ color: "#106BB0" }}
                  onClick={() => setShowForgotPassword(true)}
                >
                  Forgot password?
                </button>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
                style={{ backgroundColor: "#106BB0", color: "white" }}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </form>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <div className="text-center mb-8">
              <h2 className="mb-2 font-bold" style={{ fontSize: "24px" }}>Enter your details</h2>
              <p className="text-muted-foreground">We don't use your details for marketing purposes</p>
            </div>

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-2">
                <Label>First Name <span className="text-red-500">*</span></Label>
                <Input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                  className="bg-white border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label>Last Name <span className="text-red-500">*</span></Label>
                <Input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                  className="bg-white border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label>Email Address <span className="text-red-500">*</span></Label>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="bg-white border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label>Country <span className="text-red-500">*</span></Label>
                <select
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  required
                  className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#106BB0]"
                >
                  <option value="" disabled>Select Country</option>
                  <option value="us">United States</option>
                  <option value="uk">United Kingdom</option>
                  <option value="ca">Canada</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label>Password <span className="text-red-500">*</span></Label>
                <Input
                  type="password"
                  placeholder="Create a password"
                  value={registerPassword}
                  onChange={(e) => setRegisterPassword(e.target.value)}
                  required
                  className="bg-white border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label>Confirm Password <span className="text-red-500">*</span></Label>
                <Input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="bg-white border-gray-300"
                />
              </div>

              <div className="bg-blue-50/50 border-2 border-blue-200 rounded-xl p-6">
                <Label className="text-[#106BB0] font-bold">REFERRAL CODE <span className="text-red-500">*</span></Label>
                <Input
                  type="text"
                  placeholder="Enter your referral code"
                  value={referralCode}
                  onChange={(e) => setReferralCode(e.target.value)}
                  required
                  className="bg-white border-blue-300 mt-2 border-2"
                />
                <p className="text-xs text-gray-500 mt-2">⚠️ A valid referral code is required to create an account</p>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full"
                style={{ backgroundColor: "#06A119", color: "white" }}
              >
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>
          </TabsContent>
        </Tabs>
      </div>

      <ForgotPasswordDialog open={showForgotPassword} onOpenChange={setShowForgotPassword} />
    </div>
  );
}