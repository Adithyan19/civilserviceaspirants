import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './Footer';
import axios from 'axios';
import { 
  Calendar, 
  FileText, 
  Newspaper, 
  Globe, 
  Download,
  Eye,
  Clock,
  MapPin,
  Users
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface DashboardProps {
  user: { email: string } | null;
  onOpenPDF: (url: string, title: string, type: 'newspaper' | 'question') => void;
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
  url: string; // ✅ new field for external link
}


const Dashboard: React.FC<DashboardProps> = ({ user, onOpenPDF }) => {
  const [activeSection, setActiveSection] = useState('events');
  const [questionPapers, setQuestionPapers] = useState<QuestionPaper[]>([]);
  const [loadingQP, setLoadingQP] = useState(false);
  const [errorQP, setErrorQP] = useState<string | null>(null);
  const [newspapers, setNewspapers] = useState<Newspaper[]>([]);
  const [loadingNP, setLoadingNP] = useState(false);
  const [errorNP, setErrorNP] = useState<string | null>(null);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loadingNews, setLoadingNews] = useState(false);
  const [errorNews, setErrorNews] = useState<string | null>(null);


  useEffect(() => {
    // Animate dashboard entrance
    gsap.fromTo('.dashboard-header',
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    gsap.fromTo('.dashboard-nav',
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: 0.2 }
    );

    gsap.fromTo('.dashboard-content',
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, delay: 0.4 }
    );

    // Animate cards on scroll
    gsap.fromTo('.dashboard-card',
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
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);
  
    useEffect(() => {
      // Fetch question papers from backend
      const fetchQuestionPapers = async () => {
        setLoadingQP(true);
        setErrorQP(null);
        try {
          const res = await axios.get<QuestionPaper[]>('http://localhost:5000/api/sendquestions');
          setQuestionPapers(res.data);
        } catch (err) {
          setErrorQP('Failed to fetch question papers');
        } finally {
          setLoadingQP(false);
        }
      };

      if (activeSection === 'questions') {
        fetchQuestionPapers();
      }
    }, [activeSection]);

    useEffect(() => {
  const fetchNewspapers = async () => {
    setLoadingNP(true);
    setErrorNP(null);
    try {
      const res = await axios.get<Newspaper[]>('http://localhost:5000/api/sendnewspapers');
      setNewspapers(res.data);
    } catch (err) {
      setErrorNP('Failed to fetch newspapers');
    } finally {
      setLoadingNP(false);
    }
  };

  if (activeSection === 'newspapers') {
    fetchNewspapers();
  }
}, [activeSection]);


useEffect(() => {
  const fetchNews = async () => {
    setLoadingNews(true);
    setErrorNews(null);
    try {
      const res = await axios.get<NewsItem[]>('http://localhost:5000/api/getnews');
      setNews(res.data);
    } catch (err) {
      setErrorNews('Failed to fetch news');
    } finally {
      setLoadingNews(false);
    }
  };

  if (activeSection === 'news') {
    fetchNews();
  }
}, [activeSection]);


  const sections = [
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'questions', label: 'Question Papers', icon: FileText },
    { id: 'newspapers', label: 'Newspapers', icon: Newspaper },
    { id: 'news', label: 'News', icon: Globe }
  ];

  // const mockEvents = [
  //   {
  //     id: 1,
  //     title: 'UPSC Prelims Mock Test',
  //     date: '2024-02-15',
  //     time: '10:00 AM',
  //     location: 'Main Auditorium',
  //     attendees: 150,
  //     description: 'Comprehensive mock test covering all subjects for UPSC Prelims preparation.'
  //   },
  //   {
  //     id: 2,
  //     title: 'Current Affairs Workshop',
  //     date: '2024-02-20',
  //     time: '2:00 PM',
  //     location: 'Conference Hall',
  //     attendees: 80,
  //     description: 'Interactive session on recent developments in national and international affairs.'
  //   },
  //   {
  //     id: 3,
  //     title: 'Interview Preparation Seminar',
  //     date: '2024-02-25',
  //     time: '11:00 AM',
  //     location: 'Seminar Hall',
  //     attendees: 60,
  //     description: 'Expert guidance on personality test and interview techniques.'
  //   }
  // ];

  const mockNews = [
    {
      id: 1,
      title: 'UPSC Notification 2024: 1000+ Vacancies Announced',
      excerpt: 'Union Public Service Commission has released the official notification for Civil Services Examination 2024...',
      date: '2024-01-10',
      category: 'UPSC'
    },
    {
      id: 2,
      title: 'New Pattern Changes in Kerala PSC Examinations',
      excerpt: 'Kerala Public Service Commission introduces significant changes in examination pattern for various posts...',
      date: '2024-01-08',
      category: 'Kerala PSC'
    },
    {
      id: 3,
      title: 'Success Story: TKMCE Alumni Clears IAS with AIR 15',
      excerpt: 'Congratulations to our alumnus who secured All India Rank 15 in UPSC Civil Services Examination...',
      date: '2024-01-05',
      category: 'Success Story'
    }
  ];




  const renderContent = () => {
    switch (activeSection) {
      case 'events':
        return (
          // <div className="grid gap-6">
          //   {mockEvents.map((event) => (
          //     <div key={event.id} className="dashboard-card glass-panel p-6 rounded-xl border border-neon-blue/20">
          //       <div className="flex items-start justify-between mb-4">
          //         <h3 className="text-xl font-semibold text-white glow-text">{event.title}</h3>
          //         <div className="flex items-center space-x-2 text-neon-blue">
          //           <Users className="w-4 h-4" />
          //           <span className="text-sm">{event.attendees}</span>
          //         </div>
          //       </div>
          //       <p className="text-gray-300 mb-4">{event.description}</p>
          //       <div className="flex items-center space-x-6 text-sm text-gray-400">
          //         <div className="flex items-center space-x-2">
          //           <Calendar className="w-4 h-4" />
          //           <span>{event.date}</span>
          //         </div>
          //         <div className="flex items-center space-x-2">
          //           <Clock className="w-4 h-4" />
          //           <span>{event.time}</span>
          //         </div>
          //         <div className="flex items-center space-x-2">
          //           <MapPin className="w-4 h-4" />
          //           <span>{event.location}</span>
          //         </div>
          //       </div>
          //     </div>
          //   ))}
          // </div>
          <div></div>
        );

      case 'questions':
        if (loadingQP) return <p className="text-gray-400">Loading question papers...</p>;
        if (errorQP) return <p className="text-red-500">{errorQP}</p>;

        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questionPapers.map((paper) => (
              <div key={paper.id} className="dashboard-card glass-panel p-6 rounded-xl border border-neon-blue/20">
                <div className="flex items-center mb-4">
                  <FileText className="w-8 h-8 text-neon-blue mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{paper.title}</h3>
                    <p className="text-sm text-gray-400">{paper.subject} • {paper.year}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => {
                      console.log("Opening PDF:", paper.url);  // ✅ ADDED
                      onOpenPDF(paper.url, paper.title, 'question');
                    }}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 
                            bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue rounded-lg 
                            transition-all duration-300 hover:scale-105"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <a
                    href={paper.url}
                    download
                    className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 
                            bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple rounded-lg 
                            transition-all duration-300 hover:scale-105"
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
            <div key={paper.id} className="dashboard-card glass-panel p-6 rounded-xl border border-neon-blue/20">
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
                  className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 
                          bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue rounded-lg 
                          transition-all duration-300 hover:scale-105"
                >
                  <Eye className="w-4 h-4" />
                  <span>Read</span>
                </button>
                <a
                  href={paper.url}
                  download
                  className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 
                          bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple rounded-lg 
                          transition-all duration-300 hover:scale-105"
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

      return (
        <div className="grid gap-6">
          {news.map((newsItem) => (
            <div
              key={newsItem.id}
              className="dashboard-card glass-panel p-6 rounded-xl border border-neon-blue/20"
            >
              <div className="flex items-start justify-between mb-3">
                <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue text-xs rounded-full">
                  {newsItem.category}
                </span>
                <span className="text-sm text-gray-400">{newsItem.date}</span>
              </div>
              <h3 className="text-xl font-semibold text-white glow-text mb-3">
                {newsItem.title}
              </h3>
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
      );



      default:
        return null;
    }
  };

  return (
    <div data-scroll-container className="bg-[#0f172a]">
      <div data-scroll-section>

      {/* Header */}
      <div className="dashboard-header sticky top-0 z-40 glass-panel border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white glow-text">Dashboard</h1>
              <p className="text-gray-400">Welcome back, {user?.email}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full 
                            flex items-center justify-center text-white font-semibold">
                {user?.email.charAt(0).toUpperCase()}
              </div>
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
      <div className="dashboard-content container mx-auto px-6">
        {renderContent()}
      </div>

      {/* Footer */}
      <div className="mt-12">
        <Footer />
      </div>
      </div>
    </div>
  );
};

export default Dashboard;