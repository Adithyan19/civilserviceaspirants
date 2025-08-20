import React, { useState, createContext, useContext } from "react";
import { X, AlertTriangle, CheckCircle, Info, AlertCircle } from "lucide-react";

// Toast types
export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextType {
  showToast: (message: string, type: ToastType, duration?: number) => void;
  showError: (message: string, duration?: number) => void;
  showSuccess: (message: string, duration?: number) => void;
  showWarning: (message: string, duration?: number) => void;
  showInfo: (message: string, duration?: number) => void;
}

// Context for toast notifications
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Custom hook to use toast
export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

// Individual Toast Component
const ToastItem: React.FC<{ toast: Toast; onRemove: (id: string) => void }> = ({
  toast,
  onRemove,
}) => {
  React.useEffect(() => {
    const duration = toast.duration || 5000;
    const timer = setTimeout(() => {
      onRemove(toast.id);
    }, duration);

    return () => clearTimeout(timer);
  }, [toast, onRemove]);

  const getToastStyles = () => {
    switch (toast.type) {
      case "error":
        return "bg-red-500/90 border-red-400 text-white shadow-lg shadow-red-500/25";
      case "success":
        return "bg-green-500/90 border-green-400 text-white shadow-lg shadow-green-500/25";
      case "warning":
        return "bg-yellow-500/90 border-yellow-400 text-white shadow-lg shadow-yellow-500/25";
      case "info":
        return "bg-blue-500/90 border-blue-400 text-white shadow-lg shadow-blue-500/25";
      default:
        return "bg-gray-500/90 border-gray-400 text-white shadow-lg";
    }
  };

  const getIcon = () => {
    switch (toast.type) {
      case "error":
        return <AlertCircle className="w-5 h-5 flex-shrink-0" />;
      case "success":
        return <CheckCircle className="w-5 h-5 flex-shrink-0" />;
      case "warning":
        return <AlertTriangle className="w-5 h-5 flex-shrink-0" />;
      case "info":
        return <Info className="w-5 h-5 flex-shrink-0" />;
      default:
        return <Info className="w-5 h-5 flex-shrink-0" />;
    }
  };

  return (
    <div
      className={`
        ${getToastStyles()} 
        backdrop-blur-md border rounded-lg p-4
        transform transition-all duration-500 ease-in-out
        max-w-sm w-full flex items-start space-x-3
        animate-slide-in-right
      `}
      style={{
        animation: "slideInRight 0.3s ease-out forwards",
      }}
    >
      {getIcon()}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium leading-5 whitespace-pre-wrap break-words">
          {toast.message}
        </p>
      </div>
      <button
        onClick={() => onRemove(toast.id)}
        className="flex-shrink-0 p-1 rounded-full hover:bg-white/10 transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

// Toast Container Component
const ToastContainer: React.FC<{
  toasts: Toast[];
  onRemove: (id: string) => void;
}> = ({ toasts, onRemove }) => {
  if (toasts.length === 0) return null;

  return (
    <>
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out forwards;
        }
      `}</style>
      <div className="fixed top-4 right-4 z-[9999] space-y-2 pointer-events-none">
        <div className="space-y-2 pointer-events-auto">
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
          ))}
        </div>
      </div>
    </>
  );
};

// Toast Provider Component
export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: ToastType, duration = 5000) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = { id, message, type, duration };

    setToasts((prev) => [...prev, newToast]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  const showError = (message: string, duration = 6000) =>
    showToast(message, "error", duration);
  const showSuccess = (message: string, duration = 4000) =>
    showToast(message, "success", duration);
  const showWarning = (message: string, duration = 5000) =>
    showToast(message, "warning", duration);
  const showInfo = (message: string, duration = 4000) =>
    showToast(message, "info", duration);

  const contextValue: ToastContextType = {
    showToast,
    showError,
    showSuccess,
    showWarning,
    showInfo,
  };

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
};
