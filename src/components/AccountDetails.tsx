import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Edit2, Save, X, Eye, EyeOff } from 'lucide-react';
import Footer from './Footer';

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

  // Get email either from location.state or fallback to user prop
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
    phone: '',
    year: '',
  });
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!email) {
      alert('User not logged in or email missing!');
      navigate('/');
      return;
    }

    const fetchUserDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get('http://localhost:5000/api/user', { params: { email } });
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
        alert('Failed to fetch user details.');
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, [email, navigate]);

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      // Call your backend update endpoint here if exists
      // For now, simulate success
      await new Promise((res) => setTimeout(res, 1500));

      if (userDetails) {
        setUserDetails({
          ...userDetails,
          phone: editForm.phone,
          year: editForm.year,
        });
      }
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch {
      alert('Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      alert('Password must be at least 6 characters long!');
      return;
    }

    if (!email) {
      alert('User email unavailable');
      return;
    }

    setSaving(true);

    try {
      await axios.post('http://localhost:5000/api/user/change-password', {
        email,
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });

      alert('Password changed successfully!');
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      });
      setIsChangingPassword(false);
    } catch (error: any) {
      alert(error.response?.data?.error || 'Failed to change password');
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
    <div className="bg-[#0f172a] min-h-screen">
      {/* Header */}
      <div className="relative z-40 glass-panel border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate('/dashboard')}
                className="flex items-center space-x-2 text-white hover:text-neon-blue transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Dashboard</span>
              </button>
              <h1 className="text-2xl font-bold text-white glow-text">Account Details</h1>
            </div>

            <button
              onClick={onLogout}
              className="px-4 py-2 bg-red-600/20 text-red-400 rounded-lg hover:bg-red-600/30 transition-colors"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Profile Overview */}
          <div className="glass-panel p-8 rounded-2xl border border-neon-blue/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Profile Information</h2>
              {!isEditing && (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-neon-blue/20 text-neon-blue rounded-lg hover:bg-neon-blue/30 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>

            {isEditing ? (
              <form onSubmit={handleEditSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name (Cannot be changed)
                    </label>
                    <input
                      type="text"
                      value={userDetails?.fullName || ''}
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
                      value={userDetails?.course || ''}
                      disabled
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Email Address (Cannot be changed)</label>
                    <input
                      type="email"
                      value={email}
                      disabled
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={editForm.phone}
                      onChange={(e) => setEditForm((prev) => ({ ...prev, phone: e.target.value }))}
                      className="w-full px-4 py-3 bg-glass-bg border border-white/20 rounded-lg text-white focus:border-neon-blue focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Year</label>
                  <select
                    value={editForm.year}
                    onChange={(e) => setEditForm((prev) => ({ ...prev, year: e.target.value }))}
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
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 0.75rem center',
                      backgroundSize: '1em',
                    }}
                  >
                    <option className="bg-[#0f172a] text-white" value="1st Year">1st Year</option>
                    <option className="bg-[#0f172a] text-white" value="2nd Year">2nd Year</option>
                    <option className="bg-[#0f172a] text-white" value="3rd Year">3rd Year</option>
                    <option className="bg-[#0f172a] text-white" value="4th Year">4th Year</option>
                    <option className="bg-[#0f172a] text-white" value="5th Year">5th Year</option>
                    <option className="bg-[#0f172a] text-white" value="Alumni">Alumni</option>
                  </select>
                </div>

                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-lg hover:shadow-glow transition-all duration-300 disabled:opacity-50"
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
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-600/20 text-gray-300 rounded-lg hover:bg-gray-600/30 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Full Name</label>
                  <p className="text-white text-lg">{userDetails?.fullName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Email</label>
                  <p className="text-white text-lg">{email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Phone</label>
                  <p className="text-white text-lg">{userDetails?.phone}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Course</label>
                  <p className="text-white text-lg">{userDetails?.course}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Year</label>
                  <p className="text-white text-lg">{userDetails?.year}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Member Since</label>
                  <p className="text-white text-lg">
                    {new Date(userDetails?.updatedAt || '').toLocaleDateString()}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Change Password Section */}
          <div className="glass-panel p-8 rounded-2xl border border-neon-purple/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-white">Security Settings</h2>
              {!isChangingPassword && (
                <button
                  onClick={() => setIsChangingPassword(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-neon-purple/20 text-neon-purple rounded-lg hover:bg-neon-purple/30 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Change Password</span>
                </button>
              )}
            </div>

            {isChangingPassword ? (
              <form onSubmit={handlePasswordChange} className="space-y-6">
                <div className="space-y-4">
                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Current Password
                    </label>
                    <input
                      type={showPasswords.current ? 'text' : 'password'}
                      value={passwordForm.currentPassword}
                      onChange={(e) => setPasswordForm((prev) => ({ ...prev, currentPassword: e.target.value }))}
                      className="w-full px-4 py-3 pr-12 bg-glass-bg border border-white/20 rounded-lg text-white focus:border-neon-purple focus:outline-none"
                      required
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords((prev) => ({ ...prev, current: !prev.current }))
                      }
                      className="absolute right-3 top-9 text-gray-400 hover:text-white"
                    >
                      {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-2">New Password</label>
                    <input
                      type={showPasswords.new ? 'text' : 'password'}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm((prev) => ({ ...prev, newPassword: e.target.value }))}
                      className="w-full px-4 py-3 pr-12 bg-glass-bg border border-white/20 rounded-lg text-white focus:border-neon-purple focus:outline-none"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords((prev) => ({ ...prev, new: !prev.new }))
                      }
                      className="absolute right-3 top-9 text-gray-400 hover:text-white"
                    >
                      {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>

                  <div className="relative">
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type={showPasswords.confirm ? 'text' : 'password'}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm((prev) => ({ ...prev, confirmPassword: e.target.value }))}
                      className="w-full px-4 py-3 pr-12 bg-glass-bg border border-white/20 rounded-lg text-white focus:border-neon-purple focus:outline-none"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowPasswords((prev) => ({ ...prev, confirm: !prev.confirm }))
                      }
                      className="absolute right-3 top-9 text-gray-400 hover:text-white"
                    >
                      {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    type="submit"
                    disabled={saving}
                    className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-neon-purple to-neon-blue text-white rounded-lg hover:shadow-glow transition-all duration-300 disabled:opacity-50"
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
                        currentPassword: '',
                        newPassword: '',
                        confirmPassword: '',
                      });
                    }}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-600/20 text-gray-300 rounded-lg hover:bg-gray-600/30 transition-colors"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                </div>
              </form>
            ) : (
              <div>
                <p className="text-gray-300 mb-4">
                  Keep your account secure by using a strong password and changing it regularly.
                </p>
                <div className="text-sm text-gray-400">
                  <p>• Password should be at least 6 characters long</p>
                  <p>• Include a mix of letters, numbers, and special characters</p>
                  <p>• Don't use the same password for multiple accounts</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AccountDetails;
