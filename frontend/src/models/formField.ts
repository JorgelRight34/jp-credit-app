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
  showOnEditFn?: (entity: TData) => ReactNode;
  disabledFn?: (data: TData) => boolean;
  multiple?: boolean;
  defaultValue?: string | number | null;
  watch?: keyof TData; // field name to watch
  disabledWhen?: (watchedValue: unknown) => boolean; // disable condition
}
