import { Email } from "./email.model";

export interface SentEmail extends Email {
  type: 'sent';
  to: string;
}