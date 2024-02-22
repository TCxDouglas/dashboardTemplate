import { Layout } from 'antd';
import styles from './styles.module.css';
import { SiderbarHeader } from './SiderbarHeader/SiderbarHeader';
import { MenuSiderbar } from './menuSiderbar/MenuSiderbar';

const { Sider } = Layout;

interface Props {
  collapsed: boolean;
  onCollapsed: () => void;
}

export const Siderbar = ({ collapsed, onCollapsed }: Props) => {
  return (
    <Sider trigger={null} collapsible collapsed={collapsed} className={styles.siderbar}>
      <div className={styles.containerMenu}>
        <SiderbarHeader collapsed={collapsed} onCollapsed={onCollapsed} />
        <MenuSiderbar />
      </div>
    </Sider>
  );
};
