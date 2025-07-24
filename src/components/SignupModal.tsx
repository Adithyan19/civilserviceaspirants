import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { X, User, Mail, Phone, GraduationCap, Calendar, Eye, EyeOff, Lock } from 'lucide-react';

interface SignupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SignupModal: React.FC<SignupModalProps> = ({ isOpen, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    pass: '',
    phone: '',
    course: '',
    year: '',
    interests: '',
    confpass: ''
  });

  const [showPassword, setShowPassword] = useState({
    pass: false,
    confpass: false
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(modalRef.current, { display: 'flex' });
      gsap.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
      gsap.fromTo(contentRef.current, { scale: 0.9, y: 40, opacity: 0 }, {
        scale: 1,
        y: 0,
        opacity: 1,
        duration: 0.5,
        ease: 'power3.out',
        delay: 0.1
      });
    } else {
      document.body.style.overflow = 'unset';
      gsap.to(contentRef.current, {
        scale: 0.9,
        y: 40,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in'
      });
      gsap.to(modalRef.current, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          gsap.set(modalRef.current, { display: 'none' });
        }
      });
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = (field: 'pass' | 'confpass') => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === modalRef.current) onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (formData.pass !== formData.confpass) {
      alert('Passwords mismatch');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok || !data.success) throw new Error('Signup failed: ' + data.message);

      gsap.to(contentRef.current, {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });

      setFormData({
        fullName: '',
        email: '',
        pass: '',
        phone: '',
        course: '',
        year: '',
        interests: '',
        confpass: ''
      });

      setTimeout(() => {
        onClose();
        alert('🎉 Registration successful! Welcome to the Civil Servants Club.');
      }, 800);
    } catch (error) {
      alert('❌ Something went wrong. Please try again.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      ref={modalRef}
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
      style={{ display: 'none' }}
    >
      <div
        ref={contentRef}
        className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-glass-bg backdrop-blur-md border border-white/20 rounded-3xl shadow-md"
      >
        {/* Header */}
        <div className="relative p-8 bg-gradient-to-r from-white/5 to-white/10 border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 bg-glass-bg backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center text-gray-300 hover:text-white hover:border-white/50 transition"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-white/10 flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-1">Join Our Club</h2>
            <p className="text-sm text-gray-300">Start your journey to civil service excellence</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { name: 'fullName', icon: <User />, type: 'text', placeholder: 'Full Name' },
              { name: 'email', icon: <Mail />, type: 'email', placeholder: 'Email Address' },
              { name: 'pass', icon: <Lock />, type: 'password', placeholder: 'Create Password' },
              { name: 'confpass', icon: <Lock />, type: 'password', placeholder: 'Confirm Password' },
              { name: 'phone', icon: <Phone />, type: 'tel', placeholder: 'Phone Number' }
            ].map(({ name, icon, type, placeholder }) => {
              const isPassword = name === 'pass' || name === 'confpass';
              return (
                <div key={name} className="relative">
                  <div className="absolute top-4 left-4 text-white">{icon}</div>
                  <input
                    type={isPassword && showPassword[name] ? 'text' : type}
                    name={name}
                    value={formData[name as keyof typeof formData] || ''}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-12 py-4 bg-glass-bg border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/10 transition"
                    placeholder={placeholder}
                  />
                  {isPassword && (
                    <div
                      className="absolute top-4 right-4 text-white cursor-pointer"
                      onClick={() => togglePasswordVisibility(name as 'pass' | 'confpass')}
                    >
                      {showPassword[name] ? <EyeOff size={20} /> : <Eye size={20} />}
                    </div>
                  )}
                </div>
              );
            })}

            {/* Course Select */}
            <div className="relative">
              <div className="absolute top-4 left-4 text-white">
                <GraduationCap className="w-5 h-5" />
              </div>
              <select
                name="course"
                value={formData.course}
                onChange={handleInputChange}
                required
                className="w-full pl-12 pr-4 py-4 bg-glass-bg border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/10 transition appearance-none"
              >
                <option value="" className="text-black">Select Course</option>
                {['Computer Science', 'Mechanical Engineering', 'Electrical Engineering', 'Civil Engineering', 'Electronics Engineering', 'Other'].map(course => (
                  <option key={course} value={course} className="text-black">{course}</option>
                ))}
              </select>
            </div>

            {/* Year Select */}
            <div className="relative md:col-span-2">
              <div className="absolute top-4 left-4 text-white">
                <Calendar className="w-5 h-5" />
              </div>
              <select
                name="year"
                value={formData.year}
                onChange={handleInputChange}
                required
                className="w-full pl-12 pr-4 py-4 bg-glass-bg border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/10 transition appearance-none"
              >
                <option value="" className="text-black">Select Year</option>
                {['1st Year', '2nd Year', '3rd Year', '4th Year', 'Alumni'].map(year => (
                  <option key={year} value={year} className="text-black">{year}</option>
                ))}
              </select>
            </div>

            {/* Interests */}
            <div className="md:col-span-2">
              <textarea
                name="interests"
                value={formData.interests}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-4 py-4 bg-glass-bg border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:border-white/40 focus:outline-none focus:ring-2 focus:ring-white/10 transition resize-none"
                placeholder="Tell us about your interests in civil services (optional)"
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-8 py-4 bg-white/10 text-white font-semibold rounded-2xl shadow hover:shadow-md hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Registering...</span>
              </div>
            ) : (
              'Join the Club'
            )}
          </button>

          {/* Terms */}
          <p className="text-center text-sm text-gray-400 mt-6">
            By joining, you agree to our{' '}
            <a href="#" className="text-white hover:underline">Terms of Service</a> and{' '}
            <a href="#" className="text-white hover:underline">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
