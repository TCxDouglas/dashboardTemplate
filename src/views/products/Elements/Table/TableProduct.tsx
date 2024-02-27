import styles from './TableProduct.module.css'
import { ColumnsType } from 'antd/es/table';
import TableAntd from '@/components/Table/TableAntd/TableAndt';
import { ActionTable } from '@/components/buttons/ActionTable/ActionTable';
import { Sort } from '@/constants/constants';
import { Product } from '@/types/Product';
import { formatNumberWithMoney } from '@/utils/Numbers';
import { Avatar } from 'antd';
import { addPathImage } from '@/utils/Url';

interface Props {
  list: Product[];
  loading: boolean;
  onEdit: (value: Product) => void;
  onDelete: (value: Product) => void;
  onSort: (sort: Sort) => void;
}

export const TableProduct = ({ list, loading, onEdit, onDelete, onSort }: Props) => {
  const columns: ColumnsType<Product> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
      render: (_, value) => {

        return (
          <div className={styles.contentImage}>
            <Avatar src={addPathImage(value.cover?.url || '')} ></Avatar>
            <p>{value.name}</p>
          </div>
        )
      }
    },
    {
      title: 'Descripcion',
      dataIndex: 'description',
      key: 'description',
      sorter: true,
    },
    {
      title: 'Pais',
      dataIndex: 'country',
      key: 'country',
      sorter: true,
    },
    {
      title: 'Precio',
      dataIndex: 'price',
      key: 'price',
      sorter: true,
      render: (_, value) => <>${formatNumberWithMoney(value.price)}</>
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, value) => (
        <ActionTable onEdit={() => onEdit(value)} onDelete={() => onDelete(value)} />
      ),
    },
  ];

  return <TableAntd columns={columns} dataSource={list} loading={loading} onSort={onSort} />;
};
