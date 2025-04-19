import { CollateralAgreementType } from "../models/collateralAgreementType";
import { CollateralCondition } from "../models/collateralCondition";
import { CollateralStatus } from "../models/collateralStatus";
import { LoanStatus } from "../models/loanStatus";
import { MaritalStatus } from "../models/maritalStatus";
import { Role } from "../models/role";
import countries from "i18n-iso-countries";
import "i18n-iso-countries/langs/es.json";
import esLocale from "i18n-iso-countries/langs/es.json";
import { TransactionType } from "../models/transactionType";

countries.registerLocale(esLocale);

export const countryTraductions = countries;

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

export const collateralConditionSpanishTranslations: Record<
  CollateralCondition,
  string
> = {
  [CollateralCondition.HIGH_QUALITY]: "alta calidad",
  [CollateralCondition.LOW_QUALITY]: "baja calidad",
  [CollateralCondition.STABLE]: "estable",
  [CollateralCondition.DEPRECIATING]: "depreciando",
  [CollateralCondition.LIQUID]: "líquido",
  [CollateralCondition.ILLIQUID]: "ilíquido",
  [CollateralCondition.LOW_RISK]: "bajo riesgo",
  [CollateralCondition.HIGH_RISK]: "alto riesgo",
  [CollateralCondition.EASILY_RECOVERABLE]: "fácil de recuperar",
  [CollateralCondition.VOLATILE]: "volátil",
  [CollateralCondition.SECURE]: "seguro",
  [CollateralCondition.UNDERVALUED]: "subvalorado",
  [CollateralCondition.OVERVALUED]: "sobrevalorado",
  [CollateralCondition.APPRECIATING]: "apreciando",
  [CollateralCondition.DIVERSIFIED]: "diversificado",
  [CollateralCondition.CONCENTRATED]: "concentrado",
};

export const collateralStatusSpanishTranslations: Record<
  CollateralStatus,
  string
> = {
  [CollateralStatus.PENDING]: "pendiente",
  [CollateralStatus.APPROVED]: "aprobado",
  [CollateralStatus.REJECTED]: "rechazado",
  [CollateralStatus.UNDER_REVIEW]: "en revisión",
  [CollateralStatus.ACTIVE]: "activo",
  [CollateralStatus.INACTIVE]: "inactivo",
  [CollateralStatus.SEIZED]: "incautado",
  [CollateralStatus.RELEASED]: "liberado",
  [CollateralStatus.DEFAULTED]: "incumplido",
  [CollateralStatus.CLEARED]: "liquidado",
  [CollateralStatus.EXPIRED]: "vencido",
  [CollateralStatus.ON_HOLD]: "en espera",
};

export const collateralAgreementTypeSpanishTranslations: Record<
  CollateralAgreementType,
  string
> = {
  [CollateralAgreementType.CarLoan]: "Préstamo de vehículo",
  [CollateralAgreementType.Mortgage]: "Hipoteca",
  [CollateralAgreementType.PersonalLoan]: "Préstamo personal",
  [CollateralAgreementType.BusinessLoan]: "Préstamo comercial",
  [CollateralAgreementType.StudentLoan]: "Préstamo estudiantil",
  [CollateralAgreementType.EquipmentFinance]: "Financiamiento de equipos",
  [CollateralAgreementType.CreditLine]: "Línea de crédito",
  [CollateralAgreementType.AgriculturalLoan]: "Préstamo agrícola",
};

export const transactionTypesFullNames: Record<TransactionType, string> = {
  [TransactionType.DS]: "Desembolso",
  [TransactionType.PC]: "Pago Cuota",
  [TransactionType.NC]: "Nota de Crédito",
  [TransactionType.ND]: "Nota de Débito",
}