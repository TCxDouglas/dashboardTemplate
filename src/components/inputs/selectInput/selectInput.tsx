/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Select } from 'antd';
import styles from './selectInput.module.css';

interface Props {
  placeholder?: string;
  options: Array<any>;
  onChange?: (value: any) => void;
  disable?: boolean;
  value?: any;
}

export const SelectInput = ({ placeholder, options, onChange, disable, value }: Props) => {
  return (
    <Select
      options={options}
      placeholder={placeholder}
      size="large"
      className={`${styles.select} selectFilter`}
      allowClear
      onChange={(value) => onChange && onChange(value)}
      showSearch
      disabled={disable}
      value={value}
      filterOption={(input, option) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
        (option?.label.toLowerCase() ?? '').includes(input.toLowerCase())
      }
    />
  );
};
