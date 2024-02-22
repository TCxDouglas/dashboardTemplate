/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useEffect, useState } from 'react';
import { useAuth } from './useAuth';
import { Sort } from '@/constants/constants';
import { StrapiPagination } from '@/types/Api';
import { ObjectCommon, Params } from '@/Global';
import {
  createApi,
  deleteApi,
  getListApi,
  getOneApi,
  sendRequestApi,
  updateApi,
} from '@/services/CrudServices';
import { generateSearch } from '@/utils/params';

interface Props {
  path: string;
  initialParams?: Params;
  pagination?: {
    pageSize: number;
    page: number;
  };
  initialGet?: boolean;
  updatePost?: boolean;
  fieldsSearch?: Array<string>;
  sortingDefault?: Sort;
  updateListToCreate?: boolean;
  customPost?: string;
  customDelete?: string;
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-constraint
export const useCrudServices = <T extends unknown>({
  path,
  initialGet = true,
  initialParams,
  updatePost = true,
  pagination = { page: 1, pageSize: 25 },
  sortingDefault = { key: '', mode: '' },
  updateListToCreate = true,
  customPost,
  customDelete,
  fieldsSearch = [],
}: Props) => {
  const { userInfo, token } = useAuth();
  const tokenUser = token || '';
  const [list, setList] = useState<Array<T>>([]);
  const [loadingGet, setLoadingGet] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const [page, setPage] = useState(pagination.page);
  const [metaPage, setMetaPage] = useState<StrapiPagination>({
    page: 1,
    pageCount: 1,
    pageSize: 25,
    total: 1,
  });
  const [search, setSearch] = useState('');
  const [sortMode, setSortMode] = useState<Sort>(sortingDefault);
  const [filters, setFilters] = useState<Params | undefined>();

  const getList = async () => {
    try {
      if (!userInfo) return;
      let params = initialParams;

      if (filters) params = { ...params, ...filters };
      if (sortMode.key !== '') {
        params = {
          ...params,
          sort: `${sortMode.key}:${sortMode.mode}`,
        };
      }
      params = {
        ...params,
        'pagination[pageSize]': pagination.pageSize,
        'pagination[page]': page,
      };
      const paramSearch = generateSearch(fieldsSearch, search);
      params = { ...params, ...paramSearch };
      setLoadingGet(true);
      const resList = await getListApi<T>({ token: tokenUser, path, params });
      setLoadingGet(false);
      if (resList) {
        setList(resList.data);

        if (resList.meta) setMetaPage(resList.meta.pagination);

        return;
      }
    } catch (error) {
      //console.log(error)
    }
  };

  const create = async (payload: ObjectCommon, pathCustom?: string) => {
    try {
      if (!userInfo) return;
      setLoadingAction(true);
      const resCreate = await createApi<T>({ path: pathCustom || path, payload, token: tokenUser });
      setLoadingAction(false);

      if (resCreate) {
        if (!updateListToCreate) return resCreate.data;

        if (updatePost) await getList();

        return resCreate.data || resCreate;
      }
    } catch (error) {
      //console.log(error)
    }
  };

  const update = async (id: number | string, payload: ObjectCommon) => {
    try {
      if (!userInfo) return;
      setLoadingAction(true);
      const resUpdate = await updateApi<T>({ path, payload, id, token: tokenUser });
      setLoadingAction(false);
      if (resUpdate) {
        if (updatePost) await getList();

        return resUpdate.data || resUpdate;
      }
    } catch (error) {
      //console.log(error)
    }
  };

  const changePage = (number: number) => {
    setPage(number);
  };

  const getOneItem = async (id: number | string, params?: Params) => {
    try {
      if (!userInfo) return;
      setLoadingGet(true);
      const resGetOne = await getOneApi<T>({ id, params, path, token: tokenUser });
      setLoadingGet(false);

      if (resGetOne) return resGetOne.data;
    } catch (error) {
      //console.log(error)
    }
  };
  const sendRequest = async (id: number | string, params?: Params) => {
    try {
      if (!userInfo) return;
      setLoadingGet(true);
      const resGetOne = await sendRequestApi<T>({ id, params, path, token: tokenUser });
      setLoadingGet(false);

      if (resGetOne) return resGetOne;
    } catch (error) {
      //console.log(error)
    }
  };

  const createForImage = async (payload: FormData) => {
    try {
      if (!userInfo) return;
      setLoadingAction(true);
      const resCreate = await createApi<T>({
        path: customPost || path,
        formData: payload,
        token: tokenUser,
      });
      setLoadingAction(false);

      if (resCreate) {
        if (updatePost) await getList();

        return resCreate.data;
      }
    } catch (error) {
      //console.log(error)
    }
  };

  const updateForImage = async (id: number, payload: FormData) => {
    try {
      if (!userInfo) return;
      setLoadingAction(true);
      const resCreate = await updateApi<T>({ path, formData: payload, token: tokenUser, id });
      setLoadingAction(false);

      if (resCreate) {
        if (updatePost) await getList();

        return resCreate.data;
      }
    } catch (error) {
      //console.log(error)
    }
  };

  const deleteItem = async (id: number) => {
    try {
      if (!userInfo) return;

      setLoadingAction(true);
      const resDelete = await deleteApi({
        id,
        path: customDelete || path,
        token: tokenUser,
      });
      setLoadingAction(false);
      if (resDelete && resDelete.data) {
        if (!updateListToCreate) return { data: resDelete.data || resDelete, error: null };

        if (updatePost) await getList();

        return { data: resDelete.data || resDelete, error: null };
      }

      if (resDelete && resDelete.error) return { data: null, error: resDelete.error };
    } catch (error) {
      //console.log(error);
    }
  };

  const changeFilters = (filter: Params) => {
    setFilters(filter);
  };
  const changeSort = (sort: Sort) => {
    if (sort.key === '') {
      setSortMode(sortingDefault);

      return;
    }
    setSortMode(sort);
  };

  useEffect(() => {
    if (!initialGet) return;
    const timer = setTimeout(() => {
      getList();
    }, 200);

    return () => clearTimeout(timer);
  }, [page, search, sortMode, filters]);

  return {
    list,
    getList,
    loadingGet,
    create,
    loadingAction,
    update,
    metaPage,
    changePage,
    getOneItem,
    handleSearch: (value: string) => setSearch(value.trim()),
    sortMode,
    handleSort: changeSort,
    createForImage,
    updateForImage,
    deleteItem,
    changeFilters,
    sendRequest,
  };
};
