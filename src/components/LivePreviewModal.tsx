'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Monitor, Smartphone, Maximize2, Minimize2 } from 'lucide-react';

interface LivePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  templateName: string;
  htmlContent: string;
  activeAddons?: string[];
}

export default function LivePreviewModal({
  isOpen,
  onClose,
  templateName,
  htmlContent,
  activeAddons = [],
}: LivePreviewModalProps) {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Inject addon badges into the HTML content
  const getEnhancedHtml = () => {
    if (activeAddons.length === 0) return htmlContent;

    const addonBadgesHtml = activeAddons.map(name =>
      `<div style="position:fixed;bottom:${20 + activeAddons.indexOf(name) * 40}px;right:20px;background:#6366f1;color:white;padding:6px 14px;border-radius:20px;font-size:12px;font-family:sans-serif;z-index:9999;box-shadow:0 2px 8px rgba(0,0,0,0.2);animation:slideIn 0.3s ease;">&#10003; ${name}</div>`
    ).join('');

    return htmlContent.replace('</body>', `${addonBadgesHtml}</body>`);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className={`relative bg-white rounded-2xl shadow-2xl flex flex-col transition-all duration-300 ${
        isFullscreen ? 'w-full h-full rounded-none' : 'w-[95vw] h-[90vh] max-w-6xl'
      }`}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50 rounded-t-2xl flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex items-center gap-2 ml-2">
              <div className="bg-green-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-md animate-pulse">
                LIVE
              </div>
              <span className="text-sm font-medium text-gray-700">{templateName}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {activeAddons.length > 0 && (
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {activeAddons.length} add-on attivi
              </span>
            )}
            <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
              <button
                onClick={() => setViewMode('desktop')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'desktop' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Monitor className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('mobile')}
                className={`p-1.5 rounded-md transition-colors ${
                  viewMode === 'mobile' ? 'bg-white shadow-sm text-gray-800' : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Smartphone className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-hidden bg-gray-100 flex items-start justify-center p-4">
          <div className={`h-full bg-white shadow-lg transition-all duration-300 ${
            viewMode === 'mobile' ? 'w-[375px] rounded-[2rem] border-[8px] border-gray-800' : 'w-full rounded-lg'
          }`}>
            <iframe
              ref={iframeRef}
              srcDoc={getEnhancedHtml()}
              className="w-full h-full border-0"
              style={{ borderRadius: viewMode === 'mobile' ? '1.5rem' : '0.5rem' }}
              title={`Anteprima ${templateName}`}
              sandbox="allow-same-origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
