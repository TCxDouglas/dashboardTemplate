import { Button, Switch } from 'antd';
import styles from './ActionForm.module.css';

interface Props {
  labelSwicth?: string;
  onCancel?: () => void;
  onSubmit?: () => void;
  onSwicth?: (checked: boolean) => void;
  checked?: boolean;
  hiddenCheck?: boolean;
  labelSubmit?: string;
}

export const ActionForm = ({
  labelSwicth,
  onCancel,
  onSubmit,
  onSwicth,
  checked,
  hiddenCheck = false,
  labelSubmit = 'Guardar',
}: Props) => {
  return (
    <div className={styles.containerActions}>
      <div className={styles.contentSwitch}>
        {!hiddenCheck && (
          <>
            <p>{labelSwicth}</p>
            <Switch onChange={(checked) => onSwicth && onSwicth(checked)} checked={checked} />
          </>
        )}
      </div>

      <Button size="large" className={styles.buttonAction} onClick={onCancel}>
        Cancelar
      </Button>
      <Button size="large" type="primary" className={styles.buttonAction} onClick={onSubmit}>
        {labelSubmit}
      </Button>
    </div>
  );
};
