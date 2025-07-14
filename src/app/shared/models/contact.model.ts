export interface Contact {
  name: string;
  email: string;
  company?: string;
  phone?: string;
  lists: string[];
  status: 'active' | 'pending' | 'unsubscribed';
}