/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Spin } from 'antd';
import { useAuth } from '@/hooks/useAuth';
import { PERMISSION_ROUTE, Routes } from '@/constants/Routes';

interface Props {
  children: React.ReactNode;
}

export const ProtectRoute = ({ children }: Props) => {
  const router = useRouter();
  const { userInfo } = useAuth();
  const [showView, setShowView] = useState(false);

  const verifyPermission = async () => {
    const pathname = router.pathname as Routes;
    const permission = PERMISSION_ROUTE[pathname];
    if (!permission || permission.length === 0) {
      setShowView(true);

      return;
    }
    if (!userInfo) {
      await router.push('/');

      return;
    }
    const roleUser = userInfo.role?.type;
    if (roleUser && permission.includes(roleUser)) setShowView(true);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      verifyPermission();
    }, 100);

    return () => clearTimeout(timer);
  }, [router.pathname, userInfo, router.isReady]);

  return (
    <>
      {!showView && (
        <div
          style={{
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Spin spinning></Spin>
        </div>
      )}
      {showView && children}
    </>
  );
};
