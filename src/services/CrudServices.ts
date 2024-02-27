import axios, { AxiosError } from 'axios';
import { API_URL } from '@/constants/constants';
import { ResponseError, ResponseStrapi } from '@/types/Api';
import { PropsDelete, PropsGet, PropsGetOne, PropsPost, PropsPut } from '@/types/CrudApi';

export const getListApi = async <T>({ params, path, token }: PropsGet) => {
  try {
    const { data, status } = await axios.get<ResponseStrapi<T[]>>(`${API_URL}/${path}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { ...params },
    });

    return status === 200 ? data : false;
  } catch (error) {
    //console.log(error)
  }
};

export const createApi = async <T>({ path, payload, token, formData }: PropsPost) => {
  try {
    const payloadSend = payload || formData;
    const { data, status } = await axios.post<ResponseStrapi<T>>(
      `${API_URL}/${path}`,
      payloadSend,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': formData ? 'multipart/form-data' : undefined,
        },
      },
    );

    return status === 200 || status === 201 ? data : false;
  } catch (error) {
    //console.log(error);
  }
};

export const updateApi = async <T>({ id, path, payload, token, noID, formData }: PropsPut) => {
  const payloadSend = payload || formData;
  const completePath = noID ? `${API_URL}/${path}` : `${API_URL}/${path}/${id}`;
  try {
    const { data, status } = await axios.put<ResponseStrapi<T>>(completePath, payloadSend, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': formData ? 'multipart/form-data' : undefined,
      },
    });

    return status === 200 ? data : false;
  } catch (error) {
    //console.log(error);
  }
};

export const getOneApi = async <T>({ params, path, token, id }: PropsGetOne) => {
  try {
    const { data, status } = await axios.get<ResponseStrapi<T>>(`${API_URL}/${path}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { ...params },
    });

    return status === 200 ? data || true : false;
  } catch (error) {
    //console.log(error);
  }
};

export const deleteApi = async <T>({ id, path, token }: PropsDelete) => {
  try {
    const { data, status } = await axios.delete<ResponseStrapi<T>>(`${API_URL}/${path}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return status === 200 ? { data, error: null } : false;
  } catch (error) {
    const infoError = error as AxiosError<ResponseError>;
    const errorRelations = infoError.response?.data.error;

    if (errorRelations?.details.code === 10) return { data: null, error: errorRelations };
  }
};

export const sendRequestApi = async <T>({ params, path, token, id }: PropsGetOne) => {
  try {
    const { status } = await axios.get<ResponseStrapi<T>>(`${API_URL}/${path}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { ...params },
    });

    return status === 200 || status === 204 ? true : false;
  } catch (error) {
    //console.log(error);
  }
};
