import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useNavigate,
  useLocation,
} from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SignupModal from './components/SignupModal';
import LoginModal from './components/LoginModal';
import Dashboard from './components/Dashboard';
import AdminPanel from './components/AdminPanel';
import PDFViewer from './components/PDFViewer';
import AccountDetails from './components/AccountDetails';
import Profile from './components/Profile';
import OurTeam from './components/OurTeam';
import TeamPage from './components/TeamPage';
import EventPage from './components/EventPage';
import { useModal } from './hooks/useModal';
import './styles/locomotive.css';

const AppContent: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const { isOpen, openModal, closeModal } = useModal();
  const loginModal = useModal();

  const [user, setUser] = useState<{ email: string; role: 'admin' | 'user'; name: string } | null>(
    null
  );
  const [pdfViewer, setPdfViewer] = useState({
    isOpen: false,
    url: '',
    title: '',
    type: 'newspaper' as 'newspaper' | 'question',
  });

  const isAdmin = user?.role === 'admin';
  const isHomePage = location.pathname === '/';
  const isDashboardPage = location.pathname === '/dashboard';
  const isAdminPage = location.pathname === '/admin';
  const isEventPage = location.pathname.startsWith('/event/');

  const handleLogin = (credentials: {
    email: string;
    password: string;
    role: 'admin' | 'user';
    name: string;
  }) => {
    setUser({ email: credentials.email, role: credentials.role, name: credentials.name });
    loginModal.closeModal();

    if (credentials.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  const handleOpenPDF = (url: string, title: string, type: 'newspaper' | 'question') => {
    setPdfViewer({ isOpen: true, url, title, type });
  };

  const handleClosePDF = () => {
    setPdfViewer((prev) => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen">
      {/* Home Page */}
      {isHomePage && (
        <div className="bg-dark-bg text-white">
          <Header
            onSignupClick={openModal}
            onLoginClick={loginModal.openModal}
            user={user}
            onDashboardClick={() => navigate('/dashboard')}
          />
          <Hero onSignupClick={openModal} />
          <About />
          <OurTeam />
          <Contact />
          <Footer />
          <SignupModal isOpen={isOpen} onClose={closeModal} />
          <LoginModal
            onSignupClick={openModal}
            isOpen={loginModal.isOpen}
            onClose={loginModal.closeModal}
            onLogin={handleLogin}
          />
        </div>
      )}

      {/* Dashboard */}
      {isDashboardPage && user && (
        <Dashboard user={user} onOpenPDF={handleOpenPDF} onLogout={handleLogout} />
      )}

      {/* Event Page */}
      {isEventPage && user && (
        <EventPage user={user} onLogout={handleLogout} />
      )}

      {/* Admin */}
      {isAdminPage && user && isAdmin && <AdminPanel />}

      {/* Account Details */}
      {location.pathname === '/account' && user && (
        <AccountDetails user={user} onLogout={handleLogout} />
      )}
      {location.pathname === '/account' && !user && <Navigate to="/" replace />}

      {/* Profile */}
      {location.pathname === '/profile' && user && (
        <Profile user={user} onLogout={handleLogout} onOpenPDF={handleOpenPDF} />
      )}
      {location.pathname === '/profile' && !user && <Navigate to="/" replace />}

      {/* Team Page Layout */}
      {location.pathname === '/team' && (
        <TeamPage />
      )}

      {/* Unauthorized Redirects */}
      {isDashboardPage && !user && <Navigate to="/" replace />}
      {isEventPage && !user && <Navigate to="/" replace />}
      {isAdminPage && (!user || !isAdmin) && (
        <Navigate to={user ? '/dashboard' : '/'} replace />
      )}

      {/* Global PDF Viewer */}
      <PDFViewer
        isOpen={pdfViewer.isOpen}
        onClose={handleClosePDF}
        pdfUrl={pdfViewer.url}
        title={pdfViewer.title}
        type={pdfViewer.type}
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AppContent />} />
        <Route path="/dashboard" element={<AppContent />} />
        <Route path="/admin" element={<AppContent />} />
        <Route path="/account" element={<AppContent />} />
        <Route path="/profile" element={<AppContent />} />
        <Route path="/event/:id" element={<AppContent />} />
        <Route path="/team" element={<AppContent />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;