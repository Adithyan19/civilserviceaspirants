import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Calendar,
  Clock,
  MapPin,
  Users,
  Globe,
  Phone,
} from "lucide-react";
import { api } from "../utils/api";
import { useToast } from "./ToastContext"; // Import toast hook

interface EventDetails {
  id: string;
  title: string;
  description: string;
  max_participants: number;
  venue: string;
  mode: string;
  date: string;
  time: string;
  img_url: string;
  contact_1: string;
  contact_2: string;
}

interface EventPageProps {
  user?: { email: string; name: string } | null;
  onLogout?: () => void;
}

const EventPage: React.FC<EventPageProps> = ({ user, onLogout }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [showEnrollModal, setShowEnrollModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isEnrolled, setIsEnrolled] = useState(false);

  const { showError, showSuccess } = useToast();

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkEnrollment = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await api.get(`/api/check-enrollment/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.enrolled) setIsEnrolled(true);
      } catch {
        console.error("Failed to check enrollment status");
      }
    };

    checkEnrollment();
  }, [id]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showUserDropdown &&
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showUserDropdown]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get<EventDetails>(`/api/getevent/${id}`);
        setEvent(res.data);
      } catch (err) {
        console.error("Failed to load event");
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleEnroll = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        showError("You must be logged in to enroll for an event.");
        return;
      }

      console.log("📤 Sending enrollment request for event:", id);

      const res = await api.post(
        "/api/enroll-event",
        { eventId: id },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      console.log("✅ Enrollment Response:", res.data);

      if (res.data.success) {
        showSuccess("Enrolled successfully!");
        setEvent((prev) =>
          prev
            ? { ...prev, max_participants: prev.max_participants - 1 }
            : prev,
        );
        setIsEnrolled(true);
        setShowEnrollModal(false);
      }
    } catch (error: any) {
      console.error("❌ Enrollment request failed:", error);

      if (error.response) {
        // Server responded with an error
        console.error("🔍 Server Response Data:", error.response.data);
        console.error("🌐 Status Code:", error.response.status);
        console.error("📩 Response Headers:", error.response.headers);

        const errorMessage =
          error.response.data?.error ||
          "Error enrolling. Please try again later.";

        // Handle specific error cases
        if (errorMessage.includes("already enrolled")) {
          showError("You are already enrolled in this event.");
          setIsEnrolled(true);
          setShowEnrollModal(false);
        } else if (errorMessage.includes("No slots left")) {
          showError("Sorry, no slots are available for this event.");
          // Optionally update the UI to show event is full
          setEvent((prev) => (prev ? { ...prev, max_participants: 0 } : prev));
        } else {
          showError(errorMessage);
        }
      } else if (error.request) {
        // Request made but no server response
        console.error(
          "⚠️ No Response received from the server:",
          error.request,
        );
        showError("No response from the server. Please check your connection.");
      } else {
        // Something else happened while setting up the request
        console.error("💥 Axios setup error:", error.message);
        showError("Unexpected error occurred. Please try again later.");
      }
    }
  };

  const handleBackToDashboard = () => {
    navigate("/dashboard");
  };

  const handleLogout = () => {
    setShowUserDropdown(false);
    if (onLogout) {
      onLogout();
    }
    showSuccess("Logging out...");
    navigate("/");
  };

  const getModeIcon = (mode: string) => {
    switch (mode?.toLowerCase()) {
      case "online":
        return <Globe className="w-5 h-5 text-green-400" />;
      case "offline":
        return <MapPin className="w-5 h-5 text-blue-400" />;
      case "hybrid":
        return <Globe className="w-5 h-5 text-purple-400" />;
      default:
        return <MapPin className="w-5 h-5 text-gray-400" />;
    }
  };

  const getModeColor = (mode: string) => {
    switch (mode?.toLowerCase()) {
      case "online":
        return "bg-green-400/20 text-green-400 border-green-400/30";
      case "offline":
        return "bg-blue-400/20 text-blue-400 border-blue-400/30";
      case "hybrid":
        return "bg-purple-400/20 text-purple-400 border-purple-400/30";
      default:
        return "bg-gray-400/20 text-gray-400 border-gray-400/30";
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0f172a] min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-neon-blue/30 border-t-neon-blue rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading event details...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="bg-[#0f172a] min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">
            Event Not Found
          </h2>
          <button
            onClick={handleBackToDashboard}
            className="px-6 py-3 bg-neon-blue text-white rounded-lg hover:bg-neon-blue/80 transition-colors"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-gray-900 via-[#0f172a] to-gray-800 min-h-screen">
      {/* Header */}
      <div className="relative z-40 glass-panel border-b border-white/10 bg-[#0f172a]/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <button
                onClick={handleBackToDashboard}
                aria-label="Back to Dashboard"
                className="flex items-center justify-center w-10 h-10 bg-glass-bg backdrop-blur-sm border border-white/20 rounded-full hover:border-neon-blue/50 hover:shadow-glow transition-all duration-300 group flex-shrink-0"
              >
                <ArrowLeft
                  className="w-5 h-5 text-white group-hover:text-neon-blue transition-colors"
                  aria-hidden="true"
                />
              </button>
              <h1 className="text-2xl font-bold text-white truncate hover:text-neon-blue transition-colors">
                Event Details
              </h1>
            </div>

            {/* User Account Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowUserDropdown((show) => !show)}
                aria-haspopup="true"
                aria-expanded={showUserDropdown}
                className="flex items-center space-x-2 px-3 py-2 bg-glass-bg backdrop-blur-sm border border-white/20 rounded-full hover:border-neon-blue/50 hover:shadow-glow transition-all duration-300 group"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-white font-semibold text-sm select-none">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <ChevronDown className="w-4 h-4 text-white group-hover:text-neon-blue" />
              </button>

              {showUserDropdown && (
                <>
                  <div
                    className="fixed inset-0 z-[999]"
                    onClick={() => setShowUserDropdown(false)}
                  />
                  <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl z-[1000] overflow-hidden">
                    <div className="bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 px-6 py-4 border-b border-white/10">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-white font-bold text-lg select-none">
                          {user?.email
                            ? user.email.charAt(0).toUpperCase()
                            : "U"}
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-white font-semibold truncate">
                            {user?.name || "User"}
                          </h3>
                          <p className="text-gray-400 text-sm truncate">
                            {user?.email || "user@example.com"}
                          </p>
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 bg-neon-blue/20 text-neon-blue select-none">
                            Student
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="py-2 space-y-1">
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          navigate("/account", {
                            state: { email: user?.email },
                          });
                        }}
                        className="w-full px-6 py-3 text-left text-white hover:bg-white/10 flex items-center space-x-3"
                      >
                        <User className="w-5 h-5 text-neon-blue" />
                        <div>
                          <p className="font-medium">Account Details</p>
                          <p className="text-xs text-gray-400">
                            View and manage your profile
                          </p>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          navigate("/profile");
                        }}
                        className="w-full px-6 py-3 text-left text-white hover:bg-white/10 flex items-center space-x-3"
                      >
                        <Settings className="w-5 h-5 text-neon-purple" />
                        <div>
                          <p className="font-medium">Profile</p>
                          <p className="text-xs text-gray-400">
                            Manage your preferences
                          </p>
                        </div>
                      </button>
                      <div className="border-t border-white/10 my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-6 py-3 text-left text-red-400 hover:bg-red-500/10 flex items-center space-x-3"
                      >
                        <LogOut className="w-5 h-5" />
                        <div>
                          <p className="font-medium">Sign Out</p>
                          <p className="text-xs text-red-300">
                            Logout from your account
                          </p>
                        </div>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="text-white">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="glass-panel rounded-2xl border border-neon-blue/20 overflow-hidden mb-8">
              <div className="relative h-64 md:h-80">
                <img
                  src={event.img_url}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {/* Event Title */}
                <div className="absolute bottom-6 left-6 right-6">
                  <div
                    className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium ${getModeColor(
                      event.mode,
                    )} border backdrop-blur-sm mb-4`}
                  >
                    {getModeIcon(event.mode)}
                    <span className="capitalize">{event.mode} Event</span>
                  </div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                    {event.title}
                  </h1>
                </div>
              </div>
            </div>

            {/* About Event */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                About This Event
              </h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line break-words">
                {event.description}
              </p>
            </div>

            {/* Event Information */}
            <div className="glass-panel p-6 rounded-2xl border border-neon-blue/20 mb-8">
              <h3 className="text-xl font-bold text-white mb-6">
                Event Information
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 " />
                  <div>
                    <p className="text-white font-medium">
                      {new Date(event.date).toLocaleDateString()}
                    </p>
                    <p className="text-gray-400 text-sm">Date</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 " />
                  <div>
                    <p className="text-white font-medium">{event.time}</p>
                    <p className="text-gray-400 text-sm">Time</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <MapPin className="w-5 h-5 " />
                  <div>
                    <p className="text-white font-medium">{event.venue}</p>
                    <p className="text-gray-400 text-sm">Venue</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Users className="w-5 h-5 " />
                  <div>
                    <p className="text-white font-medium">
                      {event.max_participants}
                    </p>
                    <p className="text-gray-400 text-sm">Slots Available</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 " />
                  <div>
                    <p className="text-white font-medium">{event.contact_1}</p>
                    <p className="text-gray-400 text-sm">Contact 1</p>
                  </div>
                </div>

                {event.contact_2 && (
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 " />
                    <div>
                      <p className="text-white font-medium">
                        {event.contact_2}
                      </p>
                      <p className="text-gray-400 text-sm">Contact 2</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Enrollment Section */}
            {!isEnrolled && event.max_participants > 0 && (
              <div className="glass-panel p-6 rounded-2xl border border-neon-purple/20 mb-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  Ready to Join?
                </h3>
                <p className="text-gray-300 text-sm mb-6">
                  Secure your spot in this exclusive event. Limited seats
                  available!
                </p>

                <button
                  onClick={() => setShowEnrollModal(true)}
                  className="w-full py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold rounded-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105"
                >
                  Enroll Now
                </button>

                <p className="text-xs text-gray-400 mt-3 text-center">
                  {event.max_participants} spots remaining • Click to secure
                  your participation
                </p>
              </div>
            )}

            {/* Success State */}
            {isEnrolled && (
              <div className="glass-panel p-6 rounded-2xl border border-green-400/20 mb-8">
                <h3 className="text-xl font-bold text-white mb-4">
                  ✅ Enrolled Successfully!
                </h3>
                <p className="text-gray-300 text-sm">
                  You're all set for this event. Check your email for
                  confirmation details.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Enrollment Modal */}
        {showEnrollModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <div className="bg-gray-800/95 backdrop-blur-md rounded-2xl max-w-md w-full p-6 border border-white/20">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2 text-white">
                  Confirm Enrollment
                </h2>
                <p className="text-gray-400">
                  Are you sure you want to enroll in this event?
                </p>
                <p className="text-neon-blue font-medium mt-2">{event.title}</p>
              </div>
              <div className="flex flex-col sm:flex-row justify-center gap-3 mt-6">
                <button
                  onClick={() => setShowEnrollModal(false)}
                  className="px-6 py-3 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEnroll}
                  className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-all duration-300 w-full sm:w-auto"
                >
                  Confirm Enrollment
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default EventPage;
