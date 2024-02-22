import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import styles from './InputDatePicker.module.css';

interface Props {
  placeholder?: string;
  onChange?: (value: dayjs.Dayjs | null) => void;
}

export const InputDatePicker = ({ onChange, placeholder }: Props) => {
  return (
    <DatePicker
      className={styles.datePicker}
      onChange={(value) => onChange && onChange(value)}
      placeholder={placeholder}
      format="MM-DD-YYYY"
    />
  );
};
