import { LoanStatus } from "../models/loanStatus";
import { MaritalStatus } from "../models/maritalStatus";
import { Role } from "../models/role";

export const roleSpanishTranslations: Record<Role, string> = {
  admin: "administrador",
  loanOfficer: "asesor",
  loanofficer: "asesor",
  client: "cliente",
  guarantor: "garante",
  user: "usuario",
  profile: "usuario",
};

export const loanStatusSpanishTranslations: Record<LoanStatus, string> = {
  [LoanStatus.Active]: "activo",
  [LoanStatus.Agreement]: "convenio",
  [LoanStatus.Judicial]: "judicial",
  [LoanStatus.Legal]: "legal",
  [LoanStatus.Punished]: "castigado",
  [LoanStatus.Settled]: "liquidado",
};

export const maritalStatusSpanishTranslations: Record<MaritalStatus, string> = {
  married: "casado",
  single: "soltero",
  widow: "viudo",
  divorced: "divorciado",
};
