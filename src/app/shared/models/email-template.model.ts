export interface EmailTemplate {
  id: number;
  name: string;
  category: 'marketing' | 'transactional' | 'newsletter';
  updatedAt: Date;
  previewImage?: string;

  title: string;
  description: string;
  icon: string;
  bgColor: string;
}
