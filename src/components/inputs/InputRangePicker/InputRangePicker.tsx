import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import styles from './InputRangePicker.module.css';

interface Props {
  onChange?: (value: dayjs.Dayjs[] | null) => void;
}
const { RangePicker } = DatePicker;

export const InputRangePicker = ({ onChange }: Props) => {
  return (
    <RangePicker
      className={styles.datePicker}
      onChange={(value) => onChange && onChange(value as dayjs.Dayjs[])}
      format="MM-DD-YYYY"
    />
  );
};
