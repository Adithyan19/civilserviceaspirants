import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, FileText, Newspaper, Heart, Eye, Download } from 'lucide-react';
import Footer from './Footer';

interface EnrolledEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

interface LikedPDF {
  id: number;
  title: string;
  type: 'newspaper' | 'question';
  date: string;
  subject?: string;
  likedAt: string;
}

interface ProfileProps {
  user: { email: string; role?: string } | null;
  onLogout: () => void;
  onOpenPDF: (url: string, title: string, type: 'newspaper' | 'question') => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onLogout, onOpenPDF }) => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'events' | 'pdfs'>('events');
  const [enrolledEvents, setEnrolledEvents] = useState<EnrolledEvent[]>([]);
  const [likedPDFs, setLikedPDFs] = useState<LikedPDF[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate fetching user's enrolled events and liked PDFs
    const fetchUserData = async () => {
      setLoading(true);

      // Mock enrolled events
      const mockEvents: EnrolledEvent[] = [
        {
          id: 1,
          title: 'UPSC Prelims Mock Test',
          date: '2024-02-15',
          time: '10:00 AM',
          location: 'Main Auditorium',
          status: 'upcoming'
        },
        {
          id: 2,
          title: 'Current Affairs Workshop',
          date: '2024-01-20',
          time: '2:00 PM',
          location: 'Conference Hall',
          status: 'completed'
        },
        {
          id: 3,
          title: 'Interview Preparation Seminar',
          date: '2024-02-25',
          time: '11:00 AM',
          location: 'Seminar Hall',
          status: 'upcoming'
        }
      ];

      // Mock liked PDFs
      const mockPDFs: LikedPDF[] = [
        {
          id: 1,
          title: 'The Hindu - Editorial Analysis',
          type: 'newspaper',
          date: '2024-01-15',
          likedAt: '2024-01-16'
        },
        {
          id: 2,
          title: 'UPSC Prelims 2023',
          type: 'question',
          date: '2023-06-15',
          subject: 'General Studies',
          likedAt: '2024-01-10'
        },
        {
          id: 3,
          title: 'Indian Express - Current Affairs',
          type: 'newspaper',
          date: '2024-01-14',
          likedAt: '2024-01-15'
        },
        {
          id: 4,
          title: 'Kerala PSC Degree Level',
          type: 'question',
          date: '2023-08-20',
          subject: 'General Knowledge',
          likedAt: '2024-01-08'
        }
      ];

      setTimeout(() => {
        setEnrolledEvents(mockEvents);
        setLikedPDFs(mockPDFs);
        setLoading(false);
      }, 1000);
    };

    fetchUserData();
  }, [user]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming':
        return 'text-neon-blue bg-neon-blue/20';
      case 'completed':
        return 'text-green-400 bg-green-400/20';
      case 'cancelled':
        return 'text-red-400 bg-red-400/20';
      default:
        return 'text-gray-400 bg-gray-400/20';
    }
  };

  const handleRemoveLike = (pdfId: number) => {
    setLikedPDFs((prev) => prev.filter((pdf) => pdf.id !== pdfId));
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
                onClick={() => navigate('/dashboard')}
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
                <h2 className="text-2xl font-bold text-white mb-1 break-words">{user?.email.split('@')[0]}</h2>
                <p className="text-gray-300 break-words">{user?.email}</p>
                <div className="flex flex-wrap space-x-0 space-y-2 mt-3 sm:space-x-4 sm:space-y-0">
                  <span className="inline-block px-3 py-1 bg-neon-blue/20 text-neon-blue rounded-full text-sm">
                    {enrolledEvents.length} Event{enrolledEvents.length !== 1 ? 's' : ''} Enrolled
                  </span>
                  <span className="inline-block px-3 py-1 bg-neon-purple/20 text-neon-purple rounded-full text-sm">
                    {likedPDFs.length} PDF{likedPDFs.length !== 1 ? 's' : ''} Liked
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-col sm:flex-row sm:space-x-1 bg-white/5 p-1 rounded-xl border border-white/10 mb-8">
            <button
              onClick={() => setActiveTab('events')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 mb-2 sm:mb-0 ${
                activeTab === 'events'
                  ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Calendar className="w-5 h-5" />
              <span className="font-medium">Enrolled Events</span>
            </button>
            <button
              onClick={() => setActiveTab('pdfs')}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 ${
                activeTab === 'pdfs'
                  ? 'bg-neon-purple/20 text-neon-purple border border-neon-purple/30'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Heart className="w-5 h-5" />
              <span className="font-medium">Liked PDFs</span>
            </button>
          </div>

          {/* Tab Content */}
          {activeTab === 'events' ? (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Your Enrolled Events</h3>
              {enrolledEvents.length === 0 ? (
                <div className="glass-panel p-8 rounded-2xl border border-white/10 text-center">
                  <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No events enrolled yet</p>
                  <p className="text-gray-500 mt-2">Browse events in the dashboard to get started</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {enrolledEvents.map((event) => (
                    <div
                      key={event.id}
                      className="glass-panel p-6 rounded-xl border border-neon-blue/20 flex flex-col justify-between"
                    >
                      <div className="mb-4">
                        <h4 className="text-xl font-semibold text-white mb-2">{event.title}</h4>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium inline-block ${getStatusColor(
                            event.status
                          )}`}
                        >
                          {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex flex-col space-y-2 text-sm text-gray-400">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span>{event.location}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-white mb-4">Your Liked PDFs</h3>
              {likedPDFs.length === 0 ? (
                <div className="glass-panel p-8 rounded-2xl border border-white/10 text-center">
                  <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-400 text-lg">No PDFs liked yet</p>
                  <p className="text-gray-500 mt-2">Like newspapers and question papers to save them here</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {likedPDFs.map((pdf) => (
                    <div
                      key={pdf.id}
                      className="glass-panel p-6 rounded-xl border border-neon-purple/20 flex flex-col"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          {pdf.type === 'newspaper' ? (
                            <Newspaper className="w-8 h-8 text-neon-blue" />
                          ) : (
                            <FileText className="w-8 h-8 text-neon-purple" />
                          )}
                          <div>
                            <h4 className="text-lg font-semibold text-white leading-tight">{pdf.title}</h4>
                            <p className="text-sm text-gray-400">
                              {pdf.type === 'question' && pdf.subject ? `${pdf.subject} • ` : ''}
                              {pdf.date}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveLike(pdf.id)}
                          className="text-red-400 hover:text-red-300 transition-colors"
                          title="Remove from liked"
                        >
                          <Heart className="w-5 h-5 fill-current" />
                        </button>
                      </div>

                      <div className="flex space-x-3 mt-auto">
                        <button
                          onClick={() =>
                            onOpenPDF(
                              `/pdfs/${pdf.title.toLowerCase().replace(/\s+/g, '-')}.pdf`,
                              pdf.title,
                              pdf.type
                            )
                          }
                          className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue rounded-lg transition-all duration-300"
                        >
                          <Eye className="w-4 h-4" />
                          <span>View</span>
                        </button>
                        <button
                          className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple rounded-lg transition-all duration-300"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                      </div>

                      <p className="text-xs text-gray-500 mt-3">
                        Liked on {new Date(pdf.likedAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
