export type NotificationType = 'success' | 'error' | 'info' | 'warning';

export interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
}

export interface NotificationContextProps {
  addNotification: (message: string, type: NotificationType, duration?: number) => void;
  removeNotification: (id: string) => void;
}