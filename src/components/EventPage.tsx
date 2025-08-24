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
  Image,
  X,
  Eye,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { api } from "../utils/api";
import { useToast } from "./ToastContext";

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
  is_active?: boolean;
  EVENT_PHOTOS?: { photo_url: string }[];
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

  const [showImageModal, setShowImageModal] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Touch handling states
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  const { showError, showSuccess } = useToast();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Check if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      nextImage();
    } else if (isRightSwipe) {
      prevImage();
    }
  };

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
        // Swallow error
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
        // Error handling (event not found)
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
      const res = await api.post(
        "/api/enroll-event",
        { eventId: id },
        { headers: { Authorization: `Bearer ${token}` } },
      );
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
      if (error.response) {
        const errorMessage =
          error.response.data?.error ||
          "Error enrolling. Please try again later.";
        if (errorMessage.includes("already enrolled")) {
          showError("You are already enrolled in this event.");
          setIsEnrolled(true);
          setShowEnrollModal(false);
        } else if (errorMessage.includes("No slots left")) {
          showError("Sorry, no slots are available for this event.");
          setEvent((prev) => (prev ? { ...prev, max_participants: 0 } : prev));
        } else {
          showError(errorMessage);
        }
      } else if (error.request) {
        showError("No response from the server. Please check your connection.");
      } else {
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

  const openImageModal = (index: number) => {
    setSelectedImageIndex(index);
    setShowImageModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeImageModal = () => {
    setShowImageModal(false);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    if (event?.EVENT_PHOTOS) {
      setSelectedImageIndex((prev) =>
        prev === event.EVENT_PHOTOS!.length - 1 ? 0 : prev + 1,
      );
    }
  };
  const prevImage = () => {
    if (event?.EVENT_PHOTOS) {
      setSelectedImageIndex((prev) =>
        prev === 0 ? event.EVENT_PHOTOS!.length - 1 : prev - 1,
      );
    }
  };

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!showImageModal) return;

      switch (e.key) {
        case "Escape":
          closeImageModal();
          break;
        case "ArrowLeft":
          prevImage();
          break;
        case "ArrowRight":
          nextImage();
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showImageModal]);

  const isCompleted = event?.is_active === false;

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
                  <div className="absolute right-0 mt-2 w-80 max-w-[90vw] bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl z- overflow-hidden">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
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

            {/* Enhanced Completed Event Gallery */}
            {isCompleted &&
              Array.isArray(event.EVENT_PHOTOS) &&
              event.EVENT_PHOTOS.length > 0 && (
                <div className="relative overflow-hidden rounded-3xl border border-gradient-to-r from-neon-purple/30 via-neon-blue/20 to-neon-purple/30 bg-gradient-to-br from-slate-900/50 via-slate-800/30 to-slate-900/50 backdrop-blur-xl mb-8">
                  {/* Animated background elements */}
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-neon-purple/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-neon-blue/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                  </div>

                  <div className="relative p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                      <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 border border-neon-purple/30 mb-4">
                        <div className="w-2 h-2 bg-neon-purple rounded-full animate-ping"></div>
                        <span className="text-sm font-medium text-neon-purple">
                          Event Completed
                        </span>
                      </div>
                      <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-neon-blue to-neon-purple bg-clip-text text-transparent mb-2 flex items-center justify-center gap-3">
                        <Image className="w-8 h-8 text-neon-blue" />
                        Event Memories
                      </h2>
                      {/* Mobile swipe instruction */}
                      {isMobile && (
                        <p className="text-neon-blue/70 text-sm mt-2 animate-pulse">
                          Tap photos to view
                        </p>
                      )}
                    </div>

                    {/* Photo Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {event.EVENT_PHOTOS!.map((photo, index) => (
                        <div
                          key={index}
                          className="group relative overflow-hidden rounded-2xl cursor-pointer transform transition-all duration-500 hover:scale-105 hover:-translate-y-2"
                          onClick={() => openImageModal(index)}
                        >
                          {/* Photo container */}
                          <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900">
                            <img
                              src={photo.photo_url}
                              alt={`Event photo ${index + 1}`}
                              className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                            />

                            {/* Gradient overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {/* Hover effects */}
                            <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/20 via-transparent to-neon-blue/20 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

                            {/* View icon and photo number */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                              <div className="bg-black/50 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
                                <Eye className="w-6 h-6 text-white" />
                              </div>
                            </div>

                            {/* Photo number indicator */}
                            <div className="absolute top-3 right-3 w-8 h-8 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-xs font-bold text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                              {index + 1}
                            </div>
                          </div>

                          {/* Glow effect */}
                          <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                            <div className="absolute inset-0 rounded-2xl shadow-lg shadow-neon-purple/25 group-hover:shadow-neon-blue/25 transition-all duration-300"></div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="text-center mt-8 pt-6 border-t border-white/10">
                      <p className="text-gray-400">
                        <span className="text-2xl font-bold text-neon-blue">
                          {event.EVENT_PHOTOS!.length}
                        </span>{" "}
                        memories captured
                      </p>
                    </div>
                  </div>
                </div>
              )}

            {/* About Event */}
            <div className="glass-panel p-6 rounded-2xl border border-white/10 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">
                About This Event
              </h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line break-words">
                {event.description}
              </p>
            </div>

            {/* Event Info and Enrollment for ongoing events */}
            {event.is_active !== false && (
              <>
                <div className="glass-panel p-6 rounded-2xl border border-neon-blue/20 mb-8">
                  <h3 className="text-xl font-bold text-white mb-6">
                    Event Information
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-5 h-5" />
                      <div>
                        <p className="text-white font-medium">
                          {new Date(event.date).toLocaleDateString()}
                        </p>
                        <p className="text-gray-400 text-sm">Date</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5" />
                      <div>
                        <p className="text-white font-medium">{event.time}</p>
                        <p className="text-gray-400 text-sm">Time</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-5 h-5" />
                      <div>
                        <p className="text-white font-medium">{event.venue}</p>
                        <p className="text-gray-400 text-sm">Venue</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Users className="w-5 h-5" />
                      <div>
                        <p className="text-white font-medium">
                          {event.max_participants}
                        </p>
                        <p className="text-gray-400 text-sm">Slots Available</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5" />
                      <div>
                        <p className="text-white font-medium">
                          {event.contact_1}
                        </p>
                        <p className="text-gray-400 text-sm">Contact 1</p>
                      </div>
                    </div>
                    {event.contact_2 && (
                      <div className="flex items-center space-x-3">
                        <Phone className="w-5 h-5" />
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

                {/* Enrollment section */}
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
              </>
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

        {/* Enhanced Image Modal with Touch Support */}
        {showImageModal &&
          isCompleted &&
          Array.isArray(event.EVENT_PHOTOS) &&
          event.EVENT_PHOTOS.length > 0 && (
            <div
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
              onClick={closeImageModal}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
                {/* Close button */}
                <button
                  onClick={closeImageModal}
                  className="absolute top-4 right-4 md:top-6 md:right-6 z-10 w-10 h-10 md:w-12 md:h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-neon-blue transition-all duration-300 group"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Navigation buttons - Hidden on mobile */}
                {!isMobile && event.EVENT_PHOTOS!.length > 1 && (
                  <>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        prevImage();
                      }}
                      className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-neon-purple transition-all duration-300 group z-10"
                    >
                      <ChevronLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        nextImage();
                      }}
                      className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:text-neon-purple transition-all duration-300 group z-10"
                    >
                      <ChevronRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
                    </button>
                  </>
                )}

                {/* Main image */}
                <div
                  className="relative max-w-full max-h-full flex items-center justify-center"
                  onClick={(e) => e.stopPropagation()}
                >
                  <img
                    src={event.EVENT_PHOTOS![selectedImageIndex].photo_url}
                    alt={`Event photo ${selectedImageIndex + 1}`}
                    className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
                    draggable={false}
                  />

                  {/* Photo counter */}
                  <div className="absolute bottom-4 md:bottom-6 left-1/2 -translate-x-1/2 px-3 py-2 md:px-4 md:py-2 bg-black/70 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                    {selectedImageIndex + 1} / {event.EVENT_PHOTOS!.length}
                  </div>

                  {/* Mobile swipe indicators */}
                  {isMobile && event.EVENT_PHOTOS!.length > 1 && (
                    <>
                      {/* Left swipe indicator */}
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center text-white/60 pointer-events-none">
                        <ChevronLeft className="w-6 h-6 animate-pulse" />
                      </div>
                      {/* Right swipe indicator */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col items-center text-white/60 pointer-events-none">
                        <ChevronRight className="w-6 h-6 animate-pulse" />
                      </div>
                    </>
                  )}
                </div>

                {/* Mobile navigation dots */}
                {isMobile && event.EVENT_PHOTOS!.length > 1 && (
                  <div className="absolute bottom-16 md:bottom-20 left-1/2 -translate-x-1/2 flex space-x-2">
                    {event.EVENT_PHOTOS!.map((_, index) => (
                      <button
                        key={index}
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedImageIndex(index);
                        }}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === selectedImageIndex
                            ? "bg-neon-blue w-6"
                            : "bg-white/40 hover:bg-white/60"
                        }`}
                      />
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
      </main>
    </div>
  );
};

export default EventPage;
