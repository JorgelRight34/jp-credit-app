import { User } from "./user";

export interface Collateral {
  id: number;
  title: string;
  description: string;
  value: number;
  documentUrl: string;
  clientId: string;
  condition: string;
  state: string;
  client: User;
}
