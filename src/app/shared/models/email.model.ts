import { Attachment } from "./attachment.model";
export interface Email {
  id: number;
  subject: string;
  body: string;
  date: string;
  attachments: Attachment[];
  read?: boolean;
  from?: string;
  email?: string;
  to?: string;
  icon?: string;
  color?: string;
  preview?: string;
}