import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Users } from "lucide-react";
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
      },
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
      },
    );
  }, []);

  const allTeamMembers = [
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
      position: "Club Ambassador",
      image: "",
    },
    {
      name: "Nafih Koya",
      position: "Program Coordinator Head",
      image: "/NAFIH KOYA VM.jpg",
    },
    {
      name: "Safanath",
      position: "Program Coordinator",
      image: "/SAFANATH.jpg",
    },
    {
      name: "Vaishnavi",
      position: "Program Coordinator",
      image: "/G S Vaishnavi .jpg",
    },
    {
      name: "Amin",
      position: "Program Coordinator",
      image: "",
    },
    {
      name: "Sinan",
      position: "Design Head",
      image: "/MUHAMMED SINAN TP .jpg",
    },
    {
      name: "Aswani",
      position: "Design Team",
      image: "",
    },
    {
      name: "Shehina",
      position: "Design Team",
      image: "/Shehina.jpg",
    },
    {
      name: "Abel Joseph",
      position: "Content and Doc Head",
      image: "",
    },
    {
      name: "Niveditha",
      position: "Content and Doc Team",
      image: "/Niveditha S Nair.jpg",
    },
    {
      name: "Aliya",
      position: "Content and Doc Team",
      image: "/ALIYA. S.jpg",
    },
    {
      name: "Krishnendu",
      position: "Content and Doc Team",
      image: "",
    },
    {
      name: "Bibin",
      position: "Public Relations Head",
      image: "",
    },
    {
      name: "Abhay ",
      position: "Public Relations Vice Head",
      image: "",
    },
    {
      name: "Siva Prasad",
      position: "Public Relations",
      image: "/sivaprasad.jpg",
    },
    {
      name: "Anagha Anilkumar",
      position: "Public Relations",
      image: "/anagha.jpg",
    },
    {
      name: "Rani Shaibhya",
      position: "Public Relations",
      image: "/RANI SHAIBHYA.jpg",
    },
    {
      name: "Yaseen",
      position: "Inquisitive Head",
      image: "/YASEEN.jpg",
    },
    {
      name: "Krishnapriya",
      position: "Inquisitive Team",
      image: "/KRISHNAPRIYA KK.jpg",
    },
    {
      name: "Hridhya",
      position: "Inquisitive Team",
      image: "/Hridhya S B.jpg",
    },
    {
      name: "Adithyan",
      position: "Tech Head",
      image: "/Adithyan.jpg",
    },
    {
      name: "Danish",
      position: "Tech Team",
      image: "/Danish.jpg",
    },
    {
      name: "Ananda Lakshmi",
      position: "Finance Head",
      image: "",
    },
    {
      name: "Afnan",
      position: "Finance Team",
      image: "",
    },
  ];

  return (
    <div className="bg-[#0f172a] min-h-screen flex flex-col">
      {/* Header */}
      <div className="team-header glass-panel border-b border-white/10 relative">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-6 relative flex items-center justify-center">
          {/* Back Button */}
          <button
            onClick={() => navigate("/")}
            className="flex items-center justify-center w-10 h-10 bg-glass-bg backdrop-blur-sm border border-white/20 rounded-full hover:border-neon-blue/50 hover:shadow-glow transition-all duration-300 group absolute left-6"
          >
            <ArrowLeft className="w-5 h-5 text-white group-hover:text-neon-blue transition-colors" />
          </button>

          {/* Centered Title */}
          <h1 className="text-3xl font-extrabold text-white text-center">
            Our Team
          </h1>
        </div>
      </div>

      {/* Team Members */}
      <div className="flex-grow">
        <div className="container mx-auto px-4 sm:px-6 md:px-8 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
              Meet the Execom Committee
            </h2>
            <p className="text-gray-400">
              Our dedicated team working together to empower future civil
              servants and build a strong community at TKMCE.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {allTeamMembers.map((member, index) => (
              <div
                key={index}
                className="team-member-card glass-panel border border-white/10 rounded-3xl p-6 text-center overflow-hidden transition-shadow duration-300 hover:shadow-lg"
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
                <p className="mt-1 text-sm text-gray-400 truncate">
                  {member.position}
                </p>
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
