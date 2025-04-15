import { ReactNode } from "react";
import { Role } from "./role";

export interface FormField<TData> {
  name: string;
  label: string;
  type?: string;
  min?: string;
  required?: true;
  step?: number;
  rows?: number;
  options?: (string | number)[][];
  profileDataList?: boolean;
  profileRole?: Role;
  showOnEdit?: boolean;
  defaultToToday?: boolean;
  showOnNewRow?: boolean;
  showOnEditFn?: (entity: TData) => ReactNode;
  disabledFn?: (data: any) => boolean;
  multiple?: boolean;
}
