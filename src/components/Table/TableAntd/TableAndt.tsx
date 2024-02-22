/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import { ColumnsType } from 'antd/es/table';
import { SorterResult, TableRowSelection } from 'antd/es/table/interface';
import { KEYS_SORT, Sort } from '@/constants/constants';

interface Props {
  columns: ColumnsType<any>;
  dataSource: AnyObject[];
  onSort?: (sort: Sort) => void;
  loading?: boolean;
  isCheckCell?: boolean;
  rowChecks?: React.Key[];
  isCheckAll?: boolean;
  onChecks?: (value: React.Key[]) => void;
  scrollX?: number | string;
  bordered?: boolean;
}

function TableAntd({
  columns,
  dataSource,
  onSort,
  loading,
  rowChecks = [],
  isCheckCell,
  isCheckAll,
  onChecks,
  scrollX = 100,
  bordered = false,
}: Props) {
  const handleSorter = (sorter: SorterResult<AnyObject>) => {
    if (!onSort) return;

    if (sorter.order) {
      onSort({
        key: sorter.columnKey || '',
        mode: KEYS_SORT[sorter.order] || '',
      });

      return;
    }
    onSort({
      key: '',
      mode: '',
    });
  };

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    if (!onChecks) return;

    onChecks(newSelectedRowKeys);
  };

  const rowSelection: TableRowSelection<AnyObject> = {
    onChange: onSelectChange,
    selectedRowKeys: rowChecks,
    columnTitle: isCheckAll ? '' : 'Select',
  };

  return (
    <Table
      style={{ width: '200%' }}
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      size="middle"
      bordered={bordered}
      onChange={(_, __, sorter) => {
        handleSorter(sorter as SorterResult<AnyObject>);
      }}
      loading={loading}
      rowSelection={isCheckCell ? rowSelection : undefined}
      scroll={{ x: scrollX || 1000, y: '55vh' }}
    />
  );
}

export default TableAntd;
