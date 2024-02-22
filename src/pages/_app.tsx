import type { AppProps } from 'next/app';
import Head from 'next/head';
import type { NextPage } from 'next';
import { LayoutDashboard } from '@/components/layout/LayoutDashboard';
import { ProviderAntd } from '@/providers/ProviderAntd';
import '@/styles/globals.css';
import { UserProvider } from '@/providers/UserProvider';
import { ProtectRoute } from '@/providers/ProtectRoute';
import 'dayjs/locale/es';

type ExtendedAppProps = AppProps & {
  Component: NextPage;
};

export default function App({ Component, pageProps }: ExtendedAppProps) {
  const getLayout =
    Component.getLayout ??
    ((page) => {
      return <LayoutDashboard>{page}</LayoutDashboard>;
    });

  return (
    <>
      <Head>
        <title>{'Proafi - Administracion'}</title>
        <meta name="description" content={'Dashboad de Administracion de Servicios.'} />
        <meta name="keywords" content="Antd Design, dashboard, proafi" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <ProviderAntd>
        <UserProvider>
          <ProtectRoute>
            <>{getLayout(<Component {...pageProps} />)}</>
          </ProtectRoute>
        </UserProvider>
      </ProviderAntd>
    </>
  );
}
