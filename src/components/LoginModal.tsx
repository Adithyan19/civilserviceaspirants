import React, { useState, useEffect } from "react";
import { X, Mail, Lock, Eye, EyeOff } from "lucide-react";
import { gsap } from "gsap";
import { jwtDecode } from "jwt-decode";
import { api } from "../utils/api";
import { useToast } from "./ToastContext"; // Import the toast hook
import axios from "axios";

interface MyJwtPayload {
  id: number;
  email: string;
  role: "admin" | "user";
  name: string;
  iat?: number;
  exp?: number;
}

interface LoginModalProps {
  onSignupClick?: () => void;
  isOpen: boolean;
  onClose: () => void;
  onLogin: (credentials: {
    email: string;
    role: "admin" | "user";
    name: string;
  }) => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  onSignupClick,
  isOpen,
  onClose,
  onLogin,
}) => {
  const { showError, showSuccess } = useToast(); // Use the toast hook

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "user" as "user" | "admin",
    name: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        ".login-modal",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "back.out(1.7)" },
      );
      gsap.fromTo(
        ".login-form-field",
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2 },
      );
    }
  }, [isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await api.post("/api/login", {
        email: formData.email,
        password: formData.password,
      });
      const result = await response.data;
      if (result.success) {
        // Store token in localStorage
        localStorage.setItem("token", result.token);

        // Show success toast instead of alert
        showSuccess("Login successful! Welcome back.");

        const decoded = jwtDecode<MyJwtPayload>(result.token);

        onLogin({
          email: decoded.email,
          role: decoded.role,
          name: decoded.name || "",
        });

        setFormData({ email: "", password: "", role: "user", name: "" });
        onClose();
      } else {
        // Show error toast instead of alert
        showError(
          result.error || "Login failed. Please check your credentials.",
        );
      }
    } catch (error: unknown) {
      let errorMsg = "Something went wrong. Please try again.";
      if (axios.isAxiosError(error) && error.response) {
        errorMsg =
          error.response.data?.error ||
          error.response.data?.message ||
          `${errorMsg}\nRequest failed with status code ${error.response.status}`;
      } else if (error instanceof Error) {
        errorMsg += "\n" + error.message;
      } else {
        errorMsg += "\n" + String(error);
      }
      showError(errorMsg);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="login-modal relative w-full max-w-md">
        <div className="glass-panel p-8 rounded-2xl border border-neon-blue/20">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-white glow-text">
              Welcome Back
            </h2>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="login-form-field">
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={() =>
                    setFormData((prev) => ({ ...prev, role: "user" }))
                  }
                  className={`flex-1 py-2 px-4 rounded-lg border transition-all duration-300 ${
                    formData.role === "user"
                      ? "bg-neon-blue/20 border-neon-blue text-neon-blue"
                      : "bg-white/5 border-white/20 text-gray-400 hover:border-white/40"
                  }`}
                >
                  Student Login
                </button>
              </div>
            </div>

            {/* Email Field */}
            <div className="login-form-field relative">
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neon-blue/60" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-4 py-3 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder-gray-400 focus:border-neon-blue focus:ring-1 
                      focus:ring-neon-blue focus:outline-none transition-all duration-300
                      hover:border-white/20"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="login-form-field relative">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neon-blue/60" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-12 pr-12 py-3 bg-white/5 border border-white/10 rounded-lg 
                      text-white placeholder-gray-400 focus:border-neon-blue focus:ring-1 
                      focus:ring-neon-blue focus:outline-none transition-all duration-300
                      hover:border-white/20"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 
                      hover:text-white transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="login-form-field w-full py-3 bg-gradient-to-r from-neon-blue to-neon-purple 
                      text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-neon-blue/25 
                      transition-all duration-300 transform hover:scale-105 disabled:opacity-50 
                      disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-gray-400 text-sm">
              Don't have an account?{" "}
              <button
                onClick={onSignupClick}
                className="text-neon-blue hover:text-neon-purple transition-colors"
              >
                Sign up here
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
