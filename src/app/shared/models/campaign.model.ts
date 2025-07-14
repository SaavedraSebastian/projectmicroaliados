export interface Campaign {
  id: number;
  title: string;
  openRate: number;
  clicks: number;
  date: string;
  recipients?: number;
  clickRate?: number;
  conversionRate?: number;
}