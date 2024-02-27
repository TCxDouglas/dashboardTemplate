export const API_PROAFI = process.env.NEXT_PUBLIC_API_URL || '';
export const PROAFI_SESSION = 'proafi_token';
export const KEY_CONFIG_COLUM = 'proafi_column_3';
export const KEY_SORT_COLUMN = 'proafi_sort_column_3';
export enum Roles {
  Admin = 'admin',
}
export interface Sort {
  key: React.Key;
  mode: string | number;
}

export const KEYS_SORT = {
  ascend: 'asc',
  descend: 'desc',
} as const;
