import { ColumnsType } from 'antd/es/table';
import { ActionTable } from '@/components/buttons/ActionTable/ActionTable';
import TableAntd from '@/components/Table/TableAntd/TableAndt';
import { AgentCompany, AgentCompanyCache } from '@/types/Agents';

interface Props {
  list: Array<AgentCompany | AgentCompanyCache>;
  loading: boolean;
  onDelete: (value: AgentCompanyCache | AgentCompany) => void;
  onEdit: (value: AgentCompanyCache | AgentCompany) => void;
}

export const TableAgentCompany = ({ list, loading, onDelete, onEdit }: Props) => {
  const columns: ColumnsType<AgentCompany | AgentCompanyCache> = [
    {
      title: 'Codigo de Agente',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Compañia',
      dataIndex: 'company',
      key: 'company',
      render: (_, value) => <>{value.company?.name}</>,
    },
    {
      title: 'Acciones',
      dataIndex: 'actions',
      fixed: 'right',
      width: 100,
      render: (_, value) => (
        <ActionTable onDelete={() => onDelete(value)} onEdit={() => onEdit(value)} />
      ),
    },
  ];

  return <TableAntd columns={columns} dataSource={list} loading={loading} />;
};
