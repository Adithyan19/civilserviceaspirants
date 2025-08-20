import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";

const AboutUs = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const contentRef = useRef(null);

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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="bg-slate-900 min-h-screen text-white">
      {/* Header */}
      <div className="container mx-auto px-6 py-6 relative flex items-center">
        <div className="h-10" />

        <button
          onClick={() => navigate("/")}
          className="flex items-center justify-center w-10 h-10 bg-white/10 backdrop-blur-sm
               border border-white/20 rounded-full hover:border-blue-400/50
               hover:shadow-lg transition-all duration-300 group absolute left-6 top-1/2 -translate-y-1/2"
        >
          <ArrowLeft className="w-5 h-5 text-white group-hover:text-blue-400 transition-colors" />
        </button>

        <h1 className="text-2xl font-bold absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          About Us
        </h1>
      </div>

      {/* Hero Slideshow - Mobile Responsive */}
      <div className="relative h-[60vh] sm:h-[70vh] md:h-[80vh] lg:h-screen w-full overflow-hidden">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = `https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=800&fit=crop&crop=center`;
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

            {/* Slide Content - Mobile Responsive */}
            <div className="absolute bottom-8 sm:bottom-12 md:bottom-20 left-4 right-4 sm:left-6 sm:right-6 md:left-20 md:right-20 text-center">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-2 sm:mb-4 leading-tight px-2">
                {slide.title}
              </h2>
              <p className="text-sm sm:text-base md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto px-2 leading-relaxed">
                {slide.description}
              </p>
            </div>
          </div>
        ))}

        {/* Navigation Arrows - Mobile Responsive */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
                     bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center 
                     hover:bg-black/70 transition-all duration-300 group z-20"
        >
          <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:text-blue-400" />
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 
                     bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center 
                     hover:bg-black/70 transition-all duration-300 group z-20"
        >
          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-white group-hover:text-blue-400" />
        </button>

        {/* Slide Indicators - Mobile Responsive */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 sm:space-x-3 z-20">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-blue-400 shadow-lg shadow-blue-400/50"
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* About Sections - Mobile Responsive */}
      <div ref={contentRef} className="py-10 sm:py-16 md:py-20">
        {aboutSections.map((section, index) => (
          <div
            key={index}
            className={`container mx-auto px-4 sm:px-6 mb-12 sm:mb-16 md:mb-20 ${
              index === aboutSections.length - 1 ? "mb-0" : ""
            }`}
          >
            <div
              className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10 md:gap-12 items-center ${
                section.reverse ? "lg:flex-row-reverse" : ""
              }`}
            >
              {/* Image - Mobile Responsive */}
              <div
                className={`relative ${section.reverse ? "lg:order-2" : ""}`}
              >
                <div className="relative overflow-hidden rounded-xl sm:rounded-2xl aspect-[4/3] group">
                  <img
                    src={section.image}
                    alt={section.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=450&fit=crop&crop=center`;
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                {/* Decorative element - Hidden on mobile for cleaner look */}
                <div className="hidden sm:block absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-12 h-12 sm:w-24 sm:h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-2xl" />
                <div className="hidden sm:block absolute -bottom-2 sm:-bottom-4 -left-2 sm:-left-4 w-16 h-16 sm:w-32 sm:h-32 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full blur-2xl" />
              </div>

              {/* Content - Mobile Responsive */}
              <div
                className={`space-y-4 sm:space-y-6 ${section.reverse ? "lg:order-1" : ""}`}
              >
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight">
                  {section.title}
                </h3>

                <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
                  {section.content}
                </p>

                {/* Decorative line */}
                <div className="w-16 sm:w-20 h-1 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Call to Action Section - Mobile Responsive */}
      <div className="py-12 sm:py-16 md:py-20 bg-gradient-to-r from-gray-900/50 to-black/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-6 px-2">
            Ready to Begin Your Journey?
          </h3>
          <p className="text-gray-300 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto px-2 leading-relaxed">
            Join our community of dedicated aspirants and take the first step
            towards your civil services dream.
          </p>
          <button
            onClick={() => navigate("/")}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white 
                       font-semibold rounded-full hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 
                       transform hover:scale-105 text-sm sm:text-base"
          >
            Get Started Today
          </button>
        </div>
      </div>

      {/* Footer Placeholder */}
      <div className="bg-slate-800 py-8">
        <div className="container mx-auto px-4 sm:px-6 text-center text-gray-400">
          <p>&copy; 2024 Civil Services Club. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
