import { Pagination } from 'antd';
import styles from './PaginationTable.module.css';
import { NextIcon } from '@/assets/icons/NextIcon';
import { PrevIcon } from '@/assets/icons/PrevIcon';
import { StrapiPagination } from '@/types/Api';

interface Props extends StrapiPagination {
  onChangePage: (value: number) => void;
}

export const PaginationTable = ({ onChangePage, page, pageSize, total }: Props) => {
  return (
    <div className={styles.contentPagination}>
      <Pagination
        pageSize={pageSize}
        total={total}
        current={page}
        nextIcon={<NextIcon />}
        prevIcon={<PrevIcon />}
        onChange={(pageNumber) => onChangePage(pageNumber)}
        showSizeChanger={false}
      />
    </div>
  );
};
