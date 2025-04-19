import { ReactNode } from "react";
import { Role } from "./role";

export interface FormField<TData> {
  name: string;
  label: string;
  type?: string;
  min?: string;
  required?: boolean;
  fixedWatchedValue?: number | string;
  step?: number;
  rows?: number;
  options?: (string | number)[][];
  profileDataList?: boolean;
  profileRole?: Role;
  showOnEdit?: boolean;
  defaultToToday?: boolean;
  showOnNewRow?: boolean;
  show?: boolean;
  showOnEditFn?: (entity: TData) => ReactNode;
  disabledFn?: (data: TData) => boolean;
  multiple?: boolean;
  defaultValue?: string | number | null;
  watchedValue?: keyof TData; // field name to watch
  disabledWhen?: (watch: (fieldName: keyof TData) => unknown) => boolean; // disable condition
  validationFn?: (watchedValue: unknown) => boolean;
}
