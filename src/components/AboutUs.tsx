import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Footer from "./Footer";

gsap.registerPlugin(ScrollTrigger);

const AboutUs: React.FC = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      image: "/about1.jpg",
      title: "Empowering Future Leaders",
      description:
        "Building tomorrow's civil servants through dedicated mentorship and comprehensive guidance.",
    },
    {
      image: "/about2.jpg",
      title: "Success Stories",
      description:
        "Celebrating achievements and inspiring the next generation of public servants.",
    },
    {
      image: "/about3.jpg",
      title: "Knowledge & Growth",
      description:
        "Providing comprehensive resources and study materials for civil service preparation.",
    },
    {
      image: "/about4.jpg",
      title: "Community of Excellence",
      description:
        "Fostering a supportive environment where aspirants thrive and achieve their dreams.",
    },
  ];

  const aboutSections = [
    {
      image: "/about5.jpg",
      title: "Our Foundation",
      content:
        "Established with a vision to democratize civil services preparation, our club has been a beacon of hope for countless aspirants. We believe that with the right guidance, resources, and community support, every individual can achieve their dream of serving the nation through civil services.",
      reverse: false,
    },
    {
      image: "/about6.jpg",
      title: "Our Methodology",
      content:
        "We follow a holistic approach to civil services preparation, combining traditional study methods with modern technology. Our structured programs, regular assessments, and personalized mentoring ensure that each member receives the attention and guidance they deserve on their journey.",
      reverse: true,
    },
    {
      image: "/about7.jpg",
      title: "Community Impact",
      content:
        "Over the years, our community has grown into a family of dedicated individuals who support each other through thick and thin. We have successfully guided hundreds of students toward their goals, creating a ripple effect of positive change in society.",
      reverse: false,
    },
    {
      image: "/about8.jpg",
      title: "Future Vision",
      content:
        "Looking ahead, we aim to expand our reach and impact, leveraging technology to make quality civil services preparation accessible to every corner of the country. Our commitment remains unwavering: to nurture and guide the future guardians of our nation.",
      reverse: true,
    },
  ];

  useEffect(() => {
    // Auto-slide functionality
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  useEffect(() => {
    // Animate content sections on scroll
    const sections = contentRef.current?.children;
    if (sections) {
      Array.from(sections).forEach((section) => {
        gsap.fromTo(
          section.children,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
              trigger: section,
              start: "top 80%",
              end: "bottom 20%",
              toggleActions: "play none none reverse",
            },
          },
        );
      });
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="bg-[#0f172a] min-h-screen text-white">
      {/* Header */}
      <div className="container mx-auto px-6 py-6 relative flex items-center">
        <div className="h-10" />

        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center w-10 h-10 bg-glass-bg backdrop-blur-sm
               border border-white/20 rounded-full hover:border-neon-blue/50
               hover:shadow-glow transition-all duration-300 group absolute left-6 top-1/2 -translate-y-1/2"
        >
          <ArrowLeft className="w-5 h-5 text-white group-hover:text-neon-blue transition-colors" />
        </button>

        <h1 className="text-2xl font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          About Us
        </h1>
      </div>

      {/* Hero Slideshow - FIXED VERSION */}
      <div className="relative h-screen w-full overflow-hidden">
        {/* Slide Container with smooth horizontal movement */}
        <div
          className="flex h-full transition-transform duration-1000 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full h-full relative flex-shrink-0"
            >
              <img
                src={slide.image}
                alt={slide.title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = `https://via.placeholder.com/1200x800/1e293b/64748b?text=${encodeURIComponent(slide.title)}`;
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

              {/* Slide Content */}
              <div className="absolute bottom-20 left-6 right-6 md:left-20 md:right-20 text-center md:text-left">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
                  {slide.title}
                </h2>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl">
                  {slide.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300 group z-10"
        >
          <ChevronLeft className="w-6 h-6 text-white group-hover:text-neon-blue" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/70 transition-all duration-300 group z-10"
        >
          <ChevronRight className="w-6 h-6 text-white group-hover:text-neon-blue" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex space-x-3 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-neon-blue shadow-glow"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* About Sections */}
      <div ref={contentRef} className="py-20">
        {aboutSections.map((section, index) => (
          <div
            key={index}
            className={`container mx-auto px-6 mb-20 ${index === aboutSections.length - 1 ? "mb-0" : ""}`}
          >
            <div
              className={`grid lg:grid-cols-2 gap-12 items-center ${section.reverse ? "lg:grid-flow-col-dense" : ""}`}
            >
              {/* Image */}
              <div
                className={`relative ${section.reverse ? "lg:col-start-2" : ""}`}
              >
                <div className="relative overflow-hidden rounded-2xl aspect-[4/3] group">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://via.placeholder.com/600x450/1e293b/64748b?text=${encodeURIComponent(section.title)}`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Decorative element */}
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 rounded-full blur-2xl" />
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-gradient-to-r from-neon-purple/20 to-neon-blue/20 rounded-full blur-2xl" />
              </div>

              {/* Content */}
              <div
                className={`space-y-6 ${section.reverse ? "lg:col-start-1" : ""}`}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-white leading-tight">
                  {section.title}
                </h3>

                <p className="text-gray-300 text-lg leading-relaxed">
                  {section.content}
                </p>

                {/* Decorative line */}
                <div className="w-20 h-1 bg-gradient-to-r from-neon-blue to-neon-purple rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action Section */}
      <div className="py-20 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 text-center">
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Begin Your Journey?
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Join our community of dedicated aspirants and take the first step
            towards your civil services dream.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 bg-gradient-to-r from-neon-blue to-neon-purple text-white font-semibold rounded-full hover:shadow-glow transition-all duration-300 transform hover:scale-105"
          >
            Get Started Today
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutUs;
