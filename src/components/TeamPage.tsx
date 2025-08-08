import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Users, Mail, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import Footer from './Footer';

const TeamPage: React.FC = () => {
  const navigate = useNavigate();
    useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    // Animate page entrance
    gsap.fromTo('.team-header',
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }
    );

    gsap.fromTo('.team-member-card',
      { y: 50, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 0.6, 
        stagger: 0.1,
        delay: 0.3,
        ease: 'power2.out'
      }
    );
  }, []);

  const allTeamMembers = [
    {
      name: "Arjun Krishna",
      position: "Chairperson",
      image: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "chairperson@civilservants.tkmce.ac.in",
      phone: "+91 9876543210"
    },
    {
      name: "Priya Nair",
      position: "Vice Chairperson",
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "vicechairperson@civilservants.tkmce.ac.in",
      phone: "+91 9876543211"
    },
    {
      name: "Rahul Menon",
      position: "Web Head",
      image: "https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "webhead@civilservants.tkmce.ac.in",
      phone: "+91 9876543212"
    },
    {
      name: "Sneha Pillai",
      position: "Design Head",
      image: "https://images.pexels.com/photos/1181519/pexels-photo-1181519.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "designhead@civilservants.tkmce.ac.in",
      phone: "+91 9876543213"
    },
    {
      name: "Vishnu Kumar",
      position: "Documentation Head",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "dochead@civilservants.tkmce.ac.in",
      phone: "+91 9876543214"
    },
    {
      name: "Anjali Raj",
      position: "Event Coordinator",
      image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "events@civilservants.tkmce.ac.in",
      phone: "+91 9876543215"
    },
    {
      name: "Kiran Das",
      position: "Public Relations Head",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "pr@civilservants.tkmce.ac.in",
      phone: "+91 9876543216"
    },
    {
      name: "Meera Krishnan",
      position: "Content Head",
      image: "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "content@civilservants.tkmce.ac.in",
      phone: "+91 9876543217"
    },
    {
      name: "Arun Nair",
      position: "Finance Head",
      image: "https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400",
      email: "finance@civilservants.tkmce.ac.in",
      phone: "+91 9876543218"
    }
  ];

  return (
    <div className="bg-[#0f172a] min-h-screen">
      {/* Header */}
      <div className="team-header glass-panel border-b border-white/10">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => navigate('/')}
              className="flex items-center space-x-2 text-white hover:text-neon-blue transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </button>
            <h1 className="text-3xl font-bold text-white glow-text">Our Team</h1>
          </div>
        </div>
      </div>

      {/* Team Members Grid */}
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Meet the Executive Committee
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Our dedicated team of leaders working together to empower future civil servants 
            and build a strong community at TKMCE.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {allTeamMembers.map((member, index) => (
            <div 
              key={index}
              className="team-member-card glass-panel p-6 rounded-2xl border border-neon-blue/20 text-center group hover:border-neon-blue/50 transition-all duration-300 hover:shadow-glow"
            >
              <div className="relative mb-6 mx-auto w-32 h-32">
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-neon-blue/30 group-hover:border-neon-blue transition-all duration-300">
                  <img 
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      target.nextElementSibling!.classList.remove('hidden');
                    }}
                  />
                  <div className="hidden w-full h-full bg-gradient-to-br from-neon-blue/30 to-neon-purple/30 rounded-full flex items-center justify-center">
                    <Users className="w-12 h-12 text-white" />
                  </div>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-blue transition-colors duration-300">
                {member.name}
              </h3>
              
              <p className="text-neon-blue font-semibold mb-4 text-lg">
                {member.position}
              </p>

              <div className="space-y-3">
                <div className="flex items-center justify-center space-x-2 text-gray-300 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">{member.email}</span>
                </div>
                <div className="flex items-center justify-center space-x-2 text-gray-300 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" />
                  <span className="text-sm">{member.phone}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default TeamPage;