import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useNavigate } from "react-router-dom";
import { Users, ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const OurTeam: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Title animation
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

    // Cards animation
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const teamMembers = [
    {
      name: "Ashwin M G",
      position: "Club Ambassador",
      image: "/Ashwin M G.jpg",
    },
    {
      name: "Brindha R K",
      position: "Club Ambassador",
      image: "",
    },
    {
      name: "Rameez",
      position: "Student Head",
      image: "",
    },
  ];

  return (
    <section
      id="team"
      ref={sectionRef}
      className="py-20 bg-gradient-to-b from-gray-900 to-dark-bg relative overflow-hidden"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0 bg-gradient-to-r from-neon-blue to-neon-purple"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, rgba(0,245,255,0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(191,0,255,0.1) 0%, transparent 50%)",
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 bg-gradient-to-r from-white to-neon-blue bg-clip-text text-transparent"
        >
          Our Team
        </h2>

        {/* Team Members Grid */}
        <div
          ref={cardsRef}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8 mb-12"
        >
          {teamMembers.map((member, index) => (
            <div key={index} className="group text-center">
              <div className="relative mb-4 mx-auto w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-neon-blue/30 group-hover:border-neon-blue transition-all duration-300 group-hover:shadow-glow">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.nextElementSibling!.classList.remove("hidden");
                    }}
                  />
                  <div className="hidden w-full h-full bg-gradient-to-br from-neon-blue/30 to-neon-purple/30 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 md:w-12 md:h-12 text-white" />
                  </div>
                </div>
              </div>
              <h3 className="text-white font-semibold text-sm md:text-base lg:text-lg mb-1 group-hover:text-neon-blue transition-colors duration-300">
                {member.name}
              </h3>
              <p className="text-gray-400 text-xs md:text-sm">
                {member.position}
              </p>
            </div>
          ))}
        </div>

        {/* Our Team Button */}
        <div className="text-center">
          <button
            onClick={() => navigate("/team")}
            className="px-8 py-4 bg-white text-black font-semibold rounded-full hover:bg-gray-200 hover:scale-105 transition-all duration-300 inline-flex items-center justify-center space-x-3 mx-auto lg:mx-0"
          >
            <span>Meet Our Team</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default OurTeam;
