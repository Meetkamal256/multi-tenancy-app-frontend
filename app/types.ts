export interface Tenant {
  id: number | null;
  name: string;
  email: string;
  createdAt: string;
  isActive: boolean;
  subscription: string;
  billingCycle: string;
  dataUsage: number;
}
