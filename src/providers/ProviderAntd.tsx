import { ConfigProvider } from 'antd';
import esES from 'antd/locale/es_ES';
import { AliasToken } from 'antd/es/theme/internal';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const FONTS_SYSTEM =
  // eslint-disable-next-line quotes
  "'Poppins', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans';";

const TOKEN_LIGTH: Partial<AliasToken> = {
  colorPrimary: '#2A3FFC',
  fontFamily: FONTS_SYSTEM,
};

export const ProviderAntd = ({ children }: Props) => {
  return (
    <ConfigProvider
      theme={{
        token: TOKEN_LIGTH,
        components: {
          Message: {
            zIndexBase: 2100,
            zIndexPopup: 2100,
            zIndexPopupBase: 2100,
          },
        },
      }}
      locale={esES}
    >
      {children}
    </ConfigProvider>
  );
};
