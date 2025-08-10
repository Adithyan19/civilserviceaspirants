import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users, Mail, Phone } from "lucide-react";
import { gsap } from "gsap";
import Footer from "./Footer";

gsap.registerPlugin();

const TeamPage: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    // Animate header entrance
    gsap.fromTo(
      ".team-header",
      { y: -50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
      }
    );

    // Animate cards entrance
    gsap.fromTo(
      ".team-member-card",
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.1,
        delay: 0.3,
        ease: "power2.out",
      }
    );
  }, []);

  const allTeamMembers = [
    {
      name: "Arjun Krishna",
      position: "Chairperson",
      image:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "chairperson@civilservants.tkmce.ac.in",
      phone: "9876543210",
    },
    {
      name: "Priya Nair",
      position: "Vice Chairperson",
      image:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "vicechairperson@civilservants.tkmce.ac.in",
      phone: "9876543211",
    },
    {
      name: "Rahul Menon",
      position: "Web Head",
      image:
        "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "webhead@civilservants.tkmce.ac.in",
      phone: "9876543212",
    },
    {
      name: "Sneha Pillai",
      position: "Design Head",
      image:
        "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "designhead@civilservants.tkmce.ac.in",
      phone: "9876543213",
    },
    {
      name: "Vishnu Kumar",
      position: "Documentation Head",
      image:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "dochead@civilservants.tkmce.ac.in",
      phone: "9876543214",
    },
    {
      name: "Anjali Raj",
      position: "Event Coordinator",
      image:
        "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "events@civilservants.tkmce.ac.in",
      phone: "9876543215",
    },
    {
      name: "Kiran Das",
      position: "Public Relations",
      image:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "pr@civilservants.tkmce.ac.in",
      phone: "9876543216",
    },
    {
      name: "Meera Krishnan",
      position: "Content Head",
      image:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "content@civilservants.tkmce.ac.in",
      phone: "9876543217",
    },
    {
      name: "Arun Nair",
      position: "Finance Head",
      image:
        "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "finance@civilservants.tkmce.ac.in",
      phone: "9876543218",
    },
  ];

  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col">
      {/* Header */}
      <div className="team-header glass-panel border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-white hover:text-neon-blue transition-colors text-sm"
              aria-label="Back to Home"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-3xl font-extrabold text-white glow-text text-center sm:text-left whitespace-nowrap">
              Our Team
            </h1>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              Meet the Executive Committee
            </h2>
            <p className="text-gray-400">
              Our dedicated team working together to empower future civil servants and build a strong community at TKMCE.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {allTeamMembers.map((member, index) => (
              <div
                key={index}
                className="team-member-card glass-panel border border-white/10 rounded-3xl p-6 text-center overflow-hidden transition-shadow duration-300 hover:shadow-lg hover:shadow-neon"
              >
                <div className="relative mx-auto w-24 h-24 sm:w-32 sm:h-32 rounded-full overflow-hidden border-4 border-white/10 transition-colors duration-300 hover:border-neon-blue">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="object-cover w-full h-full rounded-full transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = "none";
                      const fallback = target.nextElementSibling;
                      if (fallback) fallback.classList.remove("hidden");
                    }}
                    loading="lazy"
                  />
                  <div className="hidden absolute inset-0 rounded-full flex items-center justify-center bg-gradient-to-br from-blue-600/20 to-purple-700/30">
                    <Users className="text-white" size={48} />
                  </div>
                </div>

                <h3 className="mt-5 text-xl font-semibold text-white hover:text-neon-blue truncate">
                  {member.name}
                </h3>
                <p className="mt-1 text-sm text-gray-400 truncate">{member.position}</p>

                <div className="mt-4 flex flex-col items-center gap-2 text-gray-400 text-sm">
                  <a
                    href={`mailto:${member.email}`}
                    className="flex items-center gap-2 hover:text-white transition-colors break-words max-w-full"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Email ${member.name}`}
                  >
                    <Mail className="w-5 h-5 flex-shrink-0" />
                    <span className="truncate max-w-[125px]">{member.email}</span>
                  </a>
                  <a
                    href={`tel:${member.phone}`}
                    className="flex items-center gap-2 hover:text-white transition-colors whitespace-nowrap"
                    aria-label={`Call ${member.name}`}
                  >
                    <Phone className="w-5 h-5 flex-shrink-0" />
                    <span>{member.phone}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TeamPage;
