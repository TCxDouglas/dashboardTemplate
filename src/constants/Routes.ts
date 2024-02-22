import { Roles } from './constants';

export type Routes =
  | '/company'
  | '/agents'
  | '/insured'
  | '/login'
  | '/payments'
  | '/create_insured'
  | '/edit_insured'
  | '/charges'
  | '/create_payment'
  | '/details_payment'
  | '/loans'
  | '/collections'
  | '/cancellation_payment'
  | '/details_loan';

export const PERMISSION_ROUTE: Record<Routes, Array<Roles>> = {
  '/company': [Roles.Admin],
  '/agents': [Roles.Admin],
  '/insured': [Roles.Admin],
  '/payments': [Roles.Admin],
  '/login': [],
  '/create_insured': [Roles.Admin],
  '/edit_insured': [Roles.Admin],
  '/charges': [Roles.Admin],
  '/create_payment': [Roles.Admin],
  '/details_payment': [Roles.Admin],
  '/loans': [Roles.Admin],
  '/collections': [Roles.Admin],
  '/cancellation_payment': [Roles.Admin],
  '/details_loan': [Roles.Admin],
};

export const NAME_PAGE: Record<Routes, string> = {
  '/agents': 'Agentes',
  '/company': 'Compañia',
  '/insured': 'Asegurados',
  '/login': '',
  '/payments': 'Abonos',
  '/create_insured': 'Agregar un nuevo asegurado',
  '/edit_insured': 'Editando Asegurado',
  '/charges': 'Cargos',
  '/create_payment': 'Abonos',
  '/details_payment': 'Abono',
  '/loans': 'Prestamos',
  '/collections': 'Lista de Cobros',
  '/cancellation_payment': 'Anulando Abono',
  '/details_loan': 'Detalles del Prestamo',
};

export const NOT_SHOW_INPUT: Partial<Record<Routes, boolean>> = {
  '/create_insured': true,
  '/edit_insured': true,
  '/create_payment': true,
  '/details_payment': true,
  '/cancellation_payment': true,
  '/details_loan': true,
};

export const SHOW_BUTTONBACK: Partial<Record<Routes, boolean>> = {
  '/create_insured': true,
  '/edit_insured': true,
  '/create_payment': true,
  '/details_payment': true,
  '/cancellation_payment': true,
  '/details_loan': true,
};
