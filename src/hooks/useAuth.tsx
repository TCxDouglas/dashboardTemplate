import { useContext } from 'react';
import { UserContext } from '@/providers/UserProvider';
import { FormLogin } from '@/types/Auth';
import { loginEmail, userMe } from '@/services/AuthServices';

export const useAuth = () => {
  const { signIn, signOut, token, userInfo } = useContext(UserContext);

  const login = async (payload: FormLogin) => {
    const response = await loginEmail(payload);

    if (response) {
      const resUser = await userMe(response.jwt, { populate: '*' });

      if (resUser) {
        signIn({
          jwt: response.jwt,
          user: resUser,
        });

        return true;
      }
    }
  };

  return {
    login,
    token,
    signOut,
    userInfo,
  };
};
