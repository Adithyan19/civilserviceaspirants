import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  Globe,
  Phone,
  User,
} from "lucide-react";
import axios from "axios";
import Footer from "./Footer";

interface EventDetailPageProps {
  onLoginClick: () => void; // function to open login modal
  user: { email: string; role?: string } | null;
}

interface EventDetail {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  mode: string;
  max_participants: number;
  img_url: string;
  contact_1?: string;
  contact_2?: string;
  organizer?: string;
  attendees?: number;
  full_description?: string;
  agenda?: string[];
  requirements?: string[];
}

const EventDetailPage: React.FC<EventDetailPageProps> = ({
  onLoginClick,
  user,
}) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  useEffect(() => {
    axios
      .get<EventDetail>(`/api/getevent/${id}`)
      .then((res) => setEvent(res.data))
      .catch(() => setEvent(null))
      .finally(() => setLoading(false));
  }, [id]);

  const handleEnrollClick = () => {
    if (!user) {
      console.log("Opening login modal..."); // Debug log
      onLoginClick(); // This will open the login modal
      return;
    }
    // TODO: Add enrollment API call here when user is logged in
    console.log("Enrolling user:", user.email);
    // You can add your enrollment logic here
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex justify-center items-center text-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon-blue mx-auto mb-4"></div>
          <p>Loading event...</p>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-[#0f172a] flex flex-col justify-center items-center text-white">
        <h2 className="text-2xl font-bold mb-4">Event not found</h2>
        <p className="text-gray-400 mb-6">
          The event you're looking for doesn't exist or has been removed.
        </p>
        <button
          onClick={() => navigate("/events")}
          className="px-6 py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold rounded-lg hover:shadow-glow transition-all duration-300"
        >
          Back to Events
        </button>
      </div>
    );
  }

  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
      {/* Header */}
      <div className="glass-panel border-b border-white/10">
        <div className="container mx-auto px-6 py-6 flex items-center gap-4">
          <button
            onClick={() => navigate("/events")}
            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-5 h-5" /> Back to Events
          </button>
          <h1 className="text-2xl font-bold">Event Details</h1>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative w-full h-64 md:h-96">
        <img
          src={event.img_url}
          alt={event.title}
          className="absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src =
              "https://via.placeholder.com/800x400/1e293b/64748b?text=Event+Image";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="absolute bottom-6 left-6 right-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400 border border-blue-400/30 backdrop-blur-sm mb-4">
            <Globe className="w-4 h-4" />
            <span className="capitalize">{event.mode}</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-2 leading-tight">
            {event.title}
          </h2>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-6 py-8 max-w-2xl">
        <div className="flex flex-col gap-8">
          {/* Main Content - Stacked Vertically */}
          <div className="space-y-8">
            {/* About Section */}
            <div className="glass-panel rounded-2xl border border-white/10 p-6">
              <h2 className="text-2xl font-bold mb-4">About This Event</h2>
              <p className="text-gray-300 leading-relaxed whitespace-pre-line break-words">
                {event.full_description || event.description}
              </p>
            </div>

            {/* Agenda Section (if available) */}
            {event.agenda && event.agenda.length > 0 && (
              <div className="glass-panel rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-bold mb-4">Event Agenda</h3>
                <ul className="space-y-2">
                  {event.agenda.map((item, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 bg-neon-blue/20 text-neon-blue rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </span>
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Requirements Section (if available) */}
            {event.requirements && event.requirements.length > 0 && (
              <div className="glass-panel rounded-2xl border border-white/10 p-6">
                <h3 className="text-xl font-bold mb-4">Requirements</h3>
                <ul className="space-y-2">
                  {event.requirements.map((req, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-2 h-2 bg-neon-purple rounded-full mt-2"></span>
                      <span className="text-gray-300">{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Event Information */}
          <div className="glass-panel rounded-2xl border border-neon-blue/20 p-6">
            <h3 className="text-xl font-bold mb-4">Event Information</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-neon-blue flex-shrink-0" />
                <span className="text-gray-300">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-neon-blue flex-shrink-0" />
                <span className="text-gray-300">{event.time}</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-neon-blue flex-shrink-0 mt-0.5" />
                <span className="text-gray-300">{event.venue}</span>
              </div>
              <div className="flex items-center gap-3">
                <Users className="w-5 h-5 text-neon-blue flex-shrink-0" />
                <span className="text-gray-300">
                  {event.attendees ?? "?"}/{event.max_participants} Participants
                </span>
              </div>
              {event.organizer && (
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-neon-blue flex-shrink-0" />
                  <span className="text-gray-300">{event.organizer}</span>
                </div>
              )}
            </div>
          </div>

          {/* Contact Information */}
          {(event.contact_1 || event.contact_2) && (
            <div className="glass-panel rounded-2xl border border-neon-purple/20 p-6">
              <h3 className="text-xl font-bold mb-4">Contact Information</h3>
              <div className="space-y-3">
                {event.contact_1 && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-neon-purple flex-shrink-0" />
                    <a
                      href={`tel:${event.contact_1}`}
                      className="text-gray-300 hover:text-neon-purple transition-colors"
                    >
                      {event.contact_1}
                    </a>
                  </div>
                )}
                {event.contact_2 && (
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-neon-purple flex-shrink-0" />
                    <a
                      href={`tel:${event.contact_2}`}
                      className="text-gray-300 hover:text-neon-purple transition-colors"
                    >
                      {event.contact_2}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Enrollment Section */}
          <div className="glass-panel rounded-2xl border border-neon-purple/20 p-6">
            <h3 className="text-xl font-bold mb-4">Ready to Join?</h3>
            <p className="text-gray-300 text-sm mb-6">
              Secure your spot in this exclusive event. Limited seats available!
            </p>

            {/* Show different states based on user login status */}
            {user ? (
              <div className="space-y-3">
                <button
                  onClick={handleEnrollClick}
                  className="w-full py-3 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold rounded-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neon-blue/50"
                >
                  Enroll Now
                </button>
                <p className="text-xs text-gray-400 text-center">
                  Logged in as {user.email}
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                <button
                  onClick={handleEnrollClick}
                  className="w-full py-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white font-semibold rounded-lg hover:from-neon-blue hover:to-neon-purple hover:shadow-glow transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-neon-blue/50"
                >
                  Login to Enroll
                </button>
                <p className="text-xs text-gray-400 text-center">
                  You need to login to enroll in events
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default EventDetailPage;
