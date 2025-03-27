import { User } from "./user";

export interface Loan {
  id: number; // Corresponds to int in C#

  // Loan details
  approvedAmount: number; // Monto aprobado
  description?: string; // Optional property
  disbursedAmount: number; // Monto desembolsado
  principalBalance: number;
  accruedInterest: number;
  annualInterestRate: number;
  numberOfPayments: number;
  paymentFrequency: number; // Typo in C# model: "PaymentFrecuency" (should likely be "PaymentFrequency")

  // Details
  paymentValue: number;
  startDate: string; // Date as ISO string (DateOnly is replaced by string in TypeScript)
  nextPaymentDate: string;
  lastPaymentDate: string;
  deliveryDate: string; // Entrega
  status: string; // Default to 'Pending'

  // Navigation properties
  client?: User; // Optional UserDto type
  loanOfficer?: User; // Optional UserDto type

  // Audit fields
  createdAt: Date | string; // DateTime in C# is replaced by string (ISO format) in TypeScript
  updatedAt: Date | string; // Same as above
}
