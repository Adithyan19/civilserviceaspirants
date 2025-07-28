import React, { useEffect } from 'react';
import { X, Download } from 'lucide-react';
import { gsap } from 'gsap';

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  type: 'newspaper' | 'question';
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  isOpen,
  onClose,
  pdfUrl,
  title,
  type,
}) => {
  useEffect(() => {
    if (isOpen) {
      gsap.fromTo(
        '.pdf-viewer-modal',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
      <div className="pdf-viewer-modal h-full flex flex-col">
        {/* Header */}
        <div className="p-4 bg-gray-900/95 border-b border-gray-700 flex items-center">
          
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">CS</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">{title}</h3>
              <p className="text-gray-400 text-sm capitalize">{type}</p>
            </div>
          </div>

          {/* ✅ Center Section - Download Button */}
          <div className="flex flex-1 justify-center">
            <a
              href={pdfUrl}
              download={title || 'document.pdf'}
              className="p-2 bg-neon-blue text-white rounded-lg"
              title="Download"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Download className="w-5 h-5" />
            </a>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img
                src="/logo.jpg"
                alt="Civil Servants Club TKMCE"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="text-right">
                <p className="text-white font-semibold text-sm">
                  Civil Servants Club
                </p>
                <p className="text-gray-400 text-xs">TKMCE</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-red-600 text-white rounded-lg"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-gray-800 p-4">
          <iframe
            src={pdfUrl}
            title={title}
            className="w-full h-full rounded shadow-lg"
            style={{ minHeight: '80vh', border: 'none' }}
          />
        </div>

        {/* Footer */}
        <div className="bg-gray-900 p-4 text-center text-gray-400 text-sm">
          © 2024 Civil Servants Club TKMCE
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
