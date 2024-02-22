export const API_PROAFI = process.env.NEXT_PUBLIC_API_URL || '';
export const API_GEONAMES = 'https://secure.geonames.org';
export const USERNAME_GEONAMES = 'betacode';
export const PROAFI_SESSION = 'proafi_token';
export const KEY_CONFIG_COLUM = 'proafi_column_3';
export const KEY_SORT_COLUMN = 'proafi_sort_column_3';
export enum Roles {
  Admin = 'administrator',
}
export interface Sort {
  key: React.Key;
  mode: string | number;
}

export const KEYS_SORT = {
  ascend: 'asc',
  descend: 'desc',
} as const;

export type TypePeriod = 'biannual' | 'annual' | 'quarterly' | 'bimonthly' | 'monthly';

export const PERIOD_PAYMENT = [
  { label: 'Anual', value: 'annual' },
  { label: 'Semestral', value: 'biannual' },
  { label: 'Trimestral', value: 'quarterly' },
  { label: 'Mensual', value: 'monthly' },
];

export const LABEL_ERROR_RELATIONS: Record<string, string> = {
  beneficiaries: 'Beneficiarios',
  insuranceComments: 'Comentarios del Asegurado',
  payments: 'Abonos',
  agentCompanies: 'Agente de Compañias',
  companyPlans: 'Planes de Compañias',
  insurances: 'Asegurados',
  paymentCharges: 'Cargos de Abonos',
} as const;

export const OPTIONS_MONTH = [
  { label: 'Enero', value: 1 },
  { label: 'Febrero', value: 2 },
  { label: 'Marzo', value: 3 },
  { label: 'Abril', value: 4 },
  { label: 'Mayo', value: 5 },
  { label: 'Junio', value: 6 },
  { label: 'Julio', value: 7 },
  { label: 'Agosto', value: 8 },
  { label: 'Septiembre', value: 9 },
  { label: 'Octubre', value: 10 },
  { label: 'Noviembre', value: 11 },
  { label: 'Diciembre', value: 12 },
];
