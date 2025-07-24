import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Footer from './Footer';
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

const Dashboard: React.FC<DashboardProps> = ({ user, onOpenPDF }) => {
  const [activeSection, setActiveSection] = useState('events');

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

  const sections = [
    { id: 'events', label: 'Events', icon: Calendar },
    { id: 'questions', label: 'Question Papers', icon: FileText },
    { id: 'newspapers', label: 'Newspapers', icon: Newspaper },
    { id: 'news', label: 'News', icon: Globe }
  ];

  const mockEvents = [
    {
      id: 1,
      title: 'UPSC Prelims Mock Test',
      date: '2024-02-15',
      time: '10:00 AM',
      location: 'Main Auditorium',
      attendees: 150,
      description: 'Comprehensive mock test covering all subjects for UPSC Prelims preparation.'
    },
    {
      id: 2,
      title: 'Current Affairs Workshop',
      date: '2024-02-20',
      time: '2:00 PM',
      location: 'Conference Hall',
      attendees: 80,
      description: 'Interactive session on recent developments in national and international affairs.'
    },
    {
      id: 3,
      title: 'Interview Preparation Seminar',
      date: '2024-02-25',
      time: '11:00 AM',
      location: 'Seminar Hall',
      attendees: 60,
      description: 'Expert guidance on personality test and interview techniques.'
    }
  ];

  const mockQuestionPapers = [
    {
      id: 1,
      title: 'UPSC Prelims 2023',
      subject: 'General Studies',
      year: '2023',
      url: '/pdfs/upsc-prelims-2023.pdf'
    },
    {
      id: 2,
      title: 'Kerala PSC Degree Level',
      subject: 'General Knowledge',
      year: '2023',
      url: '/pdfs/kerala-psc-degree-2023.pdf'
    },
    {
      id: 3,
      title: 'SSC CGL Tier 1',
      subject: 'Quantitative Aptitude',
      year: '2023',
      url: '/pdfs/ssc-cgl-tier1-2023.pdf'
    }
  ];

  const mockNewspapers = [
    {
      id: 1,
      title: 'The Hindu - Editorial Analysis',
      date: '2024-01-15',
      url: '/pdfs/hindu-editorial-jan15.pdf'
    },
    {
      id: 2,
      title: 'Indian Express - Current Affairs',
      date: '2024-01-14',
      url: '/pdfs/indian-express-jan14.pdf'
    },
    {
      id: 3,
      title: 'Economic Times - Business News',
      date: '2024-01-13',
      url: '/pdfs/economic-times-jan13.pdf'
    }
  ];

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
          <div className="grid gap-6">
            {mockEvents.map((event) => (
              <div key={event.id} className="dashboard-card glass-panel p-6 rounded-xl border border-neon-blue/20">
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white glow-text">{event.title}</h3>
                  <div className="flex items-center space-x-2 text-neon-blue">
                    <Users className="w-4 h-4" />
                    <span className="text-sm">{event.attendees}</span>
                  </div>
                </div>
                <p className="text-gray-300 mb-4">{event.description}</p>
                <div className="flex items-center space-x-6 text-sm text-gray-400">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4" />
                    <span>{event.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'questions':
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockQuestionPapers.map((paper) => (
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
                    onClick={() => onOpenPDF(paper.url, paper.title, 'question')}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 
                             bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue rounded-lg 
                             transition-all duration-300 hover:scale-105"
                  >
                    <Eye className="w-4 h-4" />
                    <span>View</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 
                                   bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple rounded-lg 
                                   transition-all duration-300 hover:scale-105">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'newspapers':
        return (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mockNewspapers.map((newspaper) => (
              <div key={newspaper.id} className="dashboard-card glass-panel p-6 rounded-xl border border-neon-blue/20">
                <div className="flex items-center mb-4">
                  <Newspaper className="w-8 h-8 text-neon-blue mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">{newspaper.title}</h3>
                    <p className="text-sm text-gray-400">{newspaper.date}</p>
                  </div>
                </div>
                <div className="flex space-x-3">
                  <button
                    onClick={() => onOpenPDF(newspaper.url, newspaper.title, 'newspaper')}
                    className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 
                             bg-neon-blue/20 hover:bg-neon-blue/30 text-neon-blue rounded-lg 
                             transition-all duration-300 hover:scale-105"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Read</span>
                  </button>
                  <button className="flex-1 flex items-center justify-center space-x-2 py-2 px-4 
                                   bg-neon-purple/20 hover:bg-neon-purple/30 text-neon-purple rounded-lg 
                                   transition-all duration-300 hover:scale-105">
                    <Download className="w-4 h-4" />
                    <span>Download</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        );

      case 'news':
        return (
          <div className="grid gap-6">
            {mockNews.map((newsItem) => (
              <div key={newsItem.id} className="dashboard-card glass-panel p-6 rounded-xl border border-neon-blue/20">
                <div className="flex items-start justify-between mb-3">
                  <span className="px-3 py-1 bg-neon-blue/20 text-neon-blue text-xs rounded-full">
                    {newsItem.category}
                  </span>
                  <span className="text-sm text-gray-400">{newsItem.date}</span>
                </div>
                <h3 className="text-xl font-semibold text-white glow-text mb-3">{newsItem.title}</h3>
                <p className="text-gray-300">{newsItem.excerpt}</p>
                <button className="mt-4 text-neon-blue hover:text-neon-purple transition-colors">
                  Read More →
                </button>
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