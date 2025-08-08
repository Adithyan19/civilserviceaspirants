import React, { useEffect, useState, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import axios from 'axios';
import {
  Calendar,
  FileText,
  Newspaper,
  Globe,
  Download,
  Eye,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DashboardProps {
  user: { email: string; name: string } | null;
  onOpenPDF: (url: string, title: string, type: 'newspaper' | 'question') => void;
  onLogout?: () => void;
}

interface QuestionPaper {
  id: string;
  title: string;
  subject: string;
  year: string;
  url: string;
}

interface Newspaper {
  id: string;
  title: string;
  date: string;
  url: string;
}

interface NewsItem {
  id: string;
  category: string;
  date: string;
  title: string;
  url: string;
  posted_at: string;
}

interface EventItem {
  id: string;
  title: string;
  description: string;
  max_participants: number;
  venue: string;
  mode: string;
  date: string;
  time: string;
  img_url: string;
  organizer_contact_1: string;
  organizer_contact_2: string;
}


const Dashboard: React.FC<DashboardProps> = ({ user, onOpenPDF, onLogout }) => {
  const [activeSection, setActiveSection] = useState('events');
  const navigate = useNavigate();
  // Data states
  const [questionPapers, setQuestionPapers] = useState<QuestionPaper[]>([]);
  const [loadingQP, setLoadingQP] = useState(false);
  const [errorQP, setErrorQP] = useState<string | null>(null);

  const [newspapers, setNewspapers] = useState<Newspaper[]>([]);
  const [loadingNP, setLoadingNP] = useState(false);
  const [errorNP, setErrorNP] = useState<string | null>(null);

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [errorNews, setErrorNews] = useState<string | null>(null);

  const [events, setEvents] = useState<EventItem[]>([]);
  const [loadingEvents, setLoadingEvents] = useState(false);
  const [errorEvents, setErrorEvents] = useState<string | null>(null);

  const [selectedCategory, setSelectedCategory] = useState<string>('TKMCE');
  const categories = ['Global', 'India', 'Kerala', 'TKMCE', 'Placement', 'UPSC'];

  // Dropdown state for user menu
  const [showUserDropdown, setShowUserDropdown] = useState(false);

  // Ref for dropdown to handle outside clicks
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Effect to close dropdown when clicking outside
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

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showUserDropdown]);

  // GSAP animation on mount
  useEffect(() => {
    gsap.fromTo(
      '.dashboard-header',
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );
    gsap.fromTo(
      '.dashboard-nav',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.2 }
    );
    gsap.fromTo(
      '.dashboard-content',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.4 }
    );
    gsap.fromTo(
      '.dashboard-card',
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: '.dashboard-content',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
    );
  }, []);

  // Handle logout
  const handleLogout = () => {
    setShowUserDropdown(false);
    if (onLogout) {
      onLogout();
    }
    alert('Logging out...');
    navigate('/');
  };

  useEffect(() => {
    if (activeSection === "events") {
      (async () => {
        setLoadingEvents(true);
        setErrorEvents(null);
        try {
          const res = await axios.get<EventItem[]>(
            "http://localhost:5000/api/getevents"
          );
          setEvents(res.data);
        } catch {
          setErrorEvents("Failed to fetch events");
        } finally {
          setLoadingEvents(false);
        }
      })();
    }
  }, [activeSection]);
  // Fetch question papers
    useEffect(() => {
    if (activeSection === 'questions') {
      (async () => {
        setLoadingQP(true);
        setErrorQP(null);
        try {
          const res = await axios.get<QuestionPaper[]>('http://localhost:5000/api/sendquestions');
          setQuestionPapers(res.data);
        } catch {
          setErrorQP('Failed to fetch question papers');
        } finally {
          setLoadingQP(false);
        }
      })();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === 'newspapers') {
      (async () => {
        setLoadingNP(true);
        setErrorNP(null);
        try {
          const res = await axios.get<Newspaper[]>('http://localhost:5000/api/sendnewspapers');
          setNewspapers(res.data);
        } catch {
          setErrorNP('Failed to fetch newspapers');
        } finally {
          setLoadingNP(false);
        }
      })();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === 'news') {
      (async () => {
        setLoadingNews(true);
        setErrorNews(null);
        try {
          const res = await axios.get<NewsItem[]>('http://localhost:5000/api/getnews');
          setNews(res.data);
        } catch {
          setErrorNews('Failed to fetch news');
        } finally {
          setLoadingNews(false);
        }
      })();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === 'news') {
      const foundCategory = categories.find((cat) =>
        news.some((n) => n.category?.toLowerCase() === cat.toLowerCase())
      );
      setSelectedCategory(foundCategory || 'TKMCE');
    }
  }, [news, activeSection]);

  const sections = [
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'questions', label: 'Question Papers', icon: FileText },
    { id: 'newspapers', label: 'Newspapers', icon: Newspaper },
    { id: 'news', label: 'News', icon: Globe },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case "events":
  if (loadingEvents) return <p className="text-gray-400">Loading events...</p>;
  if (errorEvents) return <p className="text-red-500">{errorEvents}</p>;
  return (
    <div className="grid gap-8 justify-items-center">
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-gradient-to-br from-gray-800 to-gray-900/80 rounded-2xl shadow-xl border border-white/10 overflow-hidden w-[90%] md:w-[60%] lg:w-[40%] transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:border-neon-blue/30"
        >
          {/* Event image */}
          <img
            src={event.img_url}
            alt={event.title}
            className="w-full h-56 object-cover"
          />
          
          {/* Card content */}
          <div className="p-6 flex flex-col gap-5 text-white">
            {/* Title */}
            <h3 className="text-2xl font-bold text-center text-white">
              {event.title}
            </h3>
            
            {/* Description */}
            <p className="text-gray-300 text-sm text-center leading-relaxed">
              {event.description.length > 150
                ? event.description.substring(0, 150) + "..."
                : event.description}
            </p>
            
            {/* Event info section */}
            <div className="grid grid-cols-2 gap-6 text-sm">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-neon-blue text-lg">📅</span>
                  <div>
                    <span className="text-white font-bold">Date: </span>
                    <span className="text-gray-300 font-medium">
                      {new Date(event.date).toLocaleDateString('en-US', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-neon-purple text-lg">🕒</span>
                  <div>
                    <span className="text-white font-bold">Time: </span>
                    <span className="text-gray-300 font-medium">{event.time}</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="text-orange-400 text-lg">📺</span>
                  <div>
                    <span className="text-white font-bold">Mode: </span>
                    <span className="text-gray-300 font-medium">{event.mode}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-lg">📍</span>
                  <div>
                    <span className="text-white font-bold">Venue: </span>
                    <span className="text-gray-300 font-medium">{event.venue}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Footer - slots + button */}
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">
                🎟 Max: <span className="text-white font-semibold">{event.max_participants}</span>
              </span>
              <button
                onClick={() => navigate(`/event/${event.id}`)}
                className="bg-neon-blue hover:bg-neon-blue/80 px-6 py-2 rounded-lg text-sm text-white font-semibold transition-all duration-300"
              >
                Enroll
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );




      case 'questions':
        if (loadingQP) return <p className="text-gray-400">Loading question papers...</p>;
        if (errorQP) return <p className="text-red-500">{errorQP}</p>;

        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questionPapers.map((paper) => (
              <div
                key={paper.id}
                className="dashboard-card glass-panel p-6 rounded-xl border border-neon-blue/20"
              >
                <div className="flex items-center mb-4">
                  <FileText className="w-8 h-8 text-neon-blue mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{paper.title}</h3>
                    <p className="text-sm text-gray-400">
                      {paper.subject} • {paper.year}
                    </p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => onOpenPDF(paper.url, paper.title, 'question')}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <a
                    href={paper.url}
                    download
                    className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        );

      case 'newspapers':
        if (loadingNP) return <p className="text-gray-400">Loading newspapers...</p>;
        if (errorNP) return <p className="text-red-500">{errorNP}</p>;

        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {newspapers.map((paper) => (
              <div
                key={paper.id}
                className="dashboard-card glass-panel p-6 rounded-xl border border-neon-blue/20"
              >
                <div className="flex items-center mb-4">
                  <Newspaper className="w-8 h-8 text-neon-blue mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{paper.title}</h3>
                    <p className="text-sm text-gray-400">{paper.date}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => onOpenPDF(paper.url, paper.title, 'newspaper')}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Read</span>
                  </button>
                  <a
                    href={paper.url}
                    download
                    className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple rounded-lg transition-all duration-300 hover:scale-105"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        );

      case 'news':
        if (loadingNews) return <p className="text-gray-400">Loading news...</p>;
        if (errorNews) return <p className="text-red-500">{errorNews}</p>;
        if (!news || !Array.isArray(news))
          return <p className="text-red-500">News data is unavailable</p>;

        const filteredNews = news.filter(
          (n) => n?.category?.toLowerCase() === selectedCategory.toLowerCase()
        );

        return (
          <div className="space-y-8">
            {/* Category buttons */}
            <div className="flex flex-wrap gap-4 mb-6">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`
                      flex-1 min-w-[120px] px-6 py-3 rounded-lg font-medium text-center transition-colors 
                      ${
                        isActive
                          ? 'bg-neon-blue text-white border border-neon-blue'
                          : 'bg-white/10 text-gray-300 border border-transparent hover:bg-neon-blue/50 hover:text-white'
                      }
                    `}
                  >
                    {category}
                  </button>
                );
              })}
            </div>

            <h2 className="text-xl font-semibold text-white mt-4">
              Showing: <span className="text-neon-blue">{selectedCategory} News</span>
            </h2>

            {/* News Cards */}
            {filteredNews.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredNews.map((newsItem) => (
                  <div
                    key={newsItem.id}
                    className="dashboard-card glass-panel p-6 rounded-xl border border-neon-blue/20"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue text-xs rounded-full">
                        {newsItem.category}
                      </span>
                      <span className="text-sm text-gray-400">{newsItem.posted_at || 'Unknown'}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white glow-text mb-3">{newsItem.title}</h3>
                    <a
                      href={newsItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 inline-block text-neon-blue hover:text-neon-purple transition-colors"
                    >
                      Read More →
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No news found for this category.</p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-[#0f172a] min-h-screen">
      {/* Header - sticky removed */}
      <div className="dashboard-header relative z-40 glass-panel border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <button className="text-2xl font-bold text-white glow-text hover:text-neon-blue transition-colors cursor-pointer flex items-center space-x-2">
                <span>Dashboard</span>
              </button>
              <p className="text-gray-400">Welcome back, {user?.name}</p>
            </div>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowUserDropdown((show) => !show)}
                aria-haspopup="true"
                aria-expanded={showUserDropdown}
                className="flex items-center space-x-2 px-3 py-2 bg-glass-bg backdrop-blur-sm
                  border border-white/20 rounded-full hover:border-neon-blue/50
                  hover:shadow-glow transition-all duration-300 group"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full
                                flex items-center justify-center text-white font-semibold text-sm">
                  {user?.name.charAt(0).toUpperCase()}
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
                  <div className="absolute right-0 mt-2 w-80 bg-gray-900/95 backdrop-blur-md 
                                  border border-white/20 rounded-2xl shadow-2xl z-[1000] overflow-hidden">
                    <div className="bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 px-6 py-4 border-b border-white/10">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full 
                                      flex items-center justify-center text-white font-bold text-lg">
                          {user?.email.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <h3 className="text-white font-semibold">{user?.name}</h3>
                          <p className="text-gray-400 text-sm">{user?.email}</p>
                          <span className="inline-block px-2 py-1 rounded-full text-xs font-medium mt-1 bg-neon-blue/20 text-neon-blue">
                            Student
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="py-2">
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          navigate('/account', { state: { email: user?.email } });
                        }}
                        className="w-full px-6 py-3 text-left text-white hover:bg-white/10 
                                 flex items-center space-x-3 transition-all duration-300 group"
                      >
                        <User className="w-5 h-5 text-neon-blue" />
                        <div>
                          <p className="font-medium">Account Details</p>
                          <p className="text-xs text-gray-400">View and manage your profile</p>
                        </div>
                      </button>
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          navigate('/profile');
                        }}
                        className="w-full px-6 py-3 text-left text-white hover:bg-white/10 
                                 flex items-center space-x-3 transition-all duration-300 group"
                      >
                        <Settings className="w-5 h-5 text-neon-purple" />
                        <div>
                          <p className="font-medium">Profile</p>
                          <p className="text-xs text-gray-400">Manage your preferences</p>
                        </div>
                      </button>
                      <div className="border-t border-white/10 my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-6 py-3 text-left text-red-400 hover:bg-red-500/10 
                                 flex items-center space-x-3 transition-all duration-300 group"
                      >
                        <LogOut className="w-5 h-5" />
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

      {/* Navigation */}
      <div className="dashboard-nav container mx-auto px-6 py-6">
        <div className="flex space-x-1 bg-white/5 p-1 rounded-xl border border-white/10">
          {sections.map((section) => {
            const Icon = section.icon;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg 
                          transition-all duration-300 ${
                  activeSection === section.id
                    ? 'bg-neon-blue/20 text-neon-blue border border-neon-blue/30'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content */}
      <div className="dashboard-content container mx-auto px-6 py-8">
        {renderContent()}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;