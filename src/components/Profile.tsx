import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import Footer from "./Footer";
import { api } from "../utils/api";

interface EnrolledEvent {
  id: number;
  title: string;
  description?: string;
  date: string;
  time: string;
  mode?: string;
  venue?: string;
  img_url?: string;
  max_participants?: number;
}

interface ProfileProps {
  user: { email: string; role?: string } | null;
  onLogout: () => void;
}
// Helper function to format date as "12 August 2025"
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const Profile: React.FC<ProfileProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();
  const [enrolledEvents, setEnrolledEvents] = useState<EnrolledEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrolledEvents = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token"); // Assuming JWT is stored here
        const res = await api.get("/api/user/enrolled-events", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = res.data;
        setEnrolledEvents(data || []);
      } catch (err) {
        console.error("Error fetching enrolled events:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchEnrolledEvents();
    }
  }, [user]);

  const getStatusColor = (date: string) => {
    const eventDate = new Date(date);
    const currentDate = new Date();

    if (eventDate > currentDate) {
      return "text-neon-blue bg-neon-blue/20"; // upcoming
    } else {
      return "text-green-400 bg-green-400/20"; // completed
    }
  };

  if (loading) {
    return (
      <div className="bg-[#0f172a] min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-neon-blue/30 border-t-neon-blue rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col">
      {/* Header */}
      <div className="relative z-40 glass-panel border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-4">
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
                My Profile
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
      <main className="flex-grow container mx-auto px-4 sm:px-6 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Profile Header */}
          <div className="glass-panel p-6 rounded-2xl border border-neon-blue/20 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-4 md:space-y-0">
              <div className="w-20 h-20 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                {user?.email.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col">
                <h2 className="text-2xl font-bold text-white mb-1 break-words">
                  {user?.email.split("@")[0]}
                </h2>
                <p className="text-gray-300 break-words">{user?.email}</p>
                <span className="inline-block px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-full text-sm mt-3">
                  {enrolledEvents.length} Event
                  {enrolledEvents.length !== 1 ? "s" : ""} Enrolled
                </span>
              </div>
            </div>
          </div>

          {/* Enrolled Events */}
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-white mb-4">
              Your Enrolled Events
            </h3>
            {enrolledEvents.length === 0 ? (
              <div className="glass-panel p-8 rounded-2xl border border-white/10 text-center">
                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400 text-lg">No events enrolled yet</p>
                <p className="text-gray-500 mt-2">
                  Browse events in the dashboard to get started
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {enrolledEvents.map((event) => (
                  <div
                    key={event.id}
                    className="glass-panel p-6 rounded-xl border border-neon-blue/20 flex flex-col justify-between"
                  >
                    {event.img_url && (
                      <img
                        src={event.img_url}
                        alt={event.title}
                        className="rounded-lg mb-4 h-40 w-full object-cover"
                      />
                    )}
                    <div className="mb-4">
                      <h4 className="text-xl font-semibold text-white mb-2">
                        {event.title}
                      </h4>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${getStatusColor(
                          event.date,
                        )}`}
                      >
                        {new Date(event.date) > new Date()
                          ? "Upcoming"
                          : "Completed"}
                      </span>
                    </div>
                    <div className="flex flex-col space-y-2 text-sm text-gray-400">
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{formatDate(event.date)}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span>{event.time}</span>
                      </div>
                      {event.venue && (
                        <div className="flex items-center space-x-2">
                          <span>{event.venue}</span>
                        </div>
                      )}
                      {event.mode && (
                        <div className="flex items-center space-x-2">
                          <span>{event.mode}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
