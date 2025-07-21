import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import SignupModal from './components/SignupModal';
import { useModal } from './hooks/useModal';
import { initializeAnimations } from './utils/animations';
import './styles/locomotive.css';

function App() {
  const { isOpen, openModal, closeModal } = useModal();

  useEffect(() => {
    initializeAnimations();
  }, []);

  return (
    <Router>
      <div className="bg-dark-bg text-white overflow-x-hidden">
        <Header onSignupClick={openModal} />
        <Hero onSignupClick={openModal} />
        <About />
        <Contact />
        <Footer />
        <SignupModal isOpen={isOpen} onClose={closeModal} />
      </div>
    </Router>
  );
}

export default App;