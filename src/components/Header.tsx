import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";
import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";

interface HeaderProps {
  onSignupClick: () => void;
  onLoginClick: () => void;
  user: { email: string; role?: string } | null;
  onDashboardClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onSignupClick,
  onLoginClick,
  user,
}) => {
  const navigate = useNavigate();

  const headerRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      headerRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
    )
      .fromTo(
        logoRef.current,
        { x: -50, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.5",
      )
      .fromTo(
        navRef.current?.children || [],
        { y: -20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power2.out" },
        "-=0.6",
      )
      .fromTo(
        buttonRef.current,
        { scale: 0, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(1.7)" },
        "-=0.3",
      );
  }, []);

  const scrollToSection = (sectionId: string) => {
    document.body.style.overflow = "unset";
    document.documentElement.style.overflow = "unset";

    setIsMobileMenuOpen(false);

    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        const headerHeight = headerRef.current?.offsetHeight || 80;
        const elementPosition = element.offsetTop - headerHeight;

        window.scrollTo({
          top: elementPosition,
          behavior: "smooth",
        });

        element.scrollIntoView({ behavior: "smooth", block: "start" });
      } else {
        console.warn(`Element with ID "${sectionId}" not found`);
      }
    }, 100);
  };

  const handleEventsClick = () => {
    setIsMobileMenuOpen(false);
    navigate("/events");
  };

  return (
    <header
      ref={headerRef}
      className="fixed top-0 left-0 right-0 z-50 bg-glass-bg backdrop-blur-md border-b border-white/10"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between space-x-4 sm:space-x-8">
          {/* Logo and Club Name */}
          <div
            ref={logoRef}
            className="flex items-center flex-shrink-0 min-w-0 space-x-3"
          >
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
              <img
                src="/logo.jpg"
                alt="Club Logo"
                className="w-8 h-8 rounded-full object-cover"
                onError={(e) => {
                  const target = e.currentTarget;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling;
                  if (fallback) fallback.classList.remove("hidden");
                }}
              />
              <div className="hidden w-8 h-8 bg-white rounded-full" />
            </div>
            <div className="min-w-0">
              <h1 className="text-lg sm:text-xl font-semibold text-white truncate leading-none">
                Civil Service Aspirants
              </h1>
              <p className="text-xs sm:text-sm text-gray-400 truncate leading-tight">
                Club - TKMCE
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav
            ref={navRef}
            className="hidden md:flex items-center space-x-8 whitespace-nowrap"
            aria-label="Primary Navigation"
          >
            <button
              onClick={() => scrollToSection("hero")}
              className="text-white text-sm sm:text-base hover:text-gray-300 transition-colors duration-300 rounded focus:outline-none focus:ring-2 focus:ring-neon-blue px-2 py-1"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-white text-sm sm:text-base hover:text-gray-300 transition-colors duration-300 rounded focus:outline-none focus:ring-2 focus:ring-neon-blue px-2 py-1"
            >
              About
            </button>
            <button
              onClick={handleEventsClick}
              className="text-white text-sm sm:text-base hover:text-gray-300 transition-colors duration-300 rounded focus:outline-none focus:ring-2 focus:ring-neon-blue px-2 py-1"
            >
              Events
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className="text-white text-sm sm:text-base hover:text-gray-300 transition-colors duration-300 rounded focus:outline-none focus:ring-2 focus:ring-neon-blue px-2 py-1"
            >
              Contact
            </button>
          </nav>

          {/* Desktop Auth Buttons */}
          <div
            ref={buttonRef}
            className="hidden md:flex items-center space-x-4"
            aria-label="Authentication Buttons"
          >
            <button
              onClick={onLoginClick}
              className="px-5 sm:px-6 py-2 sm:py-2.5 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition duration-300 focus:outline-none focus:ring-2 focus:ring-neon-blue"
            >
              Login
            </button>
            <button
              onClick={onSignupClick}
              className="px-5 sm:px-6 py-2 sm:py-2.5 bg-white text-black rounded-full font-semibold hover:bg-gray-200 transition duration-300 focus:outline-none focus:ring-2 focus:ring-neon-blue"
            >
              Sign Up
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen((v) => !v)}
            className="md:hidden text-white p-2 rounded-md hover:text-neon-blue transition duration-300 focus:outline-none focus:ring-2 focus:ring-neon-blue z-50"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-2 pb-6 border-t border-white/10 bg-glass-bg backdrop-blur-md rounded-b-lg shadow-lg z-40">
            <nav
              className="flex flex-col space-y-3 px-4 mt-4"
              aria-label="Mobile Navigation"
            >
              <button
                onClick={() => scrollToSection("hero")}
                className="text-left text-white text-base hover:text-neon-blue transition-colors rounded focus:outline-none focus:ring-2 focus:ring-neon-blue px-2 py-2"
              >
                Home
              </button>
              <button
                onClick={() => scrollToSection("about")}
                className="text-left text-white text-base hover:text-neon-blue transition-colors rounded focus:outline-none focus:ring-2 focus:ring-neon-blue px-2 py-2"
              >
                About
              </button>
              <button
                onClick={handleEventsClick}
                className="text-left text-white text-base hover:text-neon-blue transition-colors rounded focus:outline-none focus:ring-2 focus:ring-neon-blue px-2 py-2"
              >
                Events
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-left text-white text-base hover:text-neon-blue transition-colors rounded focus:outline-none focus:ring-2 focus:ring-neon-blue px-2 py-2"
              >
                Contact
              </button>
              <button
                onClick={onLoginClick}
                className="w-full bg-white text-black rounded-full font-semibold py-2 transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-neon-blue"
              >
                Login
              </button>
              <button
                onClick={onSignupClick}
                className="w-full bg-white text-black rounded-full font-semibold py-2 transition hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-neon-blue"
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
