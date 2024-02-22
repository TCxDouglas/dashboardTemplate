/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { Menu, message } from 'antd';
import { useEffect, useState } from 'react';
import { MenuItemType } from 'antd/es/menu/hooks/useItems';
import styles from './MenuSiderbar.module.css';
import { CompanyIcon } from '@/assets/icons/CompanyIcon';
import { AgentIcon } from '@/assets/icons/AgentIcon';
import { InsuredIcon } from '@/assets/icons/InsuredIcon';
import { LogoutIcon } from '@/assets/icons/LogoutIcon';
import { Routes } from '@/constants/Routes';
import { DollarIcon } from '@/assets/icons/DollarIcon';
import { useAuth } from '@/hooks/useAuth';
import { ChargesIcon } from '@/assets/icons/ChargesIcon';
import { LoanIcon } from '@/assets/icons/LoanIcon';
import { CollectionIcon } from '@/assets/icons/CollectionIcon';

interface OptionMenu extends MenuItemType {
  key: Routes;
}

export const MenuSiderbar = () => {
  const router = useRouter();
  const { signOut } = useAuth();
  const [messageApi, contextHolder] = message.useMessage();
  const [optionSelect, setOptionSelect] = useState<Routes | undefined>();

  const OPTION_MENU: Array<OptionMenu> = [
    {
      key: '/company',
      icon: <CompanyIcon />,
      label: 'Compañia',
      onClick: () => push('/company'),
    },
    {
      key: '/agents',
      icon: <AgentIcon fill="#FFF" />,
      label: 'Agentes',
      onClick: () => push('/agents'),
    },
    {
      key: '/insured',
      icon: <InsuredIcon />,
      label: 'Asegurados',
      onClick: () => push('/insured'),
    },
    {
      key: '/payments',
      icon: <DollarIcon />,
      label: 'Abonos',
      onClick: () => push('/payments'),
    },
    {
      key: '/charges',
      icon: <ChargesIcon />,
      label: 'Cargos',
      onClick: () => push('/charges'),
    },
    {
      key: '/loans',
      icon: <LoanIcon />,
      label: 'Prestamos',
      onClick: () => push('/loans'),
    },
    {
      key: '/collections',
      icon: <CollectionIcon />,
      label: 'Lista de Cobros',
      onClick: () => push('/collections'),
    },
  ];

  const push = (path: Routes) => {
    router.push(path).catch(async () => {
      await messageApi.error(`No se encontro la ruta ${path}`);
    });
  };

  const logout = () => {
    push('/login');
    signOut();
  };

  useEffect(() => {
    const { pathname } = router;
    setOptionSelect(pathname as Routes);
  }, [router.pathname]);

  return (
    <>
      {contextHolder}
      <Menu
        mode="inline"
        className={styles.menu}
        selectedKeys={optionSelect && [optionSelect]}
        items={OPTION_MENU}
      ></Menu>

      <Menu
        mode="inline"
        className={styles.menuLogout}
        items={[
          {
            key: '1',
            icon: <LogoutIcon />,
            label: 'Cerrar Session',
            onClick: () => logout(),
          },
        ]}
      ></Menu>
    </>
  );
};
