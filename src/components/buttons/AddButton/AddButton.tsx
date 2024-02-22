import { Button } from 'antd';
import styles from './AddButton.module.css';
import { AddIcon } from '@/assets/icons/AddIcon';

interface Props {
  label: string;
  onClick?: () => void;
}

export const AddButton = ({ label, onClick }: Props) => {
  return (
    <Button
      type="primary"
      size="large"
      icon={<AddIcon />}
      className={styles.button}
      onClick={onClick}
    >
      {label}
    </Button>
  );
};
