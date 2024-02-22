import { Roles } from './constants';

export type Routes =
  | '/agents'
  | '/login'
  ;

export const PERMISSION_ROUTE: Record<Routes, Array<Roles>> = {
  '/agents': [Roles.Admin],
  "/login": []
};

export const NAME_PAGE: Partial<Record<Routes, string>> = {
  '/agents': 'Agentes',
};

export const NOT_SHOW_INPUT: Partial<Record<Routes, boolean>> = {};

export const SHOW_BUTTONBACK: Partial<Record<Routes, boolean>> = {};
