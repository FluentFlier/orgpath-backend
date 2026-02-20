import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { OrgPathLogo } from "./OrgPathLogo";

interface ForgotPasswordDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ForgotPasswordDialog({ open, onOpenChange }: ForgotPasswordDialogProps) {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setSubmitted(true);
  };

  const handleClose = () => {
    setEmail("");
    setSubmitted(false);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="space-y-4">
          <div className="flex justify-center">
            <OrgPathLogo />
          </div>
          <DialogTitle className="text-center">
            {submitted ? "Check Your Email" : "Reset Password"}
          </DialogTitle>
          <DialogDescription className="text-center">
            {submitted
              ? "If an account exists with this email, password reset instructions have been sent."
              : "Enter your email address and we'll send you instructions to reset your password."}
          </DialogDescription>
        </DialogHeader>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-6 mt-4">
            <div className="space-y-2">
              <Label htmlFor="reset-email">
                Email Address <span className="text-red-500">*</span>
              </Label>
              <Input
                id="reset-email"
                type="email"
                placeholder="Enter your registered email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-white border-gray-300"
              />
            </div>

            <p className="text-sm text-muted-foreground">
              Password reset details will be sent to your registered email address.
            </p>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={handleClose}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="flex-1"
                style={{ backgroundColor: '#106BB0', color: 'white' }}
              >
                Send Reset Link
              </Button>
            </div>
          </form>
        ) : (
          <div className="space-y-6 mt-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
              <p className="text-green-800">
                ✓ Password reset email sent successfully
              </p>
            </div>

            <p className="text-sm text-muted-foreground text-center">
              Please check your inbox and spam folder. The email may take a few minutes to arrive.
            </p>

            <Button
              onClick={handleClose}
              className="w-full"
              style={{ backgroundColor: '#106BB0', color: 'white' }}
            >
              Back to Login
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
