import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const Contact: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const contactInfoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    gsap.fromTo(titleRef.current,
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
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(formRef.current,
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    gsap.fromTo(contactInfoRef.current,
      { x: 100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: contactInfoRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse"
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    await new Promise(resolve => setTimeout(resolve, 2000));

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
    alert('Message sent successfully!');
  };

  const contactInfo = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "Email",
      content: "civilservants@tkmce.ac.in",
      link: "mailto:civilservants@tkmce.ac.in"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: "Phone",
      content: "+91 9876543210",
      link: "tel:+919876543210"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Location",
      content: "TKM College of Engineering, Kollam",
      link: "https://maps.google.com"
    }
  ];

  return (
    <section 
      id="contact"
      ref={sectionRef}
      className="py-20 bg-gray-900 text-white relative overflow-hidden"
    >
      {/* Soft Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gray-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gray-600 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <h2 
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-center mb-16 text-white"
        >
          Get In Touch
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-2xl text-white placeholder-transparent focus:border-white focus:outline-none transition-all duration-300 peer"
                placeholder="Your Name"
              />
              <label className="absolute left-4 -top-2.5 text-sm text-gray-400 bg-gray-900 px-2 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-white peer-focus:bg-gray-900">
                Your Name
              </label>
            </div>

            <div className="relative">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-2xl text-white placeholder-transparent focus:border-white focus:outline-none transition-all duration-300 peer"
                placeholder="Your Email"
              />
              <label className="absolute left-4 -top-2.5 text-sm text-gray-400 bg-gray-900 px-2 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-white peer-focus:bg-gray-900">
                Your Email
              </label>
            </div>

            <div className="relative">
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-2xl text-white placeholder-transparent focus:border-white focus:outline-none transition-all duration-300 peer resize-none"
                placeholder="Your Message"
              />
              <label className="absolute left-4 -top-2.5 text-sm text-gray-400 bg-gray-900 px-2 transition-all duration-300 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-4 peer-placeholder-shown:bg-transparent peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-white peer-focus:bg-gray-900">
                Your Message
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-8 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-2xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Send Message</span>
                </>
              )}
            </button>
          </form>

          {/* Contact Information */}
          <div ref={contactInfoRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 text-white">Contact Information</h3>
              <p className="text-gray-400 leading-relaxed mb-8">
                Ready to join our community or have questions about civil services preparation? 
                We're here to help you on your journey to success.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <a
                  key={index}
                  href={info.link}
                  className="flex items-center space-x-4 p-4 bg-gray-800 border border-gray-700 rounded-2xl hover:border-white transition-all duration-300 group"
                >
                  <div className="text-white group-hover:scale-110 transition-transform duration-300">
                    {info.icon}
                  </div>
                  <div>
                    <h4 className="font-semibold text-white group-hover:text-gray-100 transition-colors duration-300">
                      {info.title}
                    </h4>
                    <p className="text-gray-400">{info.content}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-12 p-6 bg-gray-800 border border-gray-700 rounded-2xl">
              <h4 className="text-xl font-semibold mb-3 text-white">Office Hours</h4>
              <div className="space-y-2 text-gray-400">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
