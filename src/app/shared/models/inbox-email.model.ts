import { Email } from "./email.model";

export interface InboxEmail extends Email {
  type: 'inbox';
  from: string;
  email: string;
  read: boolean;
  icon: string;
  color: string;
}