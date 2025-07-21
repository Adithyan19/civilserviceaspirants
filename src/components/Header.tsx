import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onSignupClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSignupClick }) => {
  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();
    
    tl.fromTo(headerRef.current, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    )
    .fromTo(logoRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
      "-=0.5"
    )
    .fromTo(navRef.current?.children || [],
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
      "-=0.6"
    )
    .fromTo(buttonRef.current,
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
      "-=0.3"
    );
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <header 
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-glass-bg backdrop-blur-md border-b border-white/10"
    >
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div ref={logoRef} className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
              <img 
                src="/logo.jpg" 
                alt="Club Logo" 
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling!.classList.remove('hidden');
                }}
              />
              <div className="hidden w-8 h-8 bg-white rounded-full"></div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Civil Service Aspirants Club
              </h1>
              <p className="text-xs text-gray-400">TKMCE</p>
            </div>
          </div>


          {/* Desktop Navigation */}
          <nav ref={navRef} className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('hero')}
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              Home
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              About
            </button>
            <button 
              onClick={() => scrollToSection('contact')}
              className="text-white hover:text-gray-300 transition-colors duration-300"
            >
              Contact
            </button>

          </nav>

          {/* Sign Up Button */}
          <button
            ref={buttonRef}
            onClick={onSignupClick}
            className="hidden md:block px-6 py-2 bg-white text-dark-bg font-semibold rounded-full hover:bg-gray-200 transition-all duration-300"
          >
            Sign Up
          </button>


          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-white hover:text-neon-blue transition-colors duration-300"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/10">
            <nav className="flex flex-col space-y-4 mt-4">
              <button 
                onClick={() => scrollToSection('hero')}
                className="text-left text-white hover:text-neon-blue transition-colors duration-300"
              >
                Home
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="text-left text-white hover:text-neon-blue transition-colors duration-300"
              >
                About
              </button>
              <button 
                onClick={() => scrollToSection('contact')}
                className="text-left text-white hover:text-neon-blue transition-colors duration-300"
              >
                Contact
              </button>
              <button
                onClick={onSignupClick}
                className="text-left px-6 py-2 bg-white text-dark-bg font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 w-fit"
              >
                Sign Up
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;