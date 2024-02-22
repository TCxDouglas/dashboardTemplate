declare module '*.module.css';
declare module '*.module.scss';

export type ActionCrud = 'new' | 'edit';

export type Params = Record<string, string | number | boolean>;
export interface ObjectCommon {
  [name: string]: any;
}
