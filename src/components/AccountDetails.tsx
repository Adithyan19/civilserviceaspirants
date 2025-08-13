import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeft, Edit2, Save, X, Eye, EyeOff } from "lucide-react";
import Footer from "./Footer";
import { api } from "../utils/api";

interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  course: string;
  year: string;
  college: string;
  updatedAt: string;
}

interface AccountDetailsProps {
  user: { email: string; role?: string } | null;
  onLogout: () => void;
}

const AccountDetails: React.FC<AccountDetailsProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const emailFromState = (location.state as { email?: string })?.email;
  const email = emailFromState || user?.email;

  const [userDetails, setUserDetails] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });
  const [editForm, setEditForm] = useState({
    phone: "",
    year: "",
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not logged in or email missing!");
      navigate("/");
      return;
    }

    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const res = await api.get("/api/user", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = res.data;
        setUserDetails({
          id: data.id,
          fullName: data.fullName,
          email: data.email,
          phone: data.phone,
          course: data.course,
          year: data.year,
          college: data.college,
          updatedAt: data.updatedAt,
        });
        setEditForm({
          phone: data.phone,
          year: data.year,
        });
      } catch (err) {
        alert("Failed to fetch user details.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [navigate]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      const token = localStorage.getItem("token");
      const res = await api.put(
        "/api/user/update",
        { phone: editForm.phone, year: editForm.year },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      if (userDetails) {
        setUserDetails({
          ...userDetails,
          phone: res.data.user.phone,
          year: res.data.user.year,
        });
      }
      setIsEditing(false);
      alert("Profile updated successfully!");
    } catch (err: any) {
      alert(err.response?.data?.error || "Failed to update profile.");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords do not match!");
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      alert("Password must be at least 6 characters long!");
      return;
    }

    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      await api.post(
        "/api/user/change-password",
        {
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } },
      );

      alert("Password changed successfully!");
      setPasswordForm({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setIsChangingPassword(false);
    } catch (error: any) {
      alert(error.response?.data?.error || "Failed to change password");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0f172a] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-neon-blue/30 border-t-neon-blue rounded-full animate-spin mx-auto mb-4" />
          <p className="text-white">Loading account details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col">
      {/* Header */}
      <div className="relative z-40 glass-panel border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div className="flex items-center space-x-3 flex-wrap">
              <button
                onClick={() => navigate("/dashboard")}
                className="flex items-center justify-center w-10 h-10 bg-glass-bg backdrop-blur-sm
                              border border-white/20 rounded-full hover:border-neon-blue/50
                              hover:shadow-glow transition-all duration-300 group"
                aria-label="Back to Dashboard"
              >
                <ArrowLeft className="w-5 h-5 text-white group-hover:text-neon-blue transition-colors" />
              </button>
              <h1 className="text-xl sm:text-2xl font-bold text-white glow-text whitespace-nowrap">
                Account Details
              </h1>
            </div>

            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors w-full sm:w-auto"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <main className="flex-grow container mx-auto px-4 sm:px-6 md:px-8 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Overview */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-neon-blue/20">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                Profile Information
              </h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-lg hover:bg-neon-blue/30 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="text-sm sm:text-base">Edit Profile</span>
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name (Cannot be changed)
                    </label>
                    <input
                      type="text"
                      value={userDetails?.fullName || ""}
                      disabled
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Course (Cannot be changed)
                    </label>
                    <input
                      type="text"
                      value={userDetails?.course || ""}
                      disabled
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address (Cannot be changed)
                    </label>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="w-full px-4 py-3 bg-glass-bg border border-white/20 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Year
                    </label>
                    <select
                      value={editForm.year}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          year: e.target.value,
                        }))
                      }
                      required
                      className="
                        w-full px-4 py-3 
                        bg-glass-bg bg-opacity-70 
                        border border-white/20 
                        rounded-xl  
                        text-white 
                        focus:border-neon-blue 
                        focus:outline-none 
                        appearance-none 
                        cursor-pointer
                        transition-all duration-300 
                        hover:border-neon-blue/70
                        backdrop-blur-md shadow-inner
                      "
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg fill='white' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M7 10l5 5 5-5z'/%3e%3c/svg%3e")`,
                        backgroundRepeat: "no-repeat",
                        backgroundPosition: "right 0.75rem center",
                        backgroundSize: "1em",
                      }}
                    >
                      <option
                        className="bg-[#0f172a] text-white"
                        value="1st Year"
                      >
                        1st Year
                      </option>
                      <option
                        className="bg-[#0f172a] text-white"
                        value="2nd Year"
                      >
                        2nd Year
                      </option>
                      <option
                        className="bg-[#0f172a] text-white"
                        value="3rd Year"
                      >
                        3rd Year
                      </option>
                      <option
                        className="bg-[#0f172a] text-white"
                        value="4th Year"
                      >
                        4th Year
                      </option>
                      <option
                        className="bg-[#0f172a] text-white"
                        value="5th Year"
                      >
                        5th Year
                      </option>
                      <option
                        className="bg-[#0f172a] text-white"
                        value="Alumni"
                      >
                        Alumni
                      </option>
                    </select>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg hover:shadow-glow transition-all duration-300 disabled:opacity-50 w-full sm:w-auto"
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600/20 text-gray-300 rounded-lg hover:bg-gray-600/30 transition-colors w-full sm:w-auto"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm sm:text-base">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Full Name
                  </label>
                  <p className="text-white">{userDetails?.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Email
                  </label>
                  <p className="text-white">{email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Phone
                  </label>
                  <p className="text-white">{userDetails?.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Course
                  </label>
                  <p className="text-white">{userDetails?.course}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Year
                  </label>
                  <p className="text-white">{userDetails?.year}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Member Since
                  </label>
                  <p className="text-white">
                    {new Date(
                      userDetails?.updatedAt || "",
                    ).toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </section>

          {/* Change Password Section */}
          <section className="glass-panel p-6 sm:p-8 rounded-2xl border border-neon-purple/20">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-white">
                Security Settings
              </h2>
              {!isChangingPassword && (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-neon-purple/20 text-neon-purple rounded-lg hover:bg-neon-purple/30 transition-colors whitespace-nowrap"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="text-sm sm:text-base">Change Password</span>
                </button>
              )}
            </div>

            {isChangingPassword ? (
              <form
                onSubmit={handlePasswordChange}
                className="space-y-6 max-w-md"
              >
                <div className="space-y-4">
                  {["current", "new", "confirm"].map((field) => {
                    const labelMap = {
                      current: "Current Password",
                      new: "New Password",
                      confirm: "Confirm New Password",
                    };
                    const passwordValueMap = {
                      current: passwordForm.currentPassword,
                      new: passwordForm.newPassword,
                      confirm: passwordForm.confirmPassword,
                    };
                    const showPasswordMap = {
                      current: showPasswords.current,
                      new: showPasswords.new,
                      confirm: showPasswords.confirm,
                    };

                    return (
                      <div className="relative" key={field}>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          {labelMap[field as keyof typeof labelMap]}
                        </label>
                        <input
                          type={
                            showPasswordMap[
                              field as keyof typeof showPasswordMap
                            ]
                              ? "text"
                              : "password"
                          }
                          value={
                            passwordValueMap[
                              field as keyof typeof passwordValueMap
                            ]
                          }
                          onChange={(e) =>
                            setPasswordForm((prev) => ({
                              ...prev,
                              [`${field}Password`]: e.target.value,
                            }))
                          }
                          className="w-full px-4 py-3 pr-12 bg-glass-bg border border-white/20 rounded-lg text-white focus:border-neon-purple focus:outline-none"
                          required
                          minLength={field === "current" ? undefined : 6}
                          aria-required="true"
                          autoComplete="off"
                        />
                        <button
                          type="button"
                          onClick={() =>
                            setShowPasswords((prev) => ({
                              ...prev,
                              [field]: !prev[field as keyof typeof prev],
                            }))
                          }
                          className="absolute right-3 top-9 text-gray-400 hover:text-white focus:outline-none"
                          aria-label={
                            showPasswordMap[
                              field as keyof typeof showPasswordMap
                            ]
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showPasswordMap[
                            field as keyof typeof showPasswordMap
                          ] ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    );
                  })}
                </div>

                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-blue text-white rounded-lg hover:shadow-glow transition-all duration-300 disabled:opacity-50 w-full sm:w-auto"
                  >
                    {saving ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Changing...</span>
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4" />
                        <span>Change Password</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsChangingPassword(false);
                      setPasswordForm({
                        currentPassword: "",
                        newPassword: "",
                        confirmPassword: "",
                      });
                    }}
                    className="flex items-center justify-center space-x-2 px-6 py-3 bg-gray-600/20 text-gray-300 rounded-lg hover:bg-gray-600/30 transition-colors w-full sm:w-auto"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p className="text-gray-300 mb-4 max-w-md">
                  Keep your account secure by using a strong password and
                  changing it regularly.
                </p>
                <div className="text-sm text-gray-400 max-w-md space-y-1">
                  <p>• Password should be at least 6 characters long</p>
                  <p>
                    • Include a mix of letters, numbers, and special characters
                  </p>
                  <p>• Don't use the same password for multiple accounts</p>
                </div>
              </div>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AccountDetails;
