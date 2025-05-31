/**
 * Типы для работы с формами Formio
 */

// Тип для компонента формы
export interface FormioComponent {
  type: string;
  key: string;
  label: string;
  input?: boolean;
  tableView?: boolean;
  components?: FormioComponent[];
  values?: { label: string; value: string }[];
  data?: {
    values?: { label: string; value: string }[];
  };
  defaultValue?: any;
  multiple?: boolean;
  hidden?: boolean;
  clearOnHide?: boolean;
  customConditional?: string;
}

// Тип для формы
export interface FormioForm {
  _id: string;
  title: string;
  name: string;
  path: string;
  type: string;
  display: string;
  components: FormioComponent[];
}

// Тип для поля фильтра
export interface FilterField {
  key: string;
  label: string;
  type: "text" | "number" | "boolean" | "select";
  path: string;
  operators: string[];
  values?: { label: string; value: string }[];
}

// Тип для конфигурации фильтров
export interface FilterConfig {
  fields: FilterField[];
  defaultField: string;
}
