import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
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
import { useModal } from './hooks/useModal';
import { initializeAnimations } from './utils/animations';
import './styles/locomotive.css';

function App() {
  const { isOpen, openModal, closeModal } = useModal();
  const loginModal = useModal();
  const [user, setUser] = useState<{ email: string; role: 'admin' | 'user' } | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'admin'>('home');
  const [pdfViewer, setPdfViewer] = useState<{
    isOpen: boolean;
    url: string;
    title: string;
    type: 'newspaper' | 'question';
  }>({
    isOpen: false,
    url: '',
    title: '',
    type: 'newspaper'
  });

  useEffect(() => {
    initializeAnimations();
  }, []);

const handleLogin = (credentials: { email: string; password: string; role: 'admin' | 'user' }) => {
  setUser({ email: credentials.email, role: credentials.role });
  setCurrentView(credentials.role === 'admin' ? 'admin' : 'dashboard');
  loginModal.closeModal();
};



  const handleLogout = () => {
    setUser(null);
    setCurrentView('home');
  };

  const handleOpenPDF = (url: string, title: string, type: 'newspaper' | 'question') => {
    setPdfViewer({ isOpen: true, url, title, type });
  };

  const handleClosePDF = () => {
    setPdfViewer(prev => ({ ...prev, isOpen: false }));
  };

  // Admin access (simple check - in real app, this would be role-based)
  const isAdmin = user?.role === 'admin'


  if (currentView === 'dashboard' && user) {
    return (
      <>
        <Dashboard user={user} onOpenPDF={handleOpenPDF} />
        <PDFViewer
          isOpen={pdfViewer.isOpen}
          onClose={handleClosePDF}
          pdfUrl={pdfViewer.url}
          title={pdfViewer.title}
          type={pdfViewer.type}
        />
      </>
    );
  }

  if (isAdmin) {
    return <AdminPanel />;
  }

  return (
    <Router>
      <div className="bg-dark-bg text-white overflow-x-hidden">
        <Header 
          onSignupClick={openModal} 
          onLoginClick={loginModal.openModal}
          user={user}
          onLogout={handleLogout}
          onDashboardClick={() => setCurrentView('dashboard')}
        />
        <Hero onSignupClick={openModal} />
        <About />
        <Contact />
        <Footer />
        <SignupModal isOpen={isOpen} onClose={closeModal} />
        
        <LoginModal
          isOpen={loginModal.isOpen}
          onClose={loginModal.closeModal}
          onLogin={handleLogin}
        />
      </div>
    </Router>
  );
}

export default App;