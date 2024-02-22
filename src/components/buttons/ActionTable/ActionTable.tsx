import { Button, Popconfirm } from 'antd';
import styles from './ActionTable.module.css';
import { EditIcon } from '@/assets/icons/EditIcon';
import { DeleteIcon } from '@/assets/icons/DeleteIcon';
import { SaveIcon } from '@/assets/icons/SaveIcon';
import { CloseIcon } from '@/assets/icons/CloseIcon';

interface Props {
  onEdit?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export const ActionTable = ({ onDelete, onEdit, onSave, onCancel }: Props) => {
  return (
    <div className={styles.containerActions}>
      {onEdit && <Button icon={<EditIcon />} type="text" onClick={onEdit}></Button>}
      {onSave && <Button icon={<SaveIcon />} type="text" onClick={onSave}></Button>}
      {onCancel && <Button icon={<CloseIcon />} type="text" onClick={onCancel}></Button>}
      {onDelete && (
        <Popconfirm
          title="Esta seguro de eliminar este registro?"
          onConfirm={onDelete}
          okText="Si"
          cancelText="No"
        >
          <Button icon={<DeleteIcon />} type="text"></Button>
        </Popconfirm>
      )}
    </div>
  );
};
