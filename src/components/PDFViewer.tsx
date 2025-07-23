import React, { useEffect, useState } from 'react';
import { X, Download, ZoomIn, ZoomOut, RotateCw } from 'lucide-react';
import { gsap } from 'gsap';

interface PDFViewerProps {
  isOpen: boolean;
  onClose: () => void;
  pdfUrl: string;
  title: string;
  type: 'newspaper' | 'question';
}

const PDFViewer: React.FC<PDFViewerProps> = ({ isOpen, onClose, pdfUrl, title, type }) => {
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    if (isOpen) {
      gsap.fromTo('.pdf-viewer-modal',
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' }
      );
    }
  }, [isOpen]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));
  const handleRotate = () => setRotation(prev => (prev + 90) % 360);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex flex-col">
      <div className="pdf-viewer-modal h-full flex flex-col">
        {/* Header with logos and controls */}
        <div className="flex items-center justify-between p-4 bg-gray-900/95 backdrop-blur-sm border-b border-gray-700">
          {/* Left Logo */}
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg 
                          flex items-center justify-center">
              <span className="text-white font-bold text-lg">CS</span>
            </div>
            <div>
              <h3 className="text-white font-semibold">{title}</h3>
              <p className="text-gray-400 text-sm capitalize">{type}</p>
            </div>
          </div>

          {/* Center Controls */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleZoomOut}
              className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              title="Zoom Out"
            >
              <ZoomOut className="w-5 h-5" />
            </button>
            <span className="text-white text-sm min-w-[60px] text-center">{zoom}%</span>
            <button
              onClick={handleZoomIn}
              className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              title="Zoom In"
            >
              <ZoomIn className="w-5 h-5" />
            </button>
            <button
              onClick={handleRotate}
              className="p-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg transition-colors"
              title="Rotate"
            >
              <RotateCw className="w-5 h-5" />
            </button>
            <button
              className="p-2 bg-neon-blue hover:bg-neon-blue/80 text-white rounded-lg transition-colors"
              title="Download"
            >
              <Download className="w-5 h-5" />
            </button>
          </div>

          {/* Right Logo and Close */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.jpg" 
                alt="Civil Servants Club TKMCE" 
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="text-right">
                <p className="text-white font-semibold text-sm">Civil Servants Club</p>
                <p className="text-gray-400 text-xs">TKMCE</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* PDF Content Area */}
        <div className="flex-1 overflow-auto bg-gray-800 p-4 min-h-0">
          <div className="flex justify-center">
            <div 
              className="bg-white shadow-2xl"
              style={{
                transform: `scale(${zoom / 100}) rotate(${rotation}deg)`,
                transformOrigin: 'center top',
                transition: 'transform 0.3s ease'
              }}
            >
              {/* PDF.js integration would go here */}
              {/* For now, showing a placeholder */}
              <div className="w-[595px] h-[842px] bg-white border border-gray-300 p-8 relative">
                {/* Watermark logos */}
                <div className="absolute top-4 left-4 opacity-10">
                  <div className="w-16 h-16 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg 
                                flex items-center justify-center">
                    <span className="text-white font-bold text-xl">CS</span>
                  </div>
                </div>
                <div className="absolute top-4 right-4 opacity-10">
                  <img 
                    src="/logo.jpg" 
                    alt="TKMCE Logo" 
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                </div>

                {/* Sample PDF Content */}
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-gray-800 mb-2">{title}</h1>
                  <p className="text-gray-600">Civil Servants Club TKMCE</p>
                </div>

                <div className="space-y-4 text-gray-700">
                  <p>This is a sample PDF viewer showing how documents will be displayed within the website.</p>
                  <p>The actual PDF content would be rendered here using PDF.js or a similar library.</p>
                  <p>Key features:</p>
                  <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Club logos displayed as watermarks</li>
                    <li>Zoom in/out functionality</li>
                    <li>Rotation controls</li>
                    <li>Download option</li>
                    <li>Full-screen viewing experience</li>
                  </ul>
                  
                  <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold mb-2">Integration Notes:</h3>
                    <p className="text-sm">
                      To integrate actual PDF viewing, you would use PDF.js library 
                      or react-pdf component to render the PDF content in this area.
                    </p>
                  </div>
                </div>

                {/* Footer watermark */}
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 opacity-10">
                  <p className="text-xs text-gray-400">Civil Servants Club TKMCE</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900/95 backdrop-blur-sm border-t border-gray-700 p-4 flex-shrink-0">
        <div className="flex items-center justify-center space-x-6 text-gray-400 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-gradient-to-r from-neon-blue to-neon-purple rounded-lg 
                          flex items-center justify-center">
              <span className="text-white font-bold text-xs">CS</span>
            </div>
            <span>Civil Servants Club TKMCE</span>
          </div>
          <span>•</span>
          <span>© 2024 All rights reserved</span>
        </div>
      </div>
    </div>
  );
};

export default PDFViewer;