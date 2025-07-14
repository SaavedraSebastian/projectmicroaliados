export interface EmailTemplateOption {
  key: 'promotional' | 'newsletter' | 'welcome';
  title: string;
  description: string;
  icon: string;
  bgColor: string;
}