export interface Tenant {
  id: number | null;
  name: string;
  email: string;
  password?: string; 
  createdAt: string;
  isActive: boolean;
  subscription: string;
  billingCycle: string;
  dataUsage: number;
}
