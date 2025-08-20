import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
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
  Menu,
  X,
  Search,
  Filter,
} from "lucide-react";
import { api } from "../utils/api";

gsap.registerPlugin(ScrollTrigger);

interface DashboardProps {
  user: { email: string; name: string } | null;
  onOpenPDF: (
    url: string,
    title: string,
    type: "newspaper" | "question",
  ) => void;
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
  const [activeSection, setActiveSection] = useState("events");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
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

  const [selectedCategory, setSelectedCategory] = useState<string>("TKMCE");
  const categories = [
    "Global",
    "India",
    "Kerala",
    "TKMCE",
    "Placement",
    "UPSC",
  ];

  // Search & Filter states for EVENTS
  const [searchTerm, setSearchTerm] = useState("");
  const [filterMode, setFilterMode] = useState<
    "all" | "online" | "offline" | "hybrid"
  >("all");

  const dropdownRef = useRef<HTMLDivElement>(null);
  const [showUserDropdown, setShowUserDropdown] = useState(false);

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
    gsap.fromTo(
      ".dashboard-header",
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
    );
    gsap.fromTo(
      ".dashboard-nav",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.2 },
    );
    gsap.fromTo(
      ".dashboard-content",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.4 },
    );
    gsap.fromTo(
      ".dashboard-card",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        scrollTrigger: {
          trigger: ".dashboard-content",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    );
  }, []);

  const handleLogout = () => {
    setShowUserDropdown(false);
    if (onLogout) onLogout();
    navigate("/");
  };

  // Fetch events
  useEffect(() => {
    if (activeSection === "events") {
      (async () => {
        setLoadingEvents(true);
        setErrorEvents(null);
        try {
          const res = await api.get<EventItem[]>("/api/getevents");
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
    if (activeSection === "questions") {
      (async () => {
        setLoadingQP(true);
        setErrorQP(null);
        try {
          const res = await api.get<QuestionPaper[]>("/api/sendquestions");
          setQuestionPapers(res.data);
        } catch {
          setErrorQP("Failed to fetch question papers");
        } finally {
          setLoadingQP(false);
        }
      })();
    }
  }, [activeSection]);

  // Fetch newspapers
  useEffect(() => {
    if (activeSection === "newspapers") {
      (async () => {
        setLoadingNP(true);
        setErrorNP(null);
        try {
          const res = await api.get<Newspaper[]>("/api/sendnewspapers");
          setNewspapers(res.data);
        } catch {
          setErrorNP("Failed to fetch newspapers");
        } finally {
          setLoadingNP(false);
        }
      })();
    }
  }, [activeSection]);

  // Fetch news
  useEffect(() => {
    if (activeSection === "news") {
      (async () => {
        setLoadingNews(true);
        setErrorNews(null);
        try {
          const res = await api.get<NewsItem[]>("/api/getnews");
          setNews(res.data);
        } catch {
          setErrorNews("Failed to fetch news");
        } finally {
          setLoadingNews(false);
        }
      })();
    }
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === "news") {
      const foundCategory = categories.find((cat) =>
        news.some((n) => n.category?.toLowerCase() === cat.toLowerCase()),
      );
      setSelectedCategory(foundCategory || "TKMCE");
    }
  }, [news, activeSection]);

  const sections = [
    { id: "events", label: "Events", icon: Calendar },
    { id: "questions", label: "Question Papers", icon: FileText },
    { id: "newspapers", label: "Newspapers", icon: Newspaper },
    { id: "news", label: "News", icon: Globe },
  ];

  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterMode === "all" || event.mode.toLowerCase() === filterMode;
    return matchesSearch && matchesFilter;
  });

  const renderContent = () => {
    switch (activeSection) {
      case "events":
        if (loadingEvents)
          return (
            <p className="text-gray-400 text-center py-8">Loading events...</p>
          );
        if (errorEvents)
          return <p className="text-red-500 text-center py-8">{errorEvents}</p>;
        return (
          <div className="max-w-lg sm:max-w-xl md:max-w-3xl lg:max-w-4xl mx-auto px-4 space-y-6">
            {/* Search + Filter Bar */}
            <div className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto mb-6">
              {/* Search with Icon */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/50"
                />
              </div>

              {/* Filter with Icon */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                <select
                  value={filterMode}
                  onChange={(e) => setFilterMode(e.target.value as any)}
                  className="pl-10 pr-8 py-2 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:border-neon-blue/50 focus:ring-1 focus:ring-neon-blue/50 appearance-none"
                >
                  <option className="bg-[#0f172a]" value="all">
                    All Events
                  </option>
                  <option className="bg-[#0f172a]" value="online">
                    Online
                  </option>
                  <option className="bg-[#0f172a]" value="offline">
                    Offline
                  </option>
                  <option className="bg-[#0f172a]" value="hybrid">
                    Hybrid
                  </option>
                </select>
              </div>
            </div>

            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-gradient-to-br from-gray-800 to-gray-900/80 rounded-2xl shadow-xl border border-white/10 overflow-hidden w-full max-w-md mx-auto transition-all duration-500 transform hover:scale-[1.02] hover:shadow-2xl hover:border-neon-blue/30"
              >
                <img
                  src={event.img_url}
                  alt={event.title}
                  className="w-full h-40 sm:h-48 md:h-56 object-cover"
                />
                <div className="p-4 sm:p-6 flex flex-col gap-3 sm:gap-4 text-white">
                  <h3 className="text-lg sm:text-xl font-bold text-center leading-tight">
                    {event.title}
                  </h3>
                  <p className="text-gray-300 text-xs sm:text-sm text-center leading-relaxed px-2">
                    {event.description.length > 40
                      ? event.description.substring(0, 40) + "..."
                      : event.description}
                  </p>
                  <div className="space-y-3 sm:grid sm:grid-cols-2 sm:gap-5 sm:space-y-0 text-xs sm:text-sm">
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-neon-blue text-lg">📅</span>
                        <div>
                          <span className="text-white font-semibold block">
                            Date
                          </span>
                          <span className="text-gray-300">
                            {new Date(event.date).toLocaleDateString("en-US", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-neon-purple text-lg">🕒</span>
                        <div>
                          <span className="text-white font-semibold block">
                            Time
                          </span>
                          <span className="text-gray-300">{event.time}</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <span className="text-orange-400 text-lg">📺</span>
                        <div>
                          <span className="text-white font-semibold block">
                            Mode
                          </span>
                          <span className="text-gray-300 capitalize">
                            {event.mode}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-start gap-2">
                        <span className="text-green-400 text-lg">📍</span>
                        <div>
                          <span className="text-white font-semibold block">
                            Venue
                          </span>
                          <span className="text-gray-300 break-words">
                            {event.venue}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:justify-between items-center gap-3 pt-3 border-t border-white/10">
                    <span className="text-gray-400 text-xs sm:text-sm">
                      🎟 Max Participants:{" "}
                      <span className="text-white font-semibold">
                        {event.max_participants}
                      </span>
                    </span>
                    <button
                      onClick={() => navigate(`/dashboard/event/${event.id}`)}
                      className="w-full sm:w-auto bg-neon-blue hover:bg-neon-blue/80 px-5 py-2 rounded-lg text-xs sm:text-sm font-semibold transition-all duration-300 min-w-[110px]"
                    >
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );
      case "questions":
        if (loadingQP)
          return (
            <p className="text-gray-400 text-center py-8">
              Loading question papers...
            </p>
          );
        if (errorQP)
          return <p className="text-red-500 text-center py-8">{errorQP}</p>;

        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {questionPapers.map((paper) => (
              <div
                key={paper.id}
                className="dashboard-card glass-panel p-4 sm:p-6 rounded-xl border border-neon-blue/20"
              >
                <div className="flex items-start mb-4">
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-neon-blue mr-3 flex-shrink-0 mt-1" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white leading-tight mb-1">
                      {paper.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {paper.subject} • {paper.year}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 sm:space-y-3">
                  <button
                    onClick={() =>
                      onOpenPDF(paper.url, paper.title, "question")
                    }
                    className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue rounded-lg transition-all duration-300 hover:scale-105 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <a
                    href={paper.url}
                    download
                    className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple rounded-lg transition-all duration-300 hover:scale-105 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        );

      case "newspapers":
        if (loadingNP)
          return (
            <p className="text-gray-400 text-center py-8">
              Loading newspapers...
            </p>
          );
        if (errorNP)
          return <p className="text-red-500 text-center py-8">{errorNP}</p>;

        return (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {newspapers.map((paper) => (
              <div
                key={paper.id}
                className="dashboard-card glass-panel p-4 sm:p-6 rounded-xl border border-neon-blue/20"
              >
                <div className="flex items-start mb-4">
                  <Newspaper className="w-6 h-6 sm:w-8 sm:h-8 text-neon-blue mr-3 flex-shrink-0 mt-1" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-base sm:text-lg font-semibold text-white leading-tight mb-1">
                      {paper.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400">
                      {paper.date}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col space-y-2 sm:space-y-3">
                  <button
                    onClick={() =>
                      onOpenPDF(paper.url, paper.title, "newspaper")
                    }
                    className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue rounded-lg transition-all duration-300 hover:scale-105 text-sm"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Read</span>
                  </button>
                  <a
                    href={paper.url}
                    download
                    className="flex items-center justify-center space-x-2 py-2.5 px-4 bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple rounded-lg transition-all duration-300 hover:scale-105 text-sm"
                  >
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        );

      case "news":
        if (loadingNews)
          return (
            <p className="text-gray-400 text-center py-8">Loading news...</p>
          );
        if (errorNews)
          return <p className="text-red-500 text-center py-8">{errorNews}</p>;
        if (!news || !Array.isArray(news))
          return (
            <p className="text-red-500 text-center py-8">
              News data is unavailable
            </p>
          );

        const filteredNews = news.filter(
          (n) => n?.category?.toLowerCase() === selectedCategory.toLowerCase(),
        );

        return (
          <div className="space-y-6 sm:space-y-8">
            {/* Category buttons - improved mobile layout */}
            <div className="space-y-4">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-wrap gap-2 sm:gap-3">
                {categories.map((category) => {
                  const isActive = selectedCategory === category;
                  return (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-3 sm:px-6 py-2 sm:py-3 rounded-lg font-medium text-center transition-colors text-xs sm:text-sm lg:text-base lg:flex-1 lg:min-w-[120px]
                        ${
                          isActive
                            ? "bg-neon-blue text-white border border-neon-blue"
                            : "bg-white/10 text-gray-300 border border-transparent hover:bg-neon-blue/50 hover:text-white"
                        }`}
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h2 className="text-lg sm:text-xl font-semibold text-white">
                Showing:{" "}
                <span className="text-neon-blue">{selectedCategory} News</span>
              </h2>
            </div>

            {filteredNews.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {filteredNews.map((newsItem) => (
                  <div
                    key={newsItem.id}
                    className="dashboard-card glass-panel p-4 sm:p-6 rounded-xl border border-neon-blue/20"
                  >
                    <div className="flex items-start justify-between mb-3 gap-2">
                      <span className="px-2 sm:px-3 py-1 bg-neon-blue/20 text-neon-blue text-xs rounded-full flex-shrink-0">
                        {newsItem.category}
                      </span>
                      <span className="text-xs text-gray-400 text-right">
                        {newsItem.posted_at || "Unknown"}
                      </span>
                    </div>
                    <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-white glow-text mb-3 leading-tight">
                      {newsItem.title}
                    </h3>
                    <a
                      href={newsItem.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block text-neon-blue hover:text-neon-purple transition-colors text-sm font-medium"
                    >
                      Read More →
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-400 text-center py-8">
                No news found for this category.
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-[#0f172a] min-h-screen">
      {/* Header - Mobile optimized */}
      <div className="dashboard-header relative z-40 glass-panel border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Left: Dashboard Title */}
            <div className="flex flex-col">
              <h1 className="text-xl sm:text-2xl font-bold text-white glow-text">
                Dashboard
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm mt-0.5">
                Welcome back, {user?.name}
              </p>
            </div>

            {/* Right: User dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setShowUserDropdown((show) => !show)}
                aria-haspopup="true"
                aria-expanded={showUserDropdown}
                className="flex items-center space-x-2 px-2 sm:px-3 py-2 bg-glass-bg backdrop-blur-sm border border-white/20 rounded-full hover:border-neon-blue/50 hover:shadow-glow transition-all duration-300 group"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                  {user?.name.charAt(0).toUpperCase()}
                </div>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 text-white group-hover:text-neon-blue" />
              </button>

              {showUserDropdown && (
                <>
                  {/* Overlay */}
                  <div
                    className="fixed inset-0 z-[998]"
                    onClick={() => setShowUserDropdown(false)}
                  />
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-gray-900/95 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl z-[999] overflow-hidden">
                    <div className="bg-gradient-to-r from-neon-blue/10 to-neon-purple/10 px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10">
                      <div className="flex items-center space-x-3 sm:space-x-4">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full flex items-center justify-center text-white font-bold text-base sm:text-lg">
                          {user?.email.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0 flex-1">
                          <h3 className="text-white font-semibold text-sm sm:text-base truncate">
                            {user?.name}
                          </h3>
                          <p className="text-gray-400 text-xs sm:text-sm truncate">
                            {user?.email}
                          </p>
                          <span className="inline-block px-2 py-0.5 sm:py-1 rounded-full text-xs font-medium mt-1 bg-neon-blue/20 text-neon-blue">
                            Student
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="py-1 sm:py-2">
                      <button
                        onClick={() => {
                          setShowUserDropdown(false);
                          navigate("/account", {
                            state: { email: user?.email },
                          });
                        }}
                        className="w-full px-4 sm:px-6 py-2 sm:py-3 text-left text-white hover:bg-white/10 flex items-center space-x-3 transition-all duration-300"
                      >
                        <User className="w-4 h-4 sm:w-5 sm:h-5 text-neon-blue flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm sm:text-base">
                            Account Details
                          </p>
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
                        className="w-full px-4 sm:px-6 py-2 sm:py-3 text-left text-white hover:bg-white/10 flex items-center space-x-3 transition-all duration-300"
                      >
                        <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-neon-purple flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm sm:text-base">
                            Profile
                          </p>
                          <p className="text-xs text-gray-400">
                            Manage your preferences
                          </p>
                        </div>
                      </button>
                      <div className="border-t border-white/10 my-1 sm:my-2"></div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 sm:px-6 py-2 sm:py-3 text-left text-red-400 hover:bg-red-500/10 flex items-center space-x-3 transition-all duration-300"
                      >
                        <LogOut className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-sm sm:text-base">
                            Sign Out
                          </p>
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

      {/* Navigation */}
      <div className="dashboard-nav container mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* Mobile: Hamburger menu */}
        <div className="block sm:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="w-full flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/10 text-white"
          >
            <span className="font-medium">
              {sections.find((s) => s.id === activeSection)?.label}
            </span>
            {isMobileMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>

          {isMobileMenuOpen && (
            <div className="mt-2 bg-white/5 rounded-xl border border-white/10 overflow-hidden">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => {
                      setActiveSection(section.id);
                      setIsMobileMenuOpen(false);
                    }}
                    className={`w-full flex items-center space-x-3 p-3 transition-all duration-300 border-b border-white/5 last:border-b-0 ${
                      isActive
                        ? "bg-neon-blue/20 text-neon-blue"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop / Tablet: Horizontal navigation */}
        <div className="hidden sm:flex flex-wrap bg-white/5 p-1 rounded-xl border border-white/10 justify-center space-x-1">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-all duration-300 text-sm md:text-base ${
                  isActive
                    ? "bg-neon-blue/20 text-neon-blue border border-neon-blue/30"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
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
      <div className="dashboard-content container mx-auto px-4 sm:px-6 py-8">
        {renderContent()}
      </div>

      <Footer />
    </div>
  );
};

export default Dashboard;
