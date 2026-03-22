import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { Notification, NotificationType, NotificationContextProps } from './types';
import { Toast } from './Toast';
import { injectStyles } from './styles';

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => { injectStyles(); }, []);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const timers = React.useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const removeNotification = useCallback((id: string) => {
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer);
      timers.current.delete(id);
    }
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback((message: string, type: NotificationType, duration = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    setNotifications((prev) => [...prev, { id, message, type, duration }]);
    const timer = setTimeout(() => removeNotification(id), duration);
    timers.current.set(id, timer);
  }, [removeNotification]);

  useEffect(() => {
    const t = timers.current;
    return () => { t.forEach(clearTimeout); };
  }, []);

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      {/* Contenedor fijo para las notificaciones */}
      <div className="sky-container">
        {notifications.map((n) => (
          <Toast key={n.id} notification={n} onClose={removeNotification} />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) throw new Error("useNotification debe usarse dentro de NotificationProvider");
  return context;
};