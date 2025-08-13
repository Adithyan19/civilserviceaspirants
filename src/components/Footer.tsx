import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Linkedin className="w-5 h-5" />, href: "#", label: "LinkedIn" },
  ];

  const quickLinks = [
    { name: "Home", href: "#hero", type: "scroll" },
    { name: "About", href: "#about", type: "scroll" },
    { name: "Events", href: "/events", type: "navigate" },
    { name: "Contact", href: "#contact", type: "scroll" },
  ];

  // Helper: jumps to ID after route has loaded
  const scrollToSection = (sectionId: string) => {
    const id = sectionId.replace("#", "");
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 80); // wait for DOM update if needed
  };

  const handleLinkClick = (link: (typeof quickLinks)[0]) => {
    if (link.type === "navigate") {
      navigate(link.href);
      return;
    }
    // Only "scroll" links below this point:

    if (location.pathname !== "/") {
      // Jump to "/" first, then scroll after navigation
      navigate("/");
      // Scroll after a small delay to let the page mount
      setTimeout(() => scrollToSection(link.href), 120);
    } else {
      scrollToSection(link.href);
    }
  };

  return (
    <footer className="bg-gradient-to-t from-dark-bg to-gray-900 border-t border-white/10">
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Club Info ... (no changes) */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-neon-blue to-neon-purple rounded-full flex items-center justify-center">
                <img
                  src="/logo.jpg"
                  alt="Club Logo"
                  className="w-8 h-8 rounded-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    // nextElementSibling could be null
                    if (target.nextElementSibling)
                      (
                        target.nextElementSibling as HTMLElement
                      ).classList.remove("hidden");
                  }}
                />
                <div className="hidden w-8 h-8 bg-neon-blue rounded-full"></div>
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-neon-blue to-white bg-clip-text text-transparent">
                  Civil Servants Club
                </h3>
                <p className="text-sm text-gray-400">TKMCE</p>
              </div>
            </div>

            <p className="text-gray-300 leading-relaxed mb-6 max-w-md">
              Empowering future civil servants with comprehensive guidance,
              resources, and community support. Join us in building a better
              tomorrow through public service excellence.
            </p>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-gray-300">
                <Mail className="w-4 h-4 text-neon-blue" />
                <span>civilservants@tkmce.ac.in</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <Phone className="w-4 h-4 text-neon-blue" />
                <span>+91 9876543210</span>
              </div>
              <div className="flex items-center space-x-3 text-gray-300">
                <MapPin className="w-4 h-4 text-neon-blue" />
                <span>TKM College of Engineering, Kollam</span>
              </div>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleLinkClick(link)}
                    className="text-gray-300 hover:text-neon-blue transition-colors duration-300 text-left"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* Social Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-6">Follow Us</h4>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  aria-label={social.label}
                  className="w-10 h-10 bg-glass-bg backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-gray-300 hover:text-neon-blue hover:border-neon-blue/50 hover:shadow-glow transition-all duration-300 transform hover:scale-110"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 Civil Service Aspirants Club TKMCE. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a
              href="#"
              className="text-gray-400 hover:text-neon-blue text-sm transition-colors duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-neon-blue text-sm transition-colors duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-neon-blue text-sm transition-colors duration-300"
            >
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
