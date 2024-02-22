import { Modal, Spin } from 'antd';
import styles from './ModalForm.module.css';

const SIZE_MODAL = {
  xs: '320px',
  sm: '480px',
  md: '640px',
  lg: '830px',
  xl: '960px',
  full: '100%',
} as const;
type ModalSize = keyof typeof SIZE_MODAL;

const CloseButton = () => {
  return (
    <div className={styles.closeButton}>
      <p>x</p>
    </div>
  );
};

interface Props {
  title?: string;
  show: boolean;
  children: React.ReactNode;
  onClose: () => void;
  footer?: React.ReactNode;
  size?: ModalSize;
  loading?: boolean;
}

export const ModalForm = ({
  children,
  show,
  title,
  onClose,
  footer,
  size = 'lg',
  loading = false,
}: Props) => {
  return (
    <Modal
      title={title}
      open={show}
      onCancel={onClose}
      closeIcon={<CloseButton />}
      className={styles.modalForm}
      width={SIZE_MODAL[size]}
      footer={footer}
      maskClosable={false}
    >
      <Spin spinning={loading}>{children}</Spin>
    </Modal>
  );
};
