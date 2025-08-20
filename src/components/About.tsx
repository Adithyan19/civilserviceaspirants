import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { Users, BookOpen, Award, Target, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const imageGridRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      },
    );

    const cards = cardsRef.current?.children;
    if (cards) {
      gsap.fromTo(
        cards,
        { y: 80, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    const images = imageGridRef.current?.children;
    if (images) {
      gsap.fromTo(
        images,
        { scale: 0, opacity: 0, rotation: 180 },
        {
          scale: 1,
          opacity: 1,
          rotation: 0,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: imageGridRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        },
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: "Community Support",
      description:
        "Connect with like-minded individuals preparing for civil services examinations.",
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: "Study Resources",
      description:
        "Access comprehensive study materials, previous year papers, and expert guidance.",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Success Stories",
      description:
        "Learn from our alumni who have successfully cleared various civil services exams.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Goal-Oriented",
      description:
        "Structured approach to help you achieve your civil services career aspirations.",
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Current Affairs",
      description:
        "Stay updated with latest current affairs and their relevance to civil services preparation.",
    },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-dark-bg to-gray-900 relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
        >
          About Our Club
        </h2>

        {/* Feature Cards */}
        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 mb-20"
        >
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-glass-bg backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-white/50 transition-all duration-300 hover:shadow-md group"
            >
              <div className="text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-white transition-colors duration-300">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-12">
          {/* Text Content */}
          <div>
            <h3 className="text-3xl font-bold mb-6 text-white">
              Empowering Future Civil Servants
            </h3>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Civil Services Club is a community of dreamers and achievers
                working together to shape a better tomorrow. We bring aspirants
                together to learn, share, and grow with the right guidance and
                peer support. With mentorship, teamwork, and the right
                resources, we aim to inspire students to stay motivated and
                pursue their civil services dream with passion and dedication.
              </p>
              <p>
                Beyond academics, we foster a culture of integrity, leadership,
                and public service, preparing our members not just to clear
                examinations, but to become exemplary public servants who will
                serve the nation with dedication and honor.
              </p>
            </div>

            <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/20">
              <h4 className="text-xl font-semibold mb-3 text-white">
                Our Mission
              </h4>
              <p className="text-gray-300">
                To provide comprehensive support, resources, and guidance to
                students aspiring for civil services, fostering a community of
                dedicated individuals committed to public service excellence.
              </p>
            </div>
          </div>

          {/* Image Grid */}
          <div ref={imageGridRef} className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className="aspect-square bg-white/10 rounded-2xl border border-white/10 flex items-center justify-center backdrop-blur-sm hover:border-white/50 transition-all duration-300 hover:shadow-md group overflow-hidden"
              >
                <img
                  src={`/photo${index}.jpg`}
                  alt={`Event ${index}`}
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    target.nextElementSibling!.classList.remove("hidden");
                  }}
                />
                <div className="hidden w-full h-full bg-white/10 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-semibold">
                    Event {index}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learn More About Us Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/aboutus")}
            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center space-x-3 mx-auto lg:mx-0"
          >
            <span>Learn More About Us</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
