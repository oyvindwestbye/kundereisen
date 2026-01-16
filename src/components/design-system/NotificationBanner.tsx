import React from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

interface NotificationBannerProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title?: string;
  message: string;
  onClose?: () => void;
  closable?: boolean;
  unreadCount?: number;
}

export function NotificationBanner({ 
  type, 
  title, 
  message, 
  onClose, 
  closable = true,
  unreadCount
}: NotificationBannerProps) {
  const config = {
    success: {
      bg: 'bg-[#d1f4db]',
      text: 'text-[#24a148]',
      icon: CheckCircle
    },
    error: {
      bg: 'bg-[#ffd7d9]',
      text: 'text-[#da1e28]',
      icon: AlertCircle
    },
    warning: {
      bg: 'bg-[#fdf5d9]',
      text: 'text-[#946800]',
      icon: AlertTriangle
    },
    info: {
      bg: 'bg-[#d0e2ff]',
      text: 'text-[#0062ff]',
      icon: Info
    }
  };
  
  const { bg, text, icon: Icon } = config[type];
  
  return (
    <div className={`flex items-start gap-3 p-4 rounded-lg ${bg}`}>
      <Icon className={`flex-shrink-0 mt-0.5 ${text}`} size={20} />
      <div className="flex-1">
        {title && (
          <h6 className={text}>{title}</h6>
        )}
        <p className={`text-sm ${text}`}>
          {message}
          {unreadCount !== undefined && unreadCount > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-white/50 rounded-full">
              {unreadCount} ulest{unreadCount !== 1 ? 'e meldinger' : ' melding'}
            </span>
          )}
        </p>
      </div>
      {closable && (
        <button
          onClick={onClose}
          className={`flex-shrink-0 ${text} hover:opacity-70 transition-opacity`}
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}