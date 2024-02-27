/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */
import { createContext, useState, useEffect } from 'react';
import { Spin } from 'antd';
import { useRouter } from 'next/router';
import { AuthProvider } from '@/types/Auth';
import { User, userResponse } from '@/types/User';
import { KEY_SESSION } from '@/constants/constants';
import { userMe } from '@/services/AuthServices';
import { verifyToken } from '@/utils/token';

const PropsProvider: AuthProvider = {
  signIn: () => {},
  signOut: () => {},
  token: null,
  userInfo: null,
  onSearchValue: () => {},
  searchValue: '',
};

export const UserContext = createContext(PropsProvider);

interface Props {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: Props) => {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showView, setShowView] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const signIn = (data: userResponse) => {
    localStorage.setItem(KEY_SESSION, data.jwt);
    setUserInfo(data.user);
    setToken(data.jwt);
  };

  const signOut = () => {
    setUserInfo(null);
    setToken(null);
    localStorage.removeItem(KEY_SESSION);
  };

  const updateSession = async () => {
    const tokenCache = localStorage.getItem(KEY_SESSION);
    if (tokenCache) {
      const verify = verifyToken(tokenCache);
      if (!verify) {
        signOut();
        setShowView(true);
        setLoading(false);
        router.push('/');

        return;
      }
      setLoading(true);
      setToken(tokenCache);
      const resUseMe = await userMe(tokenCache, { populate: 'role' });

      if (resUseMe) setUserInfo(resUseMe);
    }

    setShowView(true);
    setLoading(false);
  };

  const onSearchValue = (value: string) => {
    setSearchValue(value);
  };

  useEffect(() => {
    if (token) {
      setShowView(true);

      return;
    }

    updateSession();
  }, [token]);

  return (
    <UserContext.Provider
      value={{
        signIn,
        signOut,
        token,
        userInfo,
        searchValue,
        onSearchValue,
      }}
    >
      {loading && (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spin spinning={loading}></Spin>
        </div>
      )}
      {loading === false && showView && children}
    </UserContext.Provider>
  );
};
