import { ColumnsType } from 'antd/es/table';
import { Tag } from 'antd';
import TableAntd from '@/components/Table/TableAntd/TableAndt';
import { COLOR_TAG, StatusTag } from '@/components/tag/StatusTag/StatusTag';
import { ActionTable } from '@/components/buttons/ActionTable/ActionTable';
import { Sort } from '@/constants/constants';
import { Agent, AgentCompany } from '@/types/Agents';
import { removeObjDuplicates } from '@/utils/Arrays';
import { Company } from '@/types/company';

interface Props {
  list: Agent[];
  loading: boolean;
  onEdit: (value: Agent) => void;
  onDelete: (value: Agent) => void;
  onSort: (sort: Sort) => void;
}

export const TableAgents = ({ list, loading, onEdit, onDelete, onSort }: Props) => {
  const columns: ColumnsType<Agent> = [
    {
      title: 'Nombre',
      dataIndex: 'name',
      key: 'name',
      sorter: true,
    },
    {
      title: 'Correo Electronico',
      dataIndex: 'email',
      key: 'email',
      sorter: true,
    },
    {
      title: 'Compañias Asociadas',
      dataIndex: 'company',
      key: 'company',
      render: (_, value) => {
        if (!value.agentCompanies) return <></>;

        const companys = value.agentCompanies
          .filter((company) => company.company)
          .map((company) => company.company) as Company[];
        const filterCompanys = removeObjDuplicates<Company>(companys, 'id');

        return (
          <>
            {filterCompanys.map((company) => {
              return <Tag key={company.id}>{company.code}</Tag>;
            })}
          </>
        );
      },
    },
    {
      title: 'Codigos',
      dataIndex: 'code',
      key: 'code',
      render: (_, value) => {
        if (!value.agentCompanies) return <></>;

        const companys = value.agentCompanies;
        const filterCompanys = removeObjDuplicates<AgentCompany>(companys, 'id');

        return (
          <>
            {filterCompanys.map((company) => {
              return <Tag key={company.id}>{company.code}</Tag>;
            })}
          </>
        );
      },
    },
    {
      title: 'Estado',
      dataIndex: 'active',
      key: 'active',
      sorter: true,
      render: (value) => (
        <StatusTag
          label={value ? 'Activo' : 'Inactivo'}
          colorTag={value ? COLOR_TAG.success : COLOR_TAG.error}
          colorText="#FFF"
        />
      ),
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
