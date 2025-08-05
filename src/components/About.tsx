import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Users, BookOpen, Award, Target } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const About: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const imageGridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: titleRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
        },
      }
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
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: cardsRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
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
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: imageGridRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            toggleActions: 'play none none reverse',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const features = [
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Community Support',
      description:
        'Connect with like-minded individuals preparing for civil services examinations.',
    },
    {
      icon: <BookOpen className="w-8 h-8" />,
      title: 'Study Resources',
      description:
        'Access comprehensive study materials, previous year papers, and expert guidance.',
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Success Stories',
      description:
        'Learn from our alumni who have successfully cleared various civil services exams.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Goal-Oriented',
      description:
        'Structured approach to help you achieve your civil services career aspirations.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Current Affairs',
      description:
        'Structured approach to help you achieve your civil services career aspirations.',
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
              'radial-gradient(circle at 25% 25%, rgba(255,255,255,0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255,255,255,0.05) 0%, transparent 50%)',
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
              <p className="text-gray-400 leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div>
            <h3 className="text-3xl font-bold mb-6 text-white">
              Empowering Future Civil Servants
            </h3>
            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
                ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                aliquip ex ea commodo consequat.
              </p>
              <p>
                Duis aute irure dolor in reprehenderit in voluptate velit esse
                cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit
                anim id est laborum.
              </p>
              <p>
                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                quae ab illo inventore veritatis et quasi architecto beatae vitae
                dicta sunt explicabo.
              </p>
            </div>

            <div className="mt-8 p-6 bg-white/5 rounded-2xl border border-white/20">
              <h4 className="text-xl font-semibold mb-3 text-white">Our Mission</h4>
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
                  src={`https://images.pexels.com/photos/${
                    index === 1
                      ? '3184465'
                      : index === 2
                      ? '3184418'
                      : index === 3
                      ? '3184432'
                      : '3184454'
                  }/pexels-photo-${
                    index === 1
                      ? '3184465'
                      : index === 2
                      ? '3184418'
                      : index === 3
                      ? '3184432'
                      : '3184454'
                  }.jpeg?auto=compress&cs=tinysrgb&w=400`}
                  alt={`Event ${index}`}
                  className="w-full h-full object-cover rounded-2xl group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    target.nextElementSibling!.classList.remove('hidden');
                  }}
                />
                <div className="hidden w-full h-full bg-white/10 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-semibold">Event {index}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
