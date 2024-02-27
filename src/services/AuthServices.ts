import axios, { AxiosError } from 'axios';
import { API_URL } from '@/constants/constants';
import { FormLogin } from '@/types/Auth';
import { User, userResponse } from '@/types/User';
import { Params } from '@/Global';

export const loginEmail = async (payload: FormLogin) => {
  try {
    const { status, data } = await axios.post<userResponse>(`${API_URL}/auth/local`, payload);

    return status === 200 ? data : null;
  } catch (error) {
    const { response } = error as AxiosError;
    throw response?.status === 400 ? response.data : error;
  }
};

export const userMe = async (token: string, params?: Params) => {
  try {
    const { status, data } = await axios.get<User>(`${API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { ...params },
    });

    return status === 200 ? data : null;
  } catch (error) {
    //console.log(error)
  }
};
