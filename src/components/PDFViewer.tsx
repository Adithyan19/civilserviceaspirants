import React, { useEffect } from "react";
import { X, Download } from "lucide-react";
import { gsap } from "gsap";

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  type: "newspaper" | "question";
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
        ".pdf-viewer-modal",
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: "power2.out" },
      );
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
      <div className="pdf-viewer-modal flex flex-col h-full max-w-full mx-auto w-full">
        {/* Header */}
        <div className="p-4 bg-gray-900/95 border-b border-gray-700 flex flex-col sm:flex-row items-center sm:items-center justify-between space-y-4 sm:space-y-0">
          {/* Mobile: Only logo & text - visible on mobile */}
          <div className="flex items-center justify-between w-full sm:hidden space-x-3">
            <img
              src="/logo.jpg"
              alt="Civil Servants Club TKMCE"
              className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
            />
            <div className="flex-1 ml-3">
              <p className="text-white font-semibold text-base select-none truncate">
                Civil Servants Club
              </p>
              <p className="text-gray-400 text-xs truncate">TKMCE</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex-shrink-0"
              title="Close"
              aria-label="Close PDF viewer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Desktop and tablet: full header - hidden on mobile */}
          <div className="hidden sm:flex sm:flex-row sm:items-center sm:justify-between w-full">
            {/* Left Section */}
            <div className="flex items-center space-x-4 w-auto">
              <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-lg select-none">
                  CS
                </span>
              </div>
              <div className="truncate">
                <h3 className="text-white font-semibold truncate">{title}</h3>
                <p className="text-gray-400 text-sm capitalize">{type}</p>
              </div>
            </div>

            {/* Center Section - Download Button */}
            <div className="flex justify-center w-auto">
              <a
                href={pdfUrl}
                download={title || "document.pdf"}
                className="p-2 bg-neon-blue text-white rounded-lg hover:bg-neon-blue/90 transition"
                title="Download"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Download className="w-5 h-5" />
              </a>
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4 w-auto justify-end">
              <div className="flex items-center space-x-3">
                <img
                  src="/logo.jpg"
                  alt="Civil Servants Club TKMCE"
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="text-right min-w-0">
                  <p className="text-white font-semibold text-sm truncate">
                    Civil Servants Club
                  </p>
                  <p className="text-gray-400 text-xs">TKMCE</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex-shrink-0"
                title="Close"
                aria-label="Close PDF viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* PDF Viewer */}
        <div className="flex-1 bg-gray-800 p-4 overflow-auto">
          <iframe
            src={pdfUrl}
            title={title}
            className="w-full h-full rounded shadow-lg min-h-[60vh] sm:min-h-[80vh] border-none"
            scrolling="auto"
          />
        </div>

        {/* Footer */}
        <div className="bg-gray-900 p-3 text-center text-gray-400 text-xs sm:text-sm select-none">
          © 2024 Civil Servants Club TKMCE
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;
