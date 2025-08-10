import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  ArrowLeft,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";

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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

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
        const res = await axios.get<EventDetails>(
          `http://localhost:5000/api/getevent/${id}`
        );
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
      const res = await axios.post("http://localhost:5000/api/enroll-event", {
        eventId: id,
        email,
        password,
      });
      if (res.data.success) {
        alert("Enrolled successfully!");
        setEvent((prev) =>
          prev ? { ...prev, max_participants: prev.max_participants - 1 } : prev
        );
        setShowEnrollModal(false);
      } else {
        alert(res.data.error || "Failed to enroll");
      }
    } catch {
      alert("Error enrolling");
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
    alert("Logging out...");
    navigate("/");
  };

  if (loading) {
    return (
      <div className="bg-[#0f172a] min-h-screen flex items-center justify-center px-4">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="bg-[#0f172a] min-h-screen flex items-center justify-center px-4">
        <div className="text-red-500 text-xl text-center">Event not found</div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col">
      {/* Header - matching Dashboard style */}
      <div className="relative z-40 glass-panel border-b border-white/10 bg-[#0f172a]/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center space-x-4 flex-1 min-w-0">
              <button
                onClick={handleBackToDashboard}
                aria-label="Back to Dashboard"
                className="flex items-center justify-center w-10 h-10 bg-glass-bg backdrop-blur-sm
                  border border-white/20 rounded-full hover:border-neon-blue/50
                  hover:shadow-glow transition-all duration-300 group flex-shrink-0"
              >
                <ArrowLeft
                  className="w-5 h-5 text-white group-hover:text-neon-blue transition-colors"
                  aria-hidden="true"
                />
              </button>
              <h1 className="text-2xl font-bold text-white glow-text truncate hover:text-neon-blue transition-colors">
                Event Details
              </h1>
            </div>

            {/* User Account Dropdown - matching Dashboard style */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowUserDropdown((show) => !show)}
                aria-haspopup="true"
                aria-expanded={showUserDropdown}
                className="flex items-center space-x-2 px-3 py-2 bg-glass-bg backdrop-blur-sm
                  border border-white/20 rounded-full hover:border-neon-blue/50
                  hover:shadow-glow transition-all duration-300 group"
              >
                <div
                  className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full
                    flex items-center justify-center text-white font-semibold text-sm select-none"
                >
                  {user?.name ? user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <ChevronDown className="w-4 h-4 text-white group-hover:text-neon-blue" />
              </button>

              {showUserDropdown && (
                <>
                  {/* Overlay to block content interaction */}
                  <div
                    className="fixed inset-0 z-[999]"
                    onClick={() => setShowUserDropdown(false)}
                  />
                  {/* Dropdown Menu */}
                  <div
                    className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-gray-900/95 backdrop-blur-md
                      border border-white/20 rounded-2xl shadow-2xl z-[1000] overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 px-6 py-4 border-b border-white/10">
                      <div className="flex items-center space-x-4">
                        <div
                          className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full
                            flex items-center justify-center text-white font-bold text-lg select-none"
                        >
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
                          <span
                            className="inline-block px-2 py-1 rounded-full text-xs font-medium mt-1
                              bg-neon-blue/20 text-neon-blue select-none"
                          >
                            Student
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="py-2 space-y-1">
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          navigate("/account", { state: { email: user?.email } });
                        }}
                        className="w-full px-6 py-3 text-left text-white hover:bg-white/10
                          flex items-center space-x-3 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-neon-blue"
                      >
                        <User className="w-5 h-5 text-neon-blue flex-shrink-0" />
                        <div>
                          <p className="font-medium">Account Details</p>
                          <p className="text-xs text-gray-400">View and manage your profile</p>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          navigate("/profile");
                        }}
                        className="w-full px-6 py-3 text-left text-white hover:bg-white/10
                          flex items-center space-x-3 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-neon-purple"
                      >
                        <Settings className="w-5 h-5 text-neon-purple flex-shrink-0" />
                        <div>
                          <p className="font-medium">Profile</p>
                          <p className="text-xs text-gray-400">Manage your preferences</p>
                        </div>
                      </button>
                      <div className="border-t border-white/10 my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-6 py-3 text-left text-red-400 hover:bg-red-500/10
                          flex items-center space-x-3 transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        <LogOut className="w-5 h-5 flex-shrink-0" />
                        <div>
                          <p className="font-medium">Sign Out</p>
                          <p className="text-xs text-red-300">Logout from your account</p>
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
      <main className="bg-gradient-to-br from-gray-900 via-[#0f172a] to-gray-800 flex-grow text-white">
        {/* Image */}
        <div className="relative">
          <img
            src={event.img_url}
            alt={event.title}
            className="w-full max-h-60 sm:max-h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12 max-w-4xl">
          {/* Title */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl font-bold">{event.title}</h1>
          </div>

          {/* Description */}
          <section className="mb-12">
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
              <h2 className="text-xl font-semibold mb-3 text-gray-200">About The Event</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line">{event.description}</p>
            </div>
          </section>

          {/* Info Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Left */}
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700">
              <h3 className="text-lg font-semibold mb-4 text-gray-200">Details</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <span className="text-blue-400">📅</span>
                  <div>
                    <span className="text-white font-medium">Date: </span>
                    <span className="text-gray-300">
                      {new Date(event.date).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-purple-400">🕒</span>
                  <div>
                    <span className="text-white font-medium">Time: </span>
                    <span className="text-gray-300">{event.time}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-green-400">📍</span>
                  <div>
                    <span className="text-white font-medium">Venue: </span>
                    <span className="text-gray-300">{event.venue}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-orange-400">📺</span>
                  <div>
                    <span className="text-white font-medium">Mode: </span>
                    <span className="text-gray-300">{event.mode}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="bg-gray-800/30 rounded-lg p-6 border border-gray-700 flex flex-col justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-200">Contact & Availability</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <span className="text-blue-400">📧</span>
                    <div>
                      <span className="text-white font-medium">Contact 1: </span>
                      <span className="text-gray-300 break-words">{event.contact_1}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-green-400">📧</span>
                    <div>
                      <span className="text-white font-medium">Contact 2: </span>
                      <span className="text-gray-300 break-words">{event.contact_2}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-yellow-400">🎟️</span>
                    <div>
                      <span className="text-white font-medium">Slots Available: </span>
                      <span className="text-green-400 font-semibold">{event.max_participants}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setShowEnrollModal(true)}
                className="w-full bg-blue-600 hover:bg-blue-700 rounded-lg py-3 text-white font-medium transition-colors"
              >
                Enroll Now
              </button>
            </div>
          </section>
        </div>

        {/* Enrollment Modal */}
        {showEnrollModal && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 px-4">
            <div className="bg-gray-800 rounded-lg max-w-md w-full p-6 border border-gray-700">
              <div className="text-center mb-6">
                <h2 className="text-xl font-semibold mb-2 text-white">Confirm Enrollment</h2>
                <p className="text-gray-400">Enter your credentials to enroll in this event</p>
              </div>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1 text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-1 text-gray-300"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="w-full p-3 rounded bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-colors"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6">
                <button
                  onClick={() => setShowEnrollModal(false)}
                  className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600 transition-colors w-full sm:w-auto"
                >
                  Cancel
                </button>
                <button
                  onClick={handleEnroll}
                  className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition-colors w-full sm:w-auto"
                >
                  Enroll
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
