import { ObjectCommon, Params } from '@/Global';

export interface PropsGet {
  token: string;
  path: string;
  params?: Params;
}

export interface PropsPost {
  token: string;
  path: string;
  payload?: ObjectCommon;
  formData?: FormData;
}

export interface PropsPut {
  id: number | string;
  token: string;
  path: string;
  payload?: ObjectCommon;
  noID?: boolean;
  formData?: FormData;
}

export interface PropsGetOne extends PropsGet {
  id: number | string;
}

export interface PropsDelete {
  token: string;
  path: string;
  id: number;
}
