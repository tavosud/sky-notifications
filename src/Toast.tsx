import React from 'react';
import { Notification } from './types';

interface ToastProps {
  notification: Notification;
  onClose: (id: string) => void;
}

export const Toast: React.FC<ToastProps> = ({ notification, onClose }) => {
  return (
    <div className={`sky-toast sky-toast-${notification.type}`}>
      <span className="sky-toast-message">{notification.message}</span>
      <button
        onClick={() => onClose(notification.id)}
        className="sky-toast-close"
        aria-label="Cerrar notificación"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
      </button>
    </div>
  );
};