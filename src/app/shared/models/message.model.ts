
export interface Message {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline' | 'typing';
  lastMessage: string;
  time: string;
  unread: number;
  hasAttachment: boolean;
  isRead: boolean;
  isActive: boolean;
  isNew: boolean;
}