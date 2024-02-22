export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface ResponseStrapi<T> {
  data: T;
  meta: {
    pagination: StrapiPagination;
  };
}

export interface ExistRegister {
  exists: boolean;
}

interface Relations {
  id: number;
}

export interface ResponseError {
  error: ErrorRelations;
}
export interface ErrorRelations {
  message: string;
  name: string;
  status: number;
  details: {
    code: number;
    error: string;
    relations: Record<string, Array<Relations>>;
  };
}
